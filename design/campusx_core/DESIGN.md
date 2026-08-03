---
name: CampusX Core
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#424656'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#727687'
  outline-variant: '#c2c6d8'
  surface-tint: '#0054d6'
  primary: '#0050cb'
  on-primary: '#ffffff'
  primary-container: '#0066ff'
  on-primary-container: '#f8f7ff'
  inverse-primary: '#b3c5ff'
  secondary: '#585f6c'
  on-secondary: '#ffffff'
  secondary-container: '#dce2f3'
  on-secondary-container: '#5e6572'
  tertiary: '#a33200'
  on-tertiary: '#ffffff'
  tertiary-container: '#cc4204'
  on-tertiary-container: '#fff6f4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#001849'
  on-primary-fixed-variant: '#003fa4'
  secondary-fixed: '#dce2f3'
  secondary-fixed-dim: '#c0c7d6'
  on-secondary-fixed: '#151c27'
  on-secondary-fixed-variant: '#404754'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59d'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832600'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system is engineered to evoke a sense of exclusivity, academic excellence, and modern utility. It targets a demographic of verified college students who value efficiency and aesthetic clarity. 

The visual direction is **Premium SaaS Minimalism**, drawing heavy inspiration from high-fidelity interfaces like Apple, Stripe, and Linear. The aesthetic prioritizes "negative space as a feature," ensuring that the marketplace content remains the hero while the interface provides a sophisticated, quiet framework. The emotional response should be one of immediate trust and professional-grade reliability, distancing itself from the cluttered or "cheap" feel often associated with student marketplaces.

## Colors
This design system utilizes a high-clarity palette centered on a white-label foundation.

- **Primary (#0066FF):** A vibrant, high-saturation blue used exclusively for primary actions, active states, and verified badges.
- **Neutral/Surface:** We use a tiered gray scale to create hierarchy without relying on shadows. `F9FAFB` is used for large background sections or sidebar fills, while `F3F4F6` is reserved for nested components like input fields or secondary buttons.
- **Text:** Primary body and headings use `111827` (almost black) to ensure maximum contrast and readability, while `6B7280` is used for metadata and placeholder text.

## Typography
The typography strategy employs three distinct typefaces to balance character and utility. 

- **Headlines:** Hanken Grotesk provides a sharp, contemporary "tech-premium" look with tight tracking for a refined appearance.
- **Body:** Inter is used for all long-form text and interface elements, ensuring neutral and highly legible communication.
- **Labels:** Geist is used for technical data, tags, and small utility labels to provide a precise, developer-influenced aesthetic.

For mobile screens, scale down large display titles to the defined `headline-lg-mobile` token to maintain visual balance and prevent awkward line breaks.

## Layout & Spacing
The design system follows a strict **8px linear spacing grid**. All margins and paddings must be multiples of 8 (e.g., 8, 16, 24, 32, 48, 64).

- **Grid:** A 12-column fluid grid is used for desktop (breakpoint: 1024px+). 
- **Margins:** Desktop views should maintain a 48px global margin; Mobile views should drop to 16px.
- **Consistency:** Use "md" (16px) for internal component padding and "lg" (24px) for spacing between distinct sections or card groups.

## Elevation & Depth
Elevation is expressed through **Tonal Layering** and **Ambient Shadows** rather than heavy borders.

- **Level 0 (Base):** White (#FFFFFF).
- **Level 1 (Subtle):** Off-white (#F9FAFB) used for containers that need to sit slightly "behind" the main content, like a sidebar.
- **Level 2 (Raised):** Used for cards and dropdowns. This utilizes a very soft, multi-layered shadow: `0px 1px 2px rgba(0,0,0,0.05), 0px 4px 12px rgba(0,0,0,0.05)`.
- **Interaction:** On hover, primary cards should lift slightly with an increased shadow spread and a 1px border stroke of `primary_color` at 10% opacity.

## Shapes
Following the premium SaaS aesthetic, the shape language is generous and soft. 

- **Standard Elements:** Buttons and input fields use a `0.5rem` (8px) radius.
- **Large Elements:** Product cards, modal windows, and main containers use `rounded-lg` (16px) to emphasize the approachable and modern feel.
- **Icons:** Use icons with a consistent 1.5px or 2px stroke weight and rounded terminals to match the UI's softness.

## Components
Consistent implementation of these components ensures the "verified premium" feel:

- **Buttons:**
  - **Primary:** Solid #0066FF with white text. High-fidelity hover state: slight darkening or 10% black overlay.
  - **Secondary:** Surface-muted (#F3F4F6) with Neutral text (#111827). No border.
- **Input Fields:**
  - Background: #F9FAFB. 
  - Border: 1px solid #E5E7EB. 
  - Focus: 1px solid #0066FF with a 3px soft blue outer glow (20% opacity).
- **Cards:**
  - White background, 16px radius, subtle Level 2 shadow.
  - Padding: 24px (lg) for desktop, 16px (md) for mobile.
- **Verified Badge:**
  - A small, circular blue badge with a white checkmark, always positioned next to student names or institution listings to reinforce the "Verified" brand pillar.
- **Navigation:**
  - Sticky top bar with a glassmorphism effect (Backdrop blur: 12px, Background: rgba(255, 255, 255, 0.8)).