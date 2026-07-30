---
name: CampusX Admin Utility
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#3130c0'
  on-tertiary: '#ffffff'
  tertiary-container: '#4b4dd8'
  on-tertiary-container: '#d9d8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  table-data:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 16px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-label:
    fontFamily: monospace
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-margin: 32px
  gutter: 16px
  row-height-dense: 32px
  row-height-standard: 48px
---

## Brand & Style
The design system for the admin-facing application shifts from the core consumer experience toward a **Utility-First / High-Performance** aesthetic. While maintaining the core identity, the brand personality is redefined as professional, precise, and operationally rigorous, drawing inspiration from modern developer and fintech interfaces.

The style is **Modern Corporate with a Minimalist/Functionalist lean**. It prioritizes information density and cognitive efficiency over decorative elements. Visual weight is used strategically to guide the administrator’s eye toward actionable data and moderation states. The emotional response should be one of "controlled oversight" and "operational confidence."

## Colors
This design system utilizes a structured palette designed for high-contrast state management. 
- **Primary Indigo (#4f46e5):** Retained for primary actions and brand continuity.
- **Semantic Utility Layer:** High-saturation tones are used for moderation: **Success** for verified users/content, **Warning** for pending reviews, and **Danger** for reported content or destructive actions.
- **Neutral Scale:** A sophisticated range of cool grays (`slate`) provides the foundation for borders and secondary text, ensuring the interface feels technical rather than purely aesthetic.
- **Surface Strategy:** Uses a "layered white" approach where the canvas is slightly off-white (`#f8fafc`) to allow pure white cards and data containers to pop with minimal shadow.

## Typography
The typography system is built on **Inter**, optimized for legibility at small scales. 
- **Condensed Scale:** Standard body text is reduced to 14px, with data-heavy tables utilizing a 13px baseline to maximize vertical density without sacrificing readability.
- **Information Hierarchy:** Bold weights are used sparingly for navigation titles and table headers. 
- **Mono Integration:** For IDs, transaction hashes, or system logs, a monospaced fallback is introduced to ensure character alignment.
- **Labels:** Uppercase labels with increased letter spacing are used for secondary categorization to differentiate from actionable content.

## Layout & Spacing
The layout follows a **Fixed-Fluid hybrid** model. A persistent sidebar (240px) anchors the navigation, while the main content area uses a fluid grid with a maximum cap to prevent line lengths from becoming unreadable on ultra-wide monitors.

- **Grid:** 12-column layout for dashboard widgets.
- **Density:** We employ a 4px baseline grid. Padding in data tables is strictly controlled (8px vertical, 12px horizontal) to allow for "at-a-glance" scanning of large datasets.
- **Breakpoints:** Desktop (1440px+), Laptop (1024px-1439px), and Tablet (768px-1023px). Admin functionality is not prioritized for mobile, focusing instead on tablet-optimized reflows.

## Elevation & Depth
In line with high-performance utility tools, depth is conveyed through **Tonal Layering and Low-Contrast Outlines** rather than heavy shadows.

- **Layer 0 (Canvas):** `#f8fafc` — The base environment.
- **Layer 1 (Surface):** `#ffffff` — Used for the main data containers and cards. Defined by a subtle 1px border (`#e2e8f0`).
- **Layer 2 (Popovers/Modals):** High-white with a refined, tight shadow (0 4px 6px -1px rgb(0 0 0 / 0.1)) to indicate temporary interaction.
- **Backdrop Blur:** Minimal use of `blur(8px)` on modal overlays to maintain focus without losing system context.

## Shapes
Adhering to the core identity, the **ROUND_EIGHT (0.5rem)** radius is the standard for all primary components (cards, buttons, input fields). 

- **Sub-components:** Smaller items like tags, chips, and checkboxes use a `rounded-sm` (4px) to maintain a crisp, sharp appearance at high density.
- **Contextual Pill:** Only used for "Status Badges" to distinguish them from interactive buttons.

## Components
- **Data Tables:** The heart of the admin experience. Features sticky headers, hover-state row highlights (`#f1f5f9`), and condensed padding.
- **Status Chips:** High-contrast background tints with dark text (e.g., Success: Green-100 bg, Green-800 text).
- **Buttons:**
    - *Primary:* Solid Indigo with white text.
    - *Secondary:* White background with Slate-200 border.
    - *Ghost:* No border, slate text; used for secondary table actions to reduce visual noise.
- **Input Fields:** Flat design with 1px border. Focus state uses a 2px Indigo ring with 0% offset.
- **Moderation Cards:** Feature a left-hand color-coded accent bar (4px width) matching the semantic state (Danger/Warning) to allow rapid peripheral scanning.
- **Navigation:** Vertical sidebar with "active state" indicators using a subtle left-aligned indigo stroke.