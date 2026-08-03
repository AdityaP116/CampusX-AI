import { create } from "zustand"

export type Category = "all" | "textbooks" | "electronics" | "furniture" | "clothing" | "sports" | "other"
export type Condition = "any" | "new" | "like-new" | "good" | "fair" | "poor"

interface MarketplaceState {
  searchQuery: string
  category: Category
  condition: Condition
  minPrice: number | null
  maxPrice: number | null
  negotiableOnly: boolean
  
  setSearchQuery: (query: string) => void
  setCategory: (category: Category) => void
  setCondition: (condition: Condition) => void
  setPriceRange: (min: number | null, max: number | null) => void
  setNegotiableOnly: (negotiable: boolean) => void
  resetFilters: () => void
}

const initialState = {
  searchQuery: "",
  category: "all" as Category,
  condition: "any" as Condition,
  minPrice: null,
  maxPrice: null,
  negotiableOnly: false,
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  ...initialState,
  
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setCategory: (category) => set({ category }),
  setCondition: (condition) => set({ condition }),
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  setNegotiableOnly: (negotiableOnly) => set({ negotiableOnly }),
  resetFilters: () => set(initialState),
}))
