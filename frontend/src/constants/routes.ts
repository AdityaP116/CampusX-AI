// =========================================================
// CampusX Application Routes — Single source of truth for all paths
// =========================================================

export const ROUTES = {
  // Public
  HOME: "/",
  ABOUT: "/about",
  FEATURES: "/features",
  PRICING: "/pricing",
  CONTACT: "/contact",

  // Auth
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // Auth flow (verification)
  VERIFY_EMAIL: "/verify-email",
  UPLOAD_ID: "/upload-id",
  AUTH_SUCCESS: "/success",

  // App (protected)
  DASHBOARD: "/dashboard",
  MARKETPLACE: "/marketplace",
  PRODUCT_DETAIL: (id: string) => `/marketplace/${id}`,
  CATEGORIES: "/categories",
  SEARCH: "/search",

  // Sell flow
  SELL: "/sell",
  SELL_IMAGES: "/sell/images",
  SELL_PREVIEW: "/sell/preview",

  // Social
  CHAT: "/chat",
  CHAT_THREAD: (id: string) => `/chat/${id}`,
  WISHLIST: "/wishlist",
  NOTIFICATIONS: "/notifications",

  // User
  PROFILE: "/profile",
  SETTINGS: "/settings",

  // Admin
  ADMIN: "/admin",
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_LISTINGS: "/admin/listings",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_USERS: "/admin/users",
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_REVIEWS: "/admin/reviews",
  ADMIN_REPORTS: "/admin/reports",
  ADMIN_MODERATION: "/admin/moderation",
} as const;

// Route groups that are protected (require auth)
export const PROTECTED_ROUTES = [
  "/dashboard",
  "/marketplace",
  "/categories",
  "/search",
  "/sell",
  "/chat",
  "/wishlist",
  "/notifications",
  "/profile",
  "/settings",
  "/admin",
] as const;

// Routes only for non-authenticated users
export const AUTH_ONLY_ROUTES = ["/login", "/signup"] as const;
