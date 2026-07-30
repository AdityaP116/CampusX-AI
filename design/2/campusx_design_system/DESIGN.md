---
name: CampusX Design System
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd8e5'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#f0ecf9'
  surface-container-high: '#eae6f4'
  surface-container-highest: '#e4e1ee'
  on-surface: '#1b1b24'
  on-surface-variant: '#464555'
  inverse-surface: '#302f39'
  inverse-on-surface: '#f3effc'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#fcf8ff'
  on-background: '#1b1b24'
  surface-variant: '#e4e1ee'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  title:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.5'
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  small:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container_max: 1440px
  gutter: 24px
  margin_mobile: 16px
---

## Brand & Style
The design system is built for a premium, verified student marketplace. It strikes a balance between the high-performance utility of developer tools and the warm, approachable aesthetics of top-tier consumer platforms. The brand personality is **trustworthy, intelligent, and effortlessly modern**.

The design style is **Modern Minimalist with subtle Glassmorphic accents**. It prioritizes clarity through generous whitespace, precise typography, and a "content-first" hierarchy. While the structural elements feel engineered and reliable (inspired by Linear), the interface is softened by large corner radii and tactile elevations (inspired by Apple/Airbnb) to maintain an inviting atmosphere for a student demographic.

## Colors
The palette is rooted in a deep "Indigo" primary that signifies intelligence and stability. 
- **Primary & Secondary:** Used for high-priority actions, active states, and brand-defining moments.
- **Accent:** A vibrant Cyan used sparingly for highlights, secondary call-outs, or "Verified" indicators.
- **Surfaces:** The light mode uses a soft slate background (`#F8FAFC`) to reduce glare, with pure white surfaces to define depth. Dark mode uses a deep navy-black for a high-end, focused feel.
- **Status Colors:** Standardized Success, Warning, and Danger tokens ensure immediate cognitive recognition for transactional feedback and marketplace safety.

## Typography
This design system utilizes **Inter** exclusively to achieve a systematic and utilitarian feel. The hierarchy relies on tight letter-spacing for headlines to create a "locked-in" editorial look, while body text remains spacious for readability.
- **Weights:** Use 600/700 for structural hierarchy and 400 for long-form content. 500 is reserved for UI labels and button text to ensure legibility at small sizes.
- **Scaling:** On mobile devices, Display and H1 styles should scale down to prevent excessive line-breaking.

## Layout & Spacing
The system follows a strict **8px linear grid** to ensure mathematical harmony across all components.
- **Grid:** A 12-column fluid grid is used for desktop (max-width 1440px). 
- **Gutters:** Standardized at 24px to provide breathing room between marketplace listings.
- **Reflow:** On tablet (under 1024px), margins reduce to 24px and columns may shift to 8. On mobile (under 640px), the layout moves to a 4-column structure with 16px side margins.
- **Whitespace:** Emphasize vertical rhythm by using `xxl` (48px) spacing between major sections to mimic the "Airy" feel of luxury platforms.

## Elevation & Depth
Depth is created through a combination of **Tonal Layering** and **Soft Ambient Shadows**. 
- **Level 1 (Surface):** Default white background for cards, using a subtle 1px border (`#E2E8F0`).
- **Level 2 (Small/Medium):** Used for hover states on cards and dropdown menus. Shadows should be highly diffused with low opacity (e.g., `0 4px 12px rgba(0,0,0,0.05)`).
- **Level 3 (Floating):** Used for Modals and Popovers. These feature a larger blur radius and a secondary "ambient" shadow to simulate significant distance from the page.
- **Glassmorphism:** Navigation bars and sticky headers should use a `backdrop-filter: blur(12px)` with a semi-transparent background to maintain context while scrolling.

## Shapes
The shape language is significantly rounded, reflecting an **approachable and premium student-centric vibe**.
- **Default (18px):** The standard for primary buttons and main container cards.
- **Nested Elements:** When placing elements inside a container, use a smaller radius (e.g., 8px or 12px) to maintain visual nested harmony.
- **Large Variants (24px):** Reserved for hero sections or search bars to create a distinctive, friendly focal point.

## Components

### Buttons
- **Primary:** Solid `#4F46E5`, white text. 18px radius. On hover, darken to `#4338CA`.
- **Ghost/Outline:** Use for secondary actions. Transparent background with subtle border.
- **Loading:** Replace text with a spinning Lucide `Loader2` icon; keep button dimensions fixed to prevent layout shift.

### Inputs & Fields
- **Search:** Large 24px rounded bar with a Lucide `Search` icon. Soft shadow on focus instead of a heavy border.
- **OTP/Number:** Individual squared boxes with 12px radius, highlighting the active box with a 2px primary border.

### Cards
- **Product Card:** Clean image with 18px radius. Use a Lucide `ShieldCheck` icon for "Verified" badges in the corner.
- **Analytics:** Minimalist line charts (using Accent color) paired with large Title-style metrics.

### Navigation
- **Navbar:** Glassmorphic (70% opacity, 12px blur). Active links indicated by a subtle primary dot or weight change, rather than underlines.
- **Avatar Menu:** Circular 40px container with a subtle ring border to indicate "Premium" status.

### Feedback & Badges
- **Badges:** Small radius (pill-shaped). Use low-saturation backgrounds with high-saturation text (e.g., light green background with dark green text for "Sold").
- **Toasts:** Positioned top-right, floating with `Elevation-Floating` shadow. Include a Lucide icon matching the status (Check, Alert, Info).