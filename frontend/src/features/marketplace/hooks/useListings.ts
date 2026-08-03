import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getListings, getListingById, createListing, Listing } from "../services/listingService"
import { useMarketplaceStore } from "@/shared/store/useMarketplaceStore"

export function useListings() {
  const { category, condition, searchQuery, minPrice, maxPrice } = useMarketplaceStore()
  
  return useQuery({
    queryKey: ["listings", { category, condition, searchQuery, minPrice, maxPrice }],
    queryFn: () => getListings({ category, condition, searchQuery, minPrice, maxPrice }),
  })
}

export function useListing(id: string) {
  return useQuery({
    queryKey: ["listings", id],
    queryFn: () => getListingById(id),
    enabled: !!id,
  })
}

export function useCreateListing() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ sellerId, data, files }: { 
      sellerId: string
      data: Omit<Listing, "id" | "sellerId" | "createdAt" | "status" | "images">
      files?: File[] 
    }) => createListing(sellerId, data, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] })
    }
  })
}
