// =========================================================
// CampusX Marketplace Categories
// Matches design: grid_view, devices, menu_book, home_work, handshake
// =========================================================

import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  Laptop,
  BookOpen,
  Home,
  Handshake,
  Shirt,
  Bike,
  Dumbbell,
  Music,
  Camera,
} from "lucide-react";

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  materialSymbol: string;
  listingCount: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "all",
    label: "All Products",
    icon: LayoutGrid,
    materialSymbol: "grid_view",
    listingCount: "6k+",
  },
  {
    id: "electronics",
    label: "Electronics",
    icon: Laptop,
    materialSymbol: "devices",
    listingCount: "1.2k+",
  },
  {
    id: "textbooks",
    label: "Textbooks",
    icon: BookOpen,
    materialSymbol: "menu_book",
    listingCount: "3.4k+",
  },
  {
    id: "housing",
    label: "Housing",
    icon: Home,
    materialSymbol: "home_work",
    listingCount: "450+",
  },
  {
    id: "services",
    label: "Services",
    icon: Handshake,
    materialSymbol: "handshake",
    listingCount: "800+",
  },
  {
    id: "clothing",
    label: "Clothing",
    icon: Shirt,
    materialSymbol: "checkroom",
    listingCount: "920+",
  },
  {
    id: "sports",
    label: "Sports",
    icon: Bike,
    materialSymbol: "directions_bike",
    listingCount: "310+",
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: Dumbbell,
    materialSymbol: "fitness_center",
    listingCount: "180+",
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    materialSymbol: "music_note",
    listingCount: "240+",
  },
  {
    id: "photography",
    label: "Photography",
    icon: Camera,
    materialSymbol: "photo_camera",
    listingCount: "155+",
  },
];

// Transaction types (from backend constants — UserRole, TransactionType)
export const TRANSACTION_TYPES = [
  { id: "BUY", label: "Buy" },
  { id: "SELL", label: "Sell" },
  { id: "RENT", label: "Rent" },
  { id: "EXCHANGE", label: "Exchange" },
] as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number]["id"];

// Product condition options
export const PRODUCT_CONDITIONS = [
  { id: "new", label: "New" },
  { id: "like_new", label: "Like New" },
  { id: "good", label: "Good" },
  { id: "fair", label: "Fair" },
  { id: "poor", label: "Poor" },
] as const;

export type ProductCondition = (typeof PRODUCT_CONDITIONS)[number]["id"];
