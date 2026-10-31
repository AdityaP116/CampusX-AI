import { db, storage, auth } from "@/lib/firebase"
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  QueryConstraint
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import type { Category, Condition } from "@/shared/store/useMarketplaceStore"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://campusx-api-zuks.onrender.com/api/v1"

export interface Listing {
  id: string
  sellerId: string
  title: string
  category: string
  condition: string
  description: string
  price: number
  negotiable: boolean
  listingType: string
  meetupLocation: string
  images: string[]
  createdAt: any
  status: "active" | "sold" | "archived" | "hidden"
  thumbnailUrl?: string
  seller?: {
    displayName?: string
    photoURL?: string
    email?: string
  }
}

export const createListing = async (
  sellerId: string, 
  data: Omit<Listing, "id" | "sellerId" | "createdAt" | "status" | "images">,
  imageFiles: File[] = []
): Promise<string> => {
  const listingRef = doc(collection(db, "products"))

  // Upload images (if any) to storage path permitted by storage.rules
  const imageUrls: string[] = []
  if (imageFiles.length > 0) {
    for (const file of imageFiles) {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
      const storageRef = ref(storage, `listings/${listingRef.id}/${Date.now()}_${sanitizedName}`)
      await uploadBytes(storageRef, file, { contentType: file.type || "image/jpeg" })
      const url = await getDownloadURL(storageRef)
      imageUrls.push(url)
    }
  }

  const transactionType = (data.listingType || "sell").toUpperCase()
  const category = data.category || "other"
  const location = data.meetupLocation || "Main Campus"

  const listingData: any = {
    ...data,
    id: listingRef.id,
    sellerId,
    category,
    categoryId: category,
    location,
    meetupLocation: location,
    transactionType,
    images: imageUrls,
    thumbnailUrl: imageUrls[0] || "",
    status: "active",
    viewCount: 0,
    wishlistCount: 0,
    isVerified: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  // Try saving via backend API first if authenticated; fallback to direct Firestore
  try {
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      const res = await fetch(`${BACKEND_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...listingData,
          price: Number(listingData.price),
        }),
      })

      if (res.ok) {
        const json = await res.json()
        return json.data?.id || listingRef.id
      }
    }
  } catch {
    // Backend API unreachable, falling back to direct Firestore setDoc
  }

  await setDoc(listingRef, listingData)
  return listingRef.id
}

export const getListings = async (
  filters?: {
    category?: Category
    condition?: Condition
    searchQuery?: string
    minPrice?: number | null
    maxPrice?: number | null
  }
): Promise<Listing[]> => {
  // Try fetching from backend API first
  try {
    const params = new URLSearchParams()
    if (filters?.category && filters.category !== "all") params.set("category", filters.category)
    if (filters?.condition && filters.condition !== "any") params.set("condition", filters.condition)
    if (filters?.searchQuery) params.set("search", filters.searchQuery)
    if (filters?.minPrice !== undefined && filters.minPrice !== null) params.set("minPrice", String(filters.minPrice))
    if (filters?.maxPrice !== undefined && filters.maxPrice !== null) params.set("maxPrice", String(filters.maxPrice))

    const res = await fetch(`${BACKEND_URL}/products?${params.toString()}`)
    if (res.ok) {
      const json = await res.json()
      if (Array.isArray(json.data?.items)) {
        return json.data.items.map((item: any) => ({
          ...item,
          category: item.category || item.categoryId || "other",
          meetupLocation: item.meetupLocation || item.location || "Campus",
          listingType: (item.listingType || item.transactionType || "sell").toLowerCase(),
        }))
      }
    }
  } catch {
    // Backend unavailable, fallback to client Firestore SDK query
  }

  const constraints: QueryConstraint[] = [
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  ]

  if (filters?.category && filters.category !== "all") {
    constraints.push(where("category", "==", filters.category))
  }
  
  if (filters?.condition && filters.condition !== "any") {
    constraints.push(where("condition", "==", filters.condition))
  }

  const q = query(collection(db, "products"), ...constraints)
  const snapshot = await getDocs(q)
  
  let listings = snapshot.docs.map(doc => {
    const data = doc.data() as any
    return {
      ...data,
      id: doc.id,
      category: data.category || data.categoryId || "other",
      meetupLocation: data.meetupLocation || data.location || "Campus",
      listingType: (data.listingType || data.transactionType || "sell").toLowerCase(),
    } as Listing
  })
  
  // Client-side filtering for search & price
  if (filters?.searchQuery) {
    const term = filters.searchQuery.toLowerCase()
    listings = listings.filter(l => 
      l.title?.toLowerCase().includes(term) || 
      l.description?.toLowerCase().includes(term)
    )
  }
  
  if (filters?.minPrice !== undefined && filters.minPrice !== null) {
    listings = listings.filter(l => l.price >= filters.minPrice!)
  }
  if (filters?.maxPrice !== undefined && filters.maxPrice !== null) {
    listings = listings.filter(l => l.price <= filters.maxPrice!)
  }
  
  return listings
}

export const getListingById = async (id: string): Promise<Listing | null> => {
  // Try backend first
  try {
    const res = await fetch(`${BACKEND_URL}/products/${id}`)
    if (res.ok) {
      const json = await res.json()
      if (json.data) {
        const item = json.data
        return {
          ...item,
          category: item.category || item.categoryId || "other",
          meetupLocation: item.meetupLocation || item.location || "Campus",
          listingType: (item.listingType || item.transactionType || "sell").toLowerCase(),
        } as Listing
      }
    }
  } catch {
    // Fallback to Firestore SDK
  }

  const docRef = doc(db, "products", id)
  const snapshot = await getDoc(docRef)
  
  if (snapshot.exists()) {
    const data = snapshot.data() as any
    return {
      ...data,
      id: snapshot.id,
      category: data.category || data.categoryId || "other",
      meetupLocation: data.meetupLocation || data.location || "Campus",
      listingType: (data.listingType || data.transactionType || "sell").toLowerCase(),
    } as Listing
  }
  
  return null
}
