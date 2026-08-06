import { db, storage } from "@/lib/firebase"
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
  status: "active" | "sold" | "archived"
}

export const createListing = async (
  sellerId: string, 
  data: Omit<Listing, "id" | "sellerId" | "createdAt" | "status" | "images">,
  imageFiles: File[] = []
): Promise<string> => {
  const listingRef = doc(collection(db, "products"))
  
  // Upload images (if any)
  const imageUrls: string[] = []
  if (imageFiles.length > 0) {
    for (const file of imageFiles) {
      const storageRef = ref(storage, `listings/${listingRef.id}/${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      imageUrls.push(url)
    }
  }

  const listingData: Listing = {
    ...data,
    id: listingRef.id,
    sellerId,
    images: imageUrls,
    status: "active",
    createdAt: serverTimestamp(),
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
  
  // Note: search/price filtering is best done client-side if the dataset is small, 
  // or via Algolia/Typesense for large datasets, as Firestore doesn't support 
  // native full-text search or multiple inequality filters efficiently.
  
  const q = query(collection(db, "products"), ...constraints)
  const snapshot = await getDocs(q)
  
  let listings = snapshot.docs.map(doc => doc.data() as Listing)
  
  // Client-side filtering for search & price
  if (filters?.searchQuery) {
    const q = filters.searchQuery.toLowerCase()
    listings = listings.filter(l => 
      l.title.toLowerCase().includes(q) || 
      l.description.toLowerCase().includes(q)
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
  const docRef = doc(db, "products", id)
  const snapshot = await getDoc(docRef)
  
  if (snapshot.exists()) {
    return snapshot.data() as Listing
  }
  
  return null
}
