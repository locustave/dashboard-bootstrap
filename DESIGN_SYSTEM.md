# Dashboard Bootstrap Design System Contract

**Document:** `docs/DESIGN_SYSTEM.md`
**Status:** Draft
**Version:** 0.1
**Date:** September 2026

---

## 1. Design System Purpose

Dashboard Bootstrap exists to eliminate repeated frontend boilerplate and prevent design drift across independently developed SaaS administrative applications. The design system is the mechanism that makes this possible.

This document is the **human-readable source of truth** for how shared UI should look and behave. The executable implementation lives in `@dashboard-bootstrap/design-system`. These two artifacts are versioned together. A change to one must be reflected in the other.

### Why this exists

- Multiple products need dashboards. Without a shared system, each rebuilds the same patterns with subtle differences.
- AI coding agents generate inconsistent UI when given no visual contract. This document gives them concrete rules.
- Design changes must propagate through one system, not be patched across many applications.

### What applications must not do

Applications must not independently redefine the standard visual language. They may extend it with product-specific components, but common primitives — buttons, tables, cards, navigation, page structure, spacing, typography — come from the design system.

### Ownership hierarchy

```text
DESIGN_SYSTEM.md                     (this document — human-readable contract)
        |
        v
@dashboard-bootstrap/design-system   (executable implementation)
        |
        v
@dashboard-bootstrap/templates       (page-level compositions)
        |
        v
Generated and product applications   (consumers)
```

The design system does **not** own: business logic, product-specific workflows, domain models, backend behavior, application data, navigation structure choices, page selection, or manifest structure. Those belong to the product application and `dashboard.yaml`.

---

## 2. Design Principles

### 2.1 Clarity Over Decoration

Every visual element must serve a purpose. Remove decoration that does not aid comprehension. Prefer whitespace and typography hierarchy over borders, shadows, and color.

### 2.2 Consistent Over Novel

When choosing between a novel visual solution and a consistent reuse of an existing pattern, choose consistency. Users develop muscle memory across applications in the same product family.

### 2.3 Dense But Readable

Administrative dashboards display significant amounts of data. Optimize for information density while maintaining clear visual separation. Do not sacrifice scanability for compactness.

### 2.4 Hierarchy Before Color

Establish visual hierarchy through size, weight, spacing, and position first. Use color to reinforce hierarchy, not to create it. The interface should remain comprehensible in grayscale.

### 2.5 Semantic Over Arbitrary

Use named tokens and semantic roles instead of raw values. `text.secondary` rather than `#6B7280`. `spacing.md` rather than `16px`. This ensures global consistency and enables systematic change.

### 2.6 Reusable Before Custom

Before creating a product-specific component, compose existing design-system primitives. The escalation path is: existing component, existing template, composition, product-specific component, proposed shared addition.

### 2.7 Accessible By Default

Accessibility is not optional polish. Color contrast, keyboard navigation, focus management, semantic markup, and screen reader support are part of every component's contract.

### 2.8 Predictable Interaction

Users should be able to predict how an element behaves based on how it looks. Buttons look clickable. Links look navigable. Disabled elements look inert. Transitions are brief and purposeful.

---

## 3. Visual Reference Analysis

Six reference dashboard screenshots were analyzed to extract reusable design patterns. The analysis focuses on structural and behavioral patterns, not branding.

### Extraction Matrix

| Area | Observed Patterns | Differences | Dashboard Bootstrap Decision |
|------|-------------------|-------------|------------------------------|
| **Overall density** | All references favor high information density with clear section separation. Content is organized in discrete regions. | Some references use tighter vertical spacing than others. | High density with consistent section gaps. Minimum 24px between major sections. |
| **Application background** | 5 of 6 use a light neutral background (off-white to very light gray). 1 uses dark sidebar only. | Warmth varies slightly — some pure gray, one warm neutral. | Neutral cool gray: `#F8F9FA`. No warm tints. |
| **Surface hierarchy** | White cards/panels sit on the neutral background. Clear two-layer system: background + surface. | Consistent across all references. | Two-layer surface model: application background + white content surfaces. |
| **Sidebar** | All references use a left sidebar, ~210-250px. White or very light, with grouped navigation items. Section labels are uppercase, small, muted. | One reference uses a dark sidebar. Widths vary +-20px. | White sidebar, 240px wide. Light border separator. Grouped navigation with uppercase section labels. |
| **Sidebar collapse** | 2 references show a collapse affordance. Others show fixed sidebar. | Inconsistent. | Support collapsible sidebar (icon-only mode at 64px). Default expanded. |
| **Top navigation** | Some references have a thin top bar with breadcrumbs, search, and user avatar. Others integrate breadcrumbs into the page header area. | Placement varies. | Thin top bar (56px) containing breadcrumbs, global search trigger, notifications, and user avatar. |
| **Content width** | Content fills available space with page-level horizontal padding. No references use a narrow centered column. | Consistent. | Fluid content width with 32px horizontal page padding. No max-width constraint for standard pages. |
| **Card structure** | All references use cards with white background, subtle border, minimal or no shadow. Padding appears ~16-24px. | Radius varies: some ~8px, some ~12px. Shadow varies from none to very subtle. | White cards. 1px border `#E5E7EB`. 12px radius. No shadow (border-only elevation). 24px internal padding. |
| **Border treatment** | All references rely on thin, subtle borders (light gray) rather than heavy shadows. | Consistent preference for borders over shadows. | Borders preferred over shadows. 1px solid `#E5E7EB` for card/surface borders. |
| **Shadow / elevation** | Most references use no visible shadow on cards. Shadows appear only on overlays (dropdowns, dialogs, drawers). | One reference uses very subtle card shadow. | No shadow on resting surfaces. Shadow reserved for floating elements (dropdowns, dialogs, drawers, popovers). |
| **Typography hierarchy** | Page titles are large (22-28px, semibold). Section headings medium (16-18px, semibold). Body 14px. Labels/captions smaller and muted. | Sizing varies by ~2px across references. | Normalized scale defined in Typography section. |
| **Table density** | All references show compact tables. Row height ~40-48px. Header text uppercase or semibold, smaller size. Body text 13-14px. | Row height varies slightly. | 44px row height. Semibold 12px uppercase headers. 14px body cells. |
| **Filters** | Filter bars appear above tables as horizontal rows of dropdowns, chips, or segmented controls. | Layout varies. | Horizontal filter bar above content. Dropdown filters, search input, and optional chip filters. |
| **Buttons** | Primary buttons are filled (dark or accent), secondary are outlined, tertiary are text-only. Compact sizing. | Color varies by brand. | Primary: filled dark (`#111827`). Secondary: outlined. Tertiary: text-only. 36px standard height. |
| **Badges / status** | Small rounded badges with semantic color backgrounds. Text is small and often uppercase or semibold. | Colors and shapes consistent conceptually. | Pill-shaped badges. Semantic fill colors (muted). 10-12px text. Dot + text pattern for inline status. |
| **Icon style** | All references use outline-style icons. Consistent stroke weight. Small size in navigation (~20px), smaller inline (~16px). | Consistent outline style. | Lucide outline icons. 20px navigation, 16px inline, 24px feature/hero. 1.5px stroke. |
| **Charts / data viz** | Line charts, bar charts, donut charts, heatmaps present. Muted color palettes. Axes are light. | Chart types vary by product need. | Design system defines chart color palette and axis styling. Chart library selection is implementation-time. |
| **Whitespace** | Generous within cards, moderate between cards. Pages do not feel cramped despite density. | Consistent. | Defined in spacing scale. Internal card padding 24px. Section gaps 24px. |
| **Metric cards** | Large numeric values (24-32px, bold), small labels above or below, trend indicators (arrows + percentage), optional sparklines. | Layout varies slightly. | Large value (28px semibold), small label above (12px muted), trend indicator below with directional arrow and color. |
| **Navigation items** | Compact (~36-40px height), icon + label, left-aligned. Active state uses background highlight or left accent bar. Hover uses subtle background. | Active indicator varies: background fill vs. left border. | 40px item height. Active: subtle filled background + semibold text. Hover: lighter background. Left accent bar on active item optional. |
| **Section group labels** | Uppercase, very small (10-11px), muted color, with vertical spacing above. | Consistent pattern. | 11px uppercase, `text.muted` color, 24px margin above, 8px margin below. |
| **Right-side panels** | Some references show contextual detail panels (350-400px) on the right side for selected items. | Not all references use this. | Supported as optional contextual panel. 400px default width. Appears on item selection without page navigation. |
| **Responsive** | All references appear desktop-optimized. No visible mobile layouts. | Consistent desktop-first approach. | Desktop-first. Responsive down to 1024px. Below 768px, sidebar collapses to overlay. |

---

## 4. Design Tokens

All visual values are expressed as named tokens. Applications must use tokens, not raw values.

### 4.1 Colors

#### Neutral Palette

| Token | Value | Usage |
|-------|-------|-------|
| `neutral.50` | `#F8F9FA` | Application background |
| `neutral.100` | `#F1F3F5` | Subtle backgrounds, hover states |
| `neutral.200` | `#E5E7EB` | Borders, dividers |
| `neutral.300` | `#D1D5DB` | Strong borders, disabled backgrounds |
| `neutral.400` | `#9CA3AF` | Placeholder text, disabled text |
| `neutral.500` | `#6B7280` | Secondary text |
| `neutral.600` | `#4B5563` | Body text |
| `neutral.700` | `#374151` | Strong body text |
| `neutral.800` | `#1F2937` | Headings |
| `neutral.900` | `#111827` | Primary text, primary button fill |

#### Semantic Roles

| Token | Value | Usage |
|-------|-------|-------|
| `background.app` | `neutral.50` | Application shell background |
| `background.surface` | `#FFFFFF` | Cards, panels, sidebar |
| `background.surfaceHover` | `neutral.100` | Hovered surface elements |
| `background.surfaceActive` | `neutral.100` | Active/selected surface elements |
| `background.overlay` | `rgba(0, 0, 0, 0.5)` | Modal/dialog backdrop |
| `text.primary` | `neutral.900` | Primary readable text |
| `text.secondary` | `neutral.500` | Supporting text, descriptions |
| `text.muted` | `neutral.400` | Placeholders, captions, labels |
| `text.inverse` | `#FFFFFF` | Text on dark/filled backgrounds |
| `border.default` | `neutral.200` | Card borders, dividers |
| `border.strong` | `neutral.300` | Emphasized borders |
| `border.focus` | `action.primary` | Focus rings |

#### Action Colors

| Token | Value | Usage |
|-------|-------|-------|
| `action.primary` | `#2563EB` | Primary interactive elements, links, focus |
| `action.primaryHover` | `#1D4ED8` | Primary hover state |
| `action.primaryMuted` | `#EFF6FF` | Primary subtle background (selected row, active nav) |
| `action.secondary` | `neutral.900` | Secondary filled buttons |
| `action.secondaryHover` | `neutral.800` | Secondary hover state |

#### Status Colors

| Token | Value | Usage |
|-------|-------|-------|
| `status.success` | `#059669` | Success text and icons |
| `status.successMuted` | `#ECFDF5` | Success background |
| `status.warning` | `#D97706` | Warning text and icons |
| `status.warningMuted` | `#FFFBEB` | Warning background |
| `status.error` | `#DC2626` | Error text and icons |
| `status.errorMuted` | `#FEF2F2` | Error background |
| `status.info` | `#2563EB` | Informational text and icons |
| `status.infoMuted` | `#EFF6FF` | Informational background |

#### Chart Colors

A sequential palette of 6 distinguishable colors for data visualization. Ordered by usage priority.

| Token | Value |
|-------|-------|
| `chart.1` | `#2563EB` |
| `chart.2` | `#7C3AED` |
| `chart.3` | `#059669` |
| `chart.4` | `#D97706` |
| `chart.5` | `#DC2626` |
| `chart.6` | `#6B7280` |

Charts must also be comprehensible without color (use pattern/shape differentiation where possible).

### 4.2 Spacing

A base-4 scale. All spacing in the system derives from these values.

| Token | Value | Common usage |
|-------|-------|-------------|
| `spacing.xxs` | `2px` | Tight inline gaps |
| `spacing.xs` | `4px` | Icon-to-text gaps, dense lists |
| `spacing.sm` | `8px` | Compact component padding, between related items |
| `spacing.md` | `12px` | Form field gaps, compact section padding |
| `spacing.base` | `16px` | Standard component padding, list item padding |
| `spacing.lg` | `20px` | Card internal padding (small), between sections in compact layouts |
| `spacing.xl` | `24px` | Card internal padding (standard), page section gaps, sidebar padding |
| `spacing.2xl` | `32px` | Page horizontal padding, major section separation |
| `spacing.3xl` | `48px` | Page-level vertical breathing room |
| `spacing.4xl` | `64px` | Reserved for major layout regions |

### 4.3 Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.sm` | `4px` | Inputs, small buttons, badges inner elements |
| `radius.md` | `8px` | Buttons, dropdowns, tooltips, chips |
| `radius.lg` | `12px` | Cards, panels, dialogs |
| `radius.xl` | `16px` | Large modals, marketing surfaces (rare) |
| `radius.full` | `9999px` | Avatars, pills, circular icon buttons |

### 4.4 Borders

| Token | Value |
|-------|-------|
| `border.width.default` | `1px` |
| `border.width.strong` | `2px` |
| `border.color.default` | `neutral.200` |
| `border.color.strong` | `neutral.300` |
| `border.color.focus` | `action.primary` |
| `border.color.error` | `status.error` |

Borders are the primary surface separation mechanism. Separators within a surface (e.g., between table rows, between sidebar sections) use `border.color.default` at `border.width.default`.

### 4.5 Elevation

Elevation is minimal. Borders replace shadows for resting elements.

| Token | Value | Usage |
|-------|-------|-------|
| `elevation.none` | `none` | Cards, sidebar, inline panels — all resting surfaces |
| `elevation.low` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)` | Dropdowns, popovers, tooltips |
| `elevation.medium` | `0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)` | Drawers, dialogs |
| `elevation.high` | `0 12px 32px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)` | Command palettes, spotlight search |

**Rule:** Do not apply shadows to cards, sidebars, or page panels. Use `border.color.default` instead. Shadows exist only for floating, overlaid elements.

### 4.6 Layout

| Token | Value | Description |
|-------|-------|-------------|
| `layout.sidebar.width` | `240px` | Expanded sidebar width |
| `layout.sidebar.collapsedWidth` | `64px` | Collapsed sidebar (icon-only) |
| `layout.header.height` | `56px` | Top navigation bar height |
| `layout.page.paddingX` | `32px` | Horizontal page padding |
| `layout.page.paddingTop` | `24px` | Space above page title |
| `layout.section.gap` | `24px` | Gap between page sections |
| `layout.content.maxWidth` | `none` | Content fills available width |
| `layout.contextPanel.width` | `400px` | Right-side contextual panel |
| `layout.drawer.widthSm` | `400px` | Small drawer |
| `layout.drawer.widthMd` | `560px` | Medium drawer |
| `layout.drawer.widthLg` | `720px` | Large drawer |
| `layout.dialog.widthSm` | `400px` | Small dialog |
| `layout.dialog.widthMd` | `560px` | Medium dialog |
| `layout.dialog.widthLg` | `720px` | Large dialog |

#### Breakpoints

| Token | Value | Target |
|-------|-------|--------|
| `breakpoint.sm` | `640px` | Small phone (limited support) |
| `breakpoint.md` | `768px` | Tablet / sidebar collapse threshold |
| `breakpoint.lg` | `1024px` | Small laptop — minimum supported desktop |
| `breakpoint.xl` | `1280px` | Standard desktop |
| `breakpoint.2xl` | `1536px` | Large desktop |

Minimum supported viewport: **1024px** for full desktop experience. Below 768px, sidebar collapses to overlay.

---

## 5. Typography

### Font Family

| Token | Value |
|-------|-------|
| `font.sans` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |
| `font.mono` | `'JetBrains Mono', 'Fira Code', 'Consolas', monospace` |

Inter is the primary typeface. It is optimized for screen readability at small sizes, supports tabular figures, and is freely available. If Inter is unavailable, the system font stack provides consistent fallbacks.

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing | Token |
|------|------|--------|-------------|----------------|-------|
| Page title | `24px` | `600` | `32px` | `-0.01em` | `type.pageTitle` |
| Section heading | `18px` | `600` | `28px` | `-0.01em` | `type.sectionHeading` |
| Card title | `16px` | `600` | `24px` | `0` | `type.cardTitle` |
| Subtitle | `14px` | `500` | `20px` | `0` | `type.subtitle` |
| Body | `14px` | `400` | `20px` | `0` | `type.body` |
| Body small | `13px` | `400` | `18px` | `0` | `type.bodySmall` |
| Label | `13px` | `500` | `18px` | `0` | `type.label` |
| Caption | `12px` | `400` | `16px` | `0` | `type.caption` |
| Overline | `11px` | `600` | `16px` | `0.05em` | `type.overline` |
| Table header | `12px` | `600` | `16px` | `0.03em` | `type.tableHeader` |
| Table cell | `14px` | `400` | `20px` | `0` | `type.tableCell` |
| Button | `14px` | `500` | `20px` | `0` | `type.button` |
| Button small | `13px` | `500` | `18px` | `0` | `type.buttonSmall` |
| Code | `13px` | `400` | `20px` | `0` | `type.code` |

**Rules:**
- Do not introduce font sizes outside this scale.
- Page titles are the largest text on any standard page. Nothing exceeds 24px in standard admin views.
- Use weight and color to create hierarchy within a single size, before reaching for a larger size.
- Tabular figures should be enabled for numeric content (metrics, tables, counters).

---

## 6. Iconography

### Approved Library

Lucide React is the single approved icon library. The design system provides an `Icon` component that abstracts Lucide. Applications must not import Lucide directly.

The `@dashboard-bootstrap/schema` package is the canonical owner of the manifest-facing `IconName` vocabulary. The design-system `Icon` component implements an internal registry that supports every schema-defined `IconName`.

### Icon Sizes

| Token | Size | Usage |
|-------|------|-------|
| `icon.sm` | `16px` | Inline with text, badges, status indicators |
| `icon.md` | `20px` | Navigation items, buttons, form controls |
| `icon.lg` | `24px` | Feature cards, hero placements, empty states |

### Icon Rules

- **Stroke width:** 1.5px (Lucide default). Do not modify stroke width per-icon.
- **Color:** Icons inherit the text color of their context by default. Use semantic color tokens for status icons.
- **Navigation icons:** `icon.md` (20px), color `text.secondary` when inactive, `text.primary` when active.
- **Button icons:** `icon.sm` (16px) or `icon.md` (20px) depending on button size. Placed before the label with `spacing.xs` (4px) gap.
- **Status icons:** `icon.sm` (16px), use the corresponding `status.*` color token.
- **Decorative icons:** Icons that do not convey unique information must be hidden from screen readers (`aria-hidden="true"`).

### When Icons Should Not Be Used

- Do not use icons as the sole indicator of meaning. Pair with text labels except in well-established patterns (close button, search magnifying glass).
- Do not use icons decoratively where they add no information.
- Do not mix icon libraries. No Font Awesome, Material Icons, Heroicons, or custom SVGs alongside Lucide.

---

## 7. Application Shell

The application shell is the persistent frame surrounding all page content. It consists of a sidebar, a top navigation bar, and a content area.

### Shell Layout

```text
+-------+---------------------------------------------+
|       |              Top Navigation (56px)           |
|       +---------------------------------------------+
|       |                                             |
| Side  |              Content Area                   |
| bar   |              (scrollable)                   |
| 240px |                                             |
|       |                                             |
+-------+---------------------------------------------+
```

### Sidebar

- **Width:** 240px expanded, 64px collapsed (icon-only mode).
- **Background:** `background.surface` (white).
- **Right border:** 1px `border.color.default`.
- **Position:** Fixed. Does not scroll with page content. Sidebar content scrolls independently if it overflows.
- **Padding:** `spacing.sm` (8px) horizontal, `spacing.md` (12px) vertical.

#### Product/Logo Area

- Top of sidebar. Height: 56px (aligned with top nav).
- Contains product icon/logo and product name.
- Product name uses `type.cardTitle` (16px/600).
- Collapse toggle button aligned to the right of this area.

#### Navigation Items

- Height: 40px per item.
- Padding: 8px horizontal, centered vertically.
- Icon: `icon.md` (20px), `text.secondary` color when inactive.
- Label: `type.body` (14px/400), `text.secondary` when inactive.
- Gap between icon and label: `spacing.sm` (8px).
- **Hover:** `background.surfaceHover` fill, rounded `radius.md` (8px).
- **Active:** `background.surfaceActive` fill, `text.primary` color, font-weight `500`. Optional 3px left accent bar using `action.primary`.
- Items are grouped by section. Sections have an overline label (`type.overline`, `text.muted`, uppercase).

#### Section Groups

- Section label: `type.overline` (11px/600), `text.muted`, uppercase, `0.05em` letter-spacing.
- Margin above section label: `spacing.xl` (24px).
- Margin below section label: `spacing.sm` (8px).
- First section at the top of the navigation area has reduced top margin (`spacing.md`).

#### Nested Navigation

- Child items are indented by `spacing.xl` (24px) from the parent.
- Parent items with children show an expand/collapse chevron icon on the right.
- Expanded/collapsed state persists per session.

#### Sidebar Footer

- Pinned to the bottom of the sidebar.
- Contains: Settings link, Help/Support link, and optionally a user avatar with name.
- Separated from main navigation by a top border (`border.color.default`).

#### Collapsed State

- Shows only icons centered at `icon.md` size.
- Tooltips appear on hover showing the full navigation label.
- Section labels are hidden.
- Product name collapses to product icon only.

### Top Navigation

- **Height:** 56px.
- **Background:** `background.surface` (white).
- **Bottom border:** 1px `border.color.default`.
- **Contents (left to right):**
  - Breadcrumbs (`type.bodySmall`, `text.secondary` for ancestors, `text.primary` for current). Separator: `/` or chevron icon.
  - Spacer (flex grow).
  - Global search trigger (icon button or compact search input).
  - Notification bell icon button.
  - User avatar (32px circle) with dropdown menu.

### Content Area

- **Background:** `background.app` (`neutral.50`).
- **Scrolling:** The content area scrolls vertically. The sidebar and top nav are fixed.
- **Padding:** `layout.page.paddingX` (32px) horizontal, `layout.page.paddingTop` (24px) above the page title.
- **Width:** Fills remaining space after sidebar. No max-width constraint.

### Optional Context Panel

- Right-side panel for displaying details of a selected item without navigating away.
- **Width:** `layout.contextPanel.width` (400px).
- **Background:** `background.surface`.
- **Left border:** 1px `border.color.default`.
- **Scroll:** Independent vertical scroll.
- Appears only when needed (e.g., selecting a table row). Not always visible.

### Responsive Behavior

- **>= 1024px:** Full sidebar + content. Standard layout.
- **768px - 1023px:** Sidebar collapses to icon-only (64px) by default. Can be expanded as an overlay.
- **< 768px:** Sidebar is hidden by default. Accessible via hamburger menu in top nav. Appears as an overlay.

---

## 8. Page Structure

Every page within the content area follows a consistent vertical structure.

### Page Hierarchy

```text
Page
  PageHeader
    Breadcrumbs (optional, if not in TopNav)
    Title
    Description (optional)
    PageActions
  Toolbar (optional — filters, search, view toggles)
  PageContent
    Sections or primary content
```

### PageHeader

- **Title:** `type.pageTitle` (24px/600), `text.primary`.
- **Description:** `type.body` (14px/400), `text.secondary`. Placed directly below the title with `spacing.xs` (4px) gap.
- **Actions:** Right-aligned on the same row as the title. Contains the primary action button and optional secondary actions.
- **Bottom margin:** `spacing.xl` (24px) before the toolbar or page content.

### PageActions

- Right-aligned within the page header.
- One primary action button maximum. If more than one equally important action exists, use a primary button + dropdown overflow.
- Secondary actions as outlined or text buttons.

### Toolbar

- Horizontal bar below the page header.
- Contains: search input, filter dropdowns, view toggles (table/grid), date range selector.
- **Bottom margin:** `spacing.base` (16px) before content.
- **Background:** Transparent (sits on the page background).

### PageContent

- The primary content area.
- May contain a single full-width element (table, builder canvas) or a grid of cards/sections.
- Sections within the page content are separated by `layout.section.gap` (24px).

### Section Ordering Convention

For standard pages, prefer this vertical ordering:
1. Summary/metrics (if applicable)
2. Filters/toolbar
3. Primary content (table, cards, form, canvas)
4. Supporting/secondary content

---

## 9. Semantic Components

Each semantic component has a defined purpose, visual contract, and behavioral rules. These components are implemented in `@dashboard-bootstrap/design-system`.

### AppShell

- **Purpose:** The root layout component wrapping sidebar, top nav, and content area.
- **Visual rules:** Renders the sidebar, top nav, and content area as described in section 7.
- **Variants:** None. One shell layout for all pages.
- **Interaction:** Manages sidebar collapse state and responsive breakpoint behavior.
- **Prohibited:** Applications must not create alternative shell layouts or bypass AppShell for standard pages.

### Sidebar

- **Purpose:** Primary navigation container.
- **Visual rules:** As defined in section 7, Sidebar.
- **Variants:** Expanded (240px), collapsed (64px).
- **Interaction:** Collapse toggle. Navigation item click triggers route change. Hover and active states as defined.
- **Prohibited:** Custom sidebar widths, custom background colors, embedding non-navigation content in the primary navigation area (except sidebar footer).

### TopNav

- **Purpose:** Top bar containing breadcrumbs, global actions, user menu.
- **Visual rules:** As defined in section 7, Top Navigation.
- **Variants:** None.
- **Interaction:** Breadcrumb links navigate. Search opens command palette or inline search. Avatar opens user dropdown.
- **Prohibited:** Adding product-specific navigation items to the top nav. Custom heights.

### Page

- **Purpose:** Content area wrapper providing consistent padding and structure.
- **Visual rules:** Applies `layout.page.paddingX` and `layout.page.paddingTop`. Background is `background.app`.
- **Variants:** Default (padded), full-bleed (no padding, for builder/canvas pages).
- **Prohibited:** Overriding page padding with arbitrary values.

### PageHeader

- **Purpose:** Consistent page title area with optional description and actions.
- **Visual rules:** As defined in section 8.
- **Variants:** With description, without description, with breadcrumbs, with tabs.
- **Interaction:** None on the header itself. Action buttons within it are interactive.
- **Prohibited:** Multiple page headers on a single page. Custom title sizes.

### PrimaryAction

- **Purpose:** The single most important action on a page.
- **Visual rules:** Rendered as a primary button (filled, `action.primary`). See Buttons section.
- **Variants:** Button, button with icon, button with dropdown.
- **Interaction:** Click triggers the primary page action (create, save, export, etc.).
- **Prohibited:** More than one PrimaryAction in a PageHeader. Using PrimaryAction for destructive operations (use destructive button variant instead).

### AppCard

- **Purpose:** A bordered surface container for grouping related content.
- **Visual rules:** `background.surface`, 1px `border.color.default`, `radius.lg` (12px), `spacing.xl` (24px) internal padding. No shadow.
- **Variants:** Default, interactive (hoverable/clickable).
- **Interaction:** Interactive cards show `background.surfaceHover` on hover and a cursor pointer. Non-interactive cards have no hover effect.
- **Prohibited:** Nesting cards within cards. Applying shadows. Custom border colors. Custom radius.

### MetricCard

- **Purpose:** Displaying a single key metric with label, value, and optional trend.
- **Visual rules:** Extends AppCard. Label: `type.caption` (12px), `text.secondary`. Value: 28px, weight 600, `text.primary`. Trend: `type.bodySmall` (13px), directional arrow icon (`icon.sm`), color-coded (`status.success` for up/positive, `status.error` for down/negative). Optional sparkline below the value.
- **Variants:** With trend, without trend, with sparkline, with unit suffix.
- **Interaction:** Optionally clickable to drill into the metric.
- **Prohibited:** Arbitrary value font sizes. Decorative background colors.

### AppDataTable

- **Purpose:** The primary data display component for collections.
- **Visual rules:** Defined in detail in section 12.
- **Variants:** Default, compact, selectable, with inline actions.
- **Interaction:** Row hover, selection, sorting, pagination.
- **Prohibited:** Custom row heights outside the defined scale. Non-standard header treatment.

### FilterBar

- **Purpose:** Horizontal container for search, filters, and view controls above content.
- **Visual rules:** Horizontal flex layout. Items separated by `spacing.sm` (8px). Items include dropdowns, search input, date pickers, chip filters.
- **Variants:** Compact (single row), expandable (show more filters).
- **Interaction:** Filter changes update the content below. Active filters are visually indicated.
- **Prohibited:** Vertical filter layouts in standard views. Filters inside cards.

### SearchInput

- **Purpose:** Text input for filtering content.
- **Visual rules:** Standard text input with a search icon prefix (`icon.sm`). `radius.md` (8px). Height follows input sizing (36px standard).
- **Variants:** Inline (within filter bar), global (in top nav or command palette).
- **Interaction:** Debounced input triggers search/filter. Clear button appears when input has value.
- **Prohibited:** Custom search input styling.

### StatusBadge

- **Purpose:** Indicating the status of an entity (active, pending, error, etc.).
- **Visual rules:** Pill shape (`radius.full`). Muted semantic background color. Text: `type.caption` (12px), weight 500, matching semantic text color. Horizontal padding: `spacing.sm` (8px). Vertical padding: `spacing.xxs` (2px).
- **Variants:** Success, warning, error, info, neutral. Optional dot prefix.
- **Interaction:** Non-interactive by default.
- **Prohibited:** Using badges for navigation. Arbitrary badge colors. Using color alone to convey status — always include text.

### AppDrawer

- **Purpose:** Slide-in panel for detail views, forms, or contextual information without full page navigation.
- **Visual rules:** Defined in section 15. Slides from the right. `background.surface`. `elevation.medium` shadow. Width per `layout.drawer.*` tokens.
- **Variants:** Small (400px), medium (560px), large (720px).
- **Interaction:** Opens with animation (200ms ease-out). Closes via X button, Escape key, or optional backdrop click. Focus trapped within.
- **Prohibited:** Left-sliding drawers. Custom widths outside the defined tokens. Non-dismissible drawers.

### AppDialog

- **Purpose:** Modal overlay for confirmations, alerts, focused forms.
- **Visual rules:** Defined in section 15. Centered overlay. `background.surface`. `elevation.medium` shadow. `radius.lg` (12px). Backdrop uses `background.overlay`.
- **Variants:** Small (400px), medium (560px), large (720px). Alert dialog (with icon). Confirmation dialog (with destructive action).
- **Interaction:** Focus trapped within. Closes via X button or Escape. Destructive dialogs require explicit confirmation. Backdrop click closes non-destructive dialogs.
- **Prohibited:** Nested dialogs. Dialogs larger than 720px (use a page or drawer instead). Dialogs without a close mechanism.

### EmptyState

- **Purpose:** Communicating that no data exists for the current view.
- **Visual rules:** Centered vertically and horizontally within the content area. Contains: illustration or icon (`icon.lg` or larger), title (`type.sectionHeading`), description (`type.body`, `text.secondary`), optional CTA button.
- **Variants:** First-use (onboarding), no results (filtered), error-related.
- **Interaction:** CTA button (if present) triggers the relevant creation or recovery action.
- **Prohibited:** Empty states that provide no guidance. Empty states without text.

### LoadingState

- **Purpose:** Indicating that content is being loaded.
- **Visual rules:** Skeleton placeholders matching the shape of the expected content. Skeleton color: `neutral.200` with a subtle shimmer animation. Alternatively, a centered spinner for full-page loads.
- **Variants:** Skeleton (preferred for known layouts), spinner (for unknown layouts or small areas), inline (for individual elements).
- **Interaction:** Non-interactive. Content replaces the loading state when ready.
- **Prohibited:** Custom loading animations. Loading text without a visual indicator.

### ErrorState

- **Purpose:** Communicating that content failed to load or an operation failed.
- **Visual rules:** Similar layout to EmptyState. Error icon in `status.error` color. Title and description explaining what went wrong. Retry button if the error is recoverable.
- **Variants:** Page-level error, component-level error, inline error.
- **Interaction:** Retry button re-attempts the failed operation.
- **Prohibited:** Showing raw error messages or stack traces. Error states without recovery guidance.

### AppForm

- **Purpose:** Container for form fields with consistent spacing and layout.
- **Visual rules:** Defined in section 11. Vertical stack of form fields separated by `spacing.md` (12px). Form sections separated by `spacing.xl` (24px) with optional section headings.
- **Variants:** Standard (vertical labels), compact (for settings).
- **Interaction:** Form submission, field validation on blur, form-level validation on submit.
- **Prohibited:** Horizontal form layouts for standard forms. Arbitrary field spacing.

### FormField

- **Purpose:** A labeled input with optional help text and error display.
- **Visual rules:** Defined in section 11. Label above input. Help text below input. Error text replaces help text when invalid.
- **Variants:** Standard, required (with indicator), read-only, disabled.
- **Interaction:** Focus, blur validation, error display.
- **Prohibited:** Labels to the left of inputs in standard forms (above only). Placeholder text as the sole label.

### Icon

- **Purpose:** Abstraction over Lucide React icon rendering.
- **Visual rules:** As defined in section 6.
- **Variants:** sm (16px), md (20px), lg (24px).
- **Interaction:** Non-interactive when standalone. Interactive when inside a button.
- **Prohibited:** Direct Lucide imports in consuming applications. Custom SVG icons alongside Lucide. Modified stroke widths.

---

## 10. Buttons and Actions

### Button Hierarchy

| Variant | Fill | Text Color | Border | Usage |
|---------|------|------------|--------|-------|
| **Primary** | `action.primary` | `text.inverse` | None | Single most important action per context |
| **Secondary** | `transparent` | `text.primary` | 1px `border.color.default` | Alternative actions, cancel |
| **Tertiary** | `transparent` | `action.primary` | None | Low-emphasis actions, links within content |
| **Destructive** | `status.error` | `text.inverse` | None | Delete, remove, irreversible actions |
| **Ghost** | `transparent` | `text.secondary` | None | Toolbar actions, icon buttons |

### Button Sizes

| Size | Height | Font | Padding X | Icon Size |
|------|--------|------|-----------|-----------|
| **Small** | `28px` | `type.buttonSmall` (13px) | `spacing.sm` (8px) | `icon.sm` (16px) |
| **Medium** (default) | `36px` | `type.button` (14px) | `spacing.base` (16px) | `icon.sm` (16px) |
| **Large** | `44px` | `type.button` (14px) | `spacing.lg` (20px) | `icon.md` (20px) |

### Button States

- **Hover:** Darken fill by one shade (primary: `action.primaryHover`, secondary: `background.surfaceHover`).
- **Active/pressed:** Further darken.
- **Disabled:** `neutral.300` background, `neutral.400` text. No pointer events. `opacity: 1` (do not use reduced opacity — it obscures text for accessibility).
- **Loading:** Replace label with a spinner. Maintain button width to prevent layout shift. Disable interaction.
- **Focus:** 2px `border.color.focus` ring with 2px offset. Visible on keyboard focus only (`:focus-visible`).

### Button Rules

- **Radius:** `radius.md` (8px).
- **Icon placement:** Leading icon (before label), with `spacing.xs` (4px) gap. Trailing icons are reserved for dropdown indicators (chevron).
- **Icon-only buttons:** Square aspect ratio at the given size. `radius.md`. Must have an `aria-label`.
- **Primary action limit:** One primary button per page context (page header). Dialogs and drawers may have their own primary action.
- **Destructive actions:** Must always require confirmation (dialog or inline confirm step). Never use as the page-level primary action.

---

## 11. Forms and Inputs

### Input Controls

#### Text Input

- **Height:** 36px (matching button medium).
- **Border:** 1px `border.color.default`. On focus: `border.color.focus` (2px).
- **Radius:** `radius.md` (8px).
- **Background:** `background.surface`.
- **Text:** `type.body` (14px). Placeholder: `text.muted`.
- **Padding:** `spacing.sm` (8px) horizontal.

#### Select

- Same visual treatment as text input. Dropdown indicator (chevron) on the right.
- Dropdown menu: `background.surface`, `elevation.low`, `radius.md`, 1px `border.color.default`.

#### Checkbox

- Size: 18px square. `radius.sm` (4px).
- Unchecked: `border.color.default` border, no fill.
- Checked: `action.primary` fill, white checkmark icon.
- Label: `type.body`, `spacing.sm` (8px) gap from the checkbox.

#### Radio

- Size: 18px circle.
- Unchecked: `border.color.default` border.
- Checked: `action.primary` fill with inner white dot.

#### Switch/Toggle

- Track: 36px wide, 20px tall, `radius.full`.
- Off: `neutral.300` track, white thumb.
- On: `action.primary` track, white thumb.

#### Textarea

- Same border/radius/background as text input. Minimum height 80px. Resizable vertically.

#### Search Input

- Text input with `icon.sm` search icon prefix. Clear button (X) suffix when populated.

#### Date/Time

- Uses the standard text input container. Calendar dropdown for date selection. Implementation details are implementation-time.

### Form Layout

- **Label placement:** Above the input. Always. Not inline, not floating.
- **Label style:** `type.label` (13px/500), `text.primary`.
- **Required indicator:** Asterisk (`*`) after the label in `status.error` color.
- **Help text:** Below the input. `type.caption` (12px), `text.secondary`. `spacing.xs` (4px) gap from input.
- **Error text:** Replaces help text when invalid. `type.caption` (12px), `status.error`. Error icon (`icon.sm`) prefix optional.
- **Field spacing:** `spacing.md` (12px) between consecutive fields.
- **Section spacing:** `spacing.xl` (24px) between form sections, with an optional section heading (`type.subtitle`).

### Input States

- **Default:** `border.color.default`.
- **Hover:** `border.color.strong`.
- **Focus:** `border.color.focus` (2px), focus ring.
- **Error:** `border.color.error`.
- **Disabled:** `neutral.100` background, `text.muted` text. Not editable.
- **Read-only:** `background.surface`, no border, text appears as regular body text. Not editable but selectable.

---

## 12. Tables and Data-Dense Interfaces

Tables are the primary data display for administrative dashboards. Density, scanability, and consistent behavior are critical.

### Table Structure

| Element | Specification |
|---------|--------------|
| **Header row height** | 40px |
| **Body row height** | 44px |
| **Header text** | `type.tableHeader` (12px/600), `text.secondary`, uppercase, `0.03em` letter-spacing |
| **Body text** | `type.tableCell` (14px/400), `text.primary` |
| **Cell padding** | `spacing.base` (16px) horizontal |
| **Border** | 1px `border.color.default` between rows. No vertical cell borders. |
| **Header background** | `background.surface` (same as body, differentiated by typography) |
| **Hover** | `background.surfaceHover` on the entire row |
| **Selected** | `action.primaryMuted` background on the entire row |
| **Stripe** | None. Use hover and borders for row differentiation. |

### Table Features

- **Sorting:** Clickable header cells. Sort indicator (arrow icon) on the active sort column. Neutral indicator on sortable columns on hover.
- **Selection:** Optional checkbox column as the first column. Header checkbox for select-all. Selected row count displayed in a toolbar that appears above the table.
- **Row actions:** Icon buttons or a "more" (three-dot) menu on the last column. Visible on hover or always visible (based on action importance).
- **Pagination:** Below the table. Shows: rows per page selector (10/25/50/100), page range text ("1-25 of 342"), previous/next buttons, optional page number buttons.
- **Filters:** See FilterBar component. Positioned above the table.
- **Search:** Inline within the FilterBar or as a standalone input above the table.
- **Bulk actions:** Appear in a toolbar above the table when rows are selected. Contains action buttons and selected count.
- **Empty state:** Centered within the table body area. Uses EmptyState component.
- **Loading state:** Skeleton rows matching the expected row height and column count.

### Table Rules

- **Truncation:** Long text truncates with ellipsis. Full text visible on hover (tooltip) or in a detail view.
- **Overflow:** Tables scroll horizontally if columns exceed available width. A shadow or fade indicator appears at the scroll edges.
- **Minimum column width:** 80px. Columns should not compress below readable text width.
- **Numeric alignment:** Right-align numeric columns. Use tabular figures.
- **Status columns:** Use StatusBadge for status values.

---

## 13. Cards and Surfaces

### When to Use a Card

- To group related content that is distinct from adjacent content (e.g., metric card, summary section, workflow node).
- When the content needs a clear visual boundary.

### When Not to Use a Card

- For full-page tables (the table is the page content, not a card within it). Tables may optionally be wrapped in a card if they share the page with other sections.
- For page-level layout structure (use spacing and section headings instead).
- Do not nest cards inside cards.

### Card Specification

| Property | Value |
|----------|-------|
| Background | `background.surface` |
| Border | 1px `border.color.default` |
| Radius | `radius.lg` (12px) |
| Shadow | `elevation.none` |
| Padding | `spacing.xl` (24px) |
| Title | `type.cardTitle` (16px/600) |
| Title-to-content gap | `spacing.base` (16px) |

### Card Variants

- **Default:** Non-interactive container.
- **Interactive:** Shows `background.surfaceHover` on hover, `cursor: pointer`. 1px border transitions to `border.color.strong` on hover.
- **Metric:** See MetricCard in section 9.

### Card Layout

- Multiple cards in a row: Use CSS grid with `spacing.xl` (24px) gap.
- Cards should generally have equal height when displayed in a grid row (use flexbox/grid stretch).

---

## 14. Status and Feedback

### Status Badges

See StatusBadge component in section 9. Summary:

| Status | Text Color | Background | Dot Color |
|--------|-----------|------------|-----------|
| Success | `status.success` | `status.successMuted` | `status.success` |
| Warning | `status.warning` | `status.warningMuted` | `status.warning` |
| Error | `status.error` | `status.errorMuted` | `status.error` |
| Info | `status.info` | `status.infoMuted` | `status.info` |
| Neutral | `text.secondary` | `neutral.100` | `neutral.400` |

### Trend Indicators

- Up/positive: `status.success` color, upward arrow icon.
- Down/negative: `status.error` color, downward arrow icon.
- Neutral/unchanged: `text.secondary` color, dash or horizontal arrow.

### Progress

- Linear progress bar: 4px height, `radius.full`, `neutral.200` track, `action.primary` fill.
- Determinate: fill width proportional to completion.
- Indeterminate: animated back-and-forth.

### Loading

- **Skeleton:** `neutral.200` rectangles with shimmer animation. Match the shape of the content being loaded.
- **Spinner:** 20px circular spinner using `action.primary`. Centered in the loading area.
- **Inline:** Small spinner (16px) next to the element being loaded.

### Notifications / Inline Feedback

- **Toast/snackbar:** Not the primary feedback mechanism. Use inline messages where possible.
- **Inline alert:** Full-width within the page content or form section. Uses semantic status colors (muted background + status text color). Icon prefix. Dismissible (optional).
- **Form validation:** See Forms section. Errors display inline below the field.

### Rules

- Never rely on color alone to convey status. Always include text or an icon.
- Use semantic status tokens. Do not invent custom status colors.

---

## 15. Drawers, Dialogs, and Context Panels

### When to Use Each

| Pattern | Use When |
|---------|----------|
| **Full page navigation** | The content is a primary workflow that deserves its own URL and full screen. |
| **Drawer** | Viewing or editing details that relate to the current page without losing page context. |
| **Dialog** | Confirming a destructive action, presenting a short focused form (< 5 fields), or displaying an alert. |
| **Context panel** | Displaying read-heavy details of a selected item alongside a list (split-view pattern). |

### Drawer Specification

| Property | Value |
|----------|-------|
| Position | Right edge, full height |
| Widths | 400px / 560px / 720px |
| Background | `background.surface` |
| Shadow | `elevation.medium` |
| Backdrop | `background.overlay` (optional, depends on context) |
| Animation | Slide in from right, 200ms ease-out |
| Close mechanisms | X button (top right), Escape key, backdrop click (if backdrop shown) |

- **Header:** Drawer title (`type.sectionHeading`), close button, optional action buttons.
- **Body:** Scrollable content area with `spacing.xl` (24px) padding.
- **Footer (optional):** Pinned at bottom with primary and secondary action buttons. Top border separator.
- **Focus trap:** Keyboard focus remains within the drawer while open.

### Dialog Specification

| Property | Value |
|----------|-------|
| Position | Centered vertically and horizontally |
| Widths | 400px / 560px / 720px |
| Max height | 85vh |
| Background | `background.surface` |
| Radius | `radius.lg` (12px) |
| Shadow | `elevation.medium` |
| Backdrop | `background.overlay` |
| Animation | Fade in + scale from 95%, 150ms ease-out |
| Close mechanisms | X button, Escape key, backdrop click (non-destructive only) |

- **Header:** Title (`type.sectionHeading`), optional description, close button.
- **Body:** Scrollable if content overflows. `spacing.xl` (24px) padding.
- **Footer:** Right-aligned action buttons. Primary action on the right. Cancel/secondary on the left.
- **Destructive confirmation:** Destructive button (`status.error` fill). Backdrop click does **not** close. May require typing a confirmation phrase for high-risk actions.

### Context Panel

- Fixed right-side panel within the page content area (not an overlay).
- Width: `layout.contextPanel.width` (400px).
- Left border: 1px `border.color.default`.
- Background: `background.surface`.
- Independent scroll.
- Appears when an item is selected (e.g., table row click). Disappears when deselected.

---

## 16. Navigation Patterns

### Primary Sidebar Navigation

The primary navigation mechanism. Defined in section 7. Left sidebar with grouped items.

### Nested Navigation

- Supported one level deep. Parent item expands to reveal children.
- Children are visually indented.
- Deeper nesting is not supported. Flatten or reorganize instead.

### Tabs

- Used for switching between views within a single page (e.g., Build / Activity / Settings).
- **Position:** Below the page header, above the content.
- **Visual:** Underline indicator (`action.primary`, 2px) on the active tab. Tab text: `type.body` (14px/500). Inactive tabs: `text.secondary`. Active tab: `text.primary`.
- **Spacing:** `spacing.xl` (24px) between tab labels.
- **Behavior:** Tabs do not navigate to a new page. They switch content within the current page. URL may update with a query parameter for deep linking.

### Breadcrumbs

- Displayed in the top navigation bar.
- Shows: root > section > current page.
- Ancestors are clickable links (`action.primary` color). Current page is `text.primary`, non-clickable.
- Separator: `/` character or chevron-right icon in `text.muted`.

### Settings Navigation

- Settings pages use a left-side vertical tab list within the page content (not the sidebar).
- Tab list width: ~200px. Content fills remaining width.
- Active tab: `background.surfaceActive` background, `text.primary`.

### Coexistence Rules

- Sidebar navigation and breadcrumbs always coexist.
- Tabs and sidebar navigation coexist — tabs subdivide a single sidebar destination.
- Settings navigation is a page-internal pattern. The sidebar shows "Settings" as a single active item.

---

## 17. Standard Page Patterns

These define the visual contract for the page templates listed in the TDD. Each template composes design-system components into a standard layout.

### Dashboard Template

- **Use:** Overview pages showing KPIs, trends, activity summaries.
- **Hierarchy:** PageHeader with title and optional date range action. Grid of MetricCards (typically 3-4 in a row). Chart sections in AppCards. Activity feed or summary table.
- **Required regions:** PageHeader, at least one metric or chart section.
- **Optional regions:** Activity feed, recent items table, status summary.
- **Actions:** Export, date range selector, view filter.
- **States:** Loading (skeleton metric cards + chart areas), empty (first-use guidance), error.
- **Consistency:** All dashboards share the same metric card style, chart color palette, and section spacing.

### Table Template

- **Use:** Browsing and managing collections of entities.
- **Hierarchy:** PageHeader with title and primary action (e.g., "Add User"). FilterBar with search and filters. AppDataTable.
- **Required regions:** PageHeader, AppDataTable.
- **Optional regions:** FilterBar, bulk action toolbar, tabs for filtered views.
- **Actions:** Primary create action. Row-level actions (edit, delete, view). Bulk actions when rows selected.
- **States:** Loading (skeleton table), empty (no items created yet), filtered empty (no results for current filters), error.
- **Consistency:** All table pages share the same column header treatment, row density, pagination, and filter bar placement.

### Detail Template

- **Use:** Viewing and editing a single entity.
- **Hierarchy:** PageHeader with entity name as title. Optional back navigation. Tabs for sections (overview, settings, activity). Content sections in AppCards.
- **Required regions:** PageHeader with entity identification.
- **Optional regions:** Tabs, metadata sidebar, activity timeline, related items.
- **Actions:** Edit, delete (destructive with confirmation), secondary actions in dropdown.
- **States:** Loading, not found (404-style error state), error.
- **Consistency:** All detail pages place the entity name in the page title position and use the same card layout for sections.

### Settings Template

- **Use:** Application or entity configuration.
- **Hierarchy:** PageHeader with "Settings" title. Left-side settings navigation (vertical tabs). Form content on the right.
- **Required regions:** PageHeader, settings navigation, form area.
- **Optional regions:** Save confirmation bar (pinned at bottom when unsaved changes exist).
- **Actions:** Save, cancel, reset to defaults.
- **States:** Loading, save success (inline feedback), validation error.
- **Consistency:** All settings pages use the same left-nav pattern and form field layout.

### Wizard Template

- **Use:** Multi-step guided flows (onboarding, configuration setup).
- **Hierarchy:** PageHeader with wizard title. Step indicator (horizontal stepper showing current/total steps). Step content area. Bottom navigation (Back / Next / Complete).
- **Required regions:** Step indicator, step content, bottom navigation.
- **Optional regions:** Step description, progress summary sidebar.
- **Actions:** Next, back, skip (if allowed), complete.
- **States:** Loading (per step), validation error (prevents advancing), completion success.
- **Consistency:** All wizards use the same step indicator style and bottom navigation placement.

### Catalog Template

- **Use:** Browsing available items, tools, templates, or integrations.
- **Hierarchy:** PageHeader with title and optional search/filter. Grid of interactive AppCards representing catalog items. Each card: icon/image, title, description, optional status badge.
- **Required regions:** PageHeader, card grid.
- **Optional regions:** Category filter, search, featured items section.
- **Actions:** Click card to view detail or activate.
- **States:** Loading (skeleton cards), empty (no items), filtered empty, error.
- **Consistency:** All catalog pages use the same card grid layout and card structure.

### Builder Template

- **Use:** Visual editors for workflows, configurations, or compositions.
- **Hierarchy:** PageHeader with title. Toolbar with builder controls (zoom, undo, save). Canvas area (full-bleed, no page padding). Optional right-side properties panel.
- **Required regions:** Toolbar, canvas.
- **Optional regions:** Properties panel (context panel), node palette/toolbox.
- **Actions:** Save, undo/redo, zoom controls, add node/element.
- **States:** Loading, empty canvas, validation errors on nodes.
- **Consistency:** All builder pages use the same toolbar placement and properties panel position. Canvas-specific rendering is product-defined.

### Split View Template

- **Use:** Viewing a list alongside detail of the selected item.
- **Hierarchy:** PageHeader with title. Left panel: filterable list or table (proportional width, typically 40-50%). Right panel: detail of selected item (context panel pattern). Resizable divider optional.
- **Required regions:** List panel, detail panel.
- **Optional regions:** FilterBar within list panel.
- **Actions:** Select item (updates detail panel). Item-specific actions in detail panel.
- **States:** Loading, no selection (detail panel shows placeholder), list empty, error.
- **Consistency:** All split views use the same panel proportions and selection interaction.

### Empty State Template

- **Use:** First-time experience or onboarding when the primary entity has no data.
- **Hierarchy:** Centered content: illustration or icon, title, description, CTA button.
- **Required regions:** Title, description, primary CTA.
- **Optional regions:** Illustration, secondary links, guided steps.
- **Actions:** Primary CTA triggers the first creation or setup action.
- **States:** This is itself a state — it transitions to the normal page view once data exists.
- **Consistency:** All empty states use the same centered layout, typography, and CTA button treatment.

---

## 18. Dashboard / Analytics Patterns

### Metric Cards

- Display: Large value, small label, trend indicator.
- Layout: Horizontal row of 3-4 cards. Equal width, equal height.
- See MetricCard component specification in section 9.

### KPI Display

- Single prominent metric within a card. Value uses `type.pageTitle` size for emphasis if the KPI is the primary page focus.
- Comparison to previous period shown as trend indicator.

### Trend Indicators

- Upward arrow + positive percentage: `status.success`.
- Downward arrow + negative percentage: `status.error`.
- Flat/unchanged: `text.secondary`.
- Always pair the directional arrow with a numeric value. Do not use color alone.

### Charts

- Chart color palette: `chart.1` through `chart.6` tokens.
- Axis labels: `type.caption` (12px), `text.muted`.
- Grid lines: 1px `neutral.100`.
- Legend: Below the chart. Small colored dots + `type.caption` labels.
- Tooltips: `background.surface`, `elevation.low`, `radius.md`.
- Charts should be wrapped in an AppCard with a card title and optional action (date range, export).

The specific charting library (recharts, nivo, visx, etc.) is an implementation-time decision. This contract defines the visual styling that must be applied regardless of library.

### Activity Feeds

- Vertical list of timestamped events.
- Each entry: icon or avatar, description text (`type.body`), timestamp (`type.caption`, `text.muted`).
- Entries separated by a subtle border or spacing.
- Most recent entries first.

### Date Ranges

- Date range selector in the toolbar or page header.
- Preset ranges (last 7 days, last 30 days, this month, custom).
- Displayed as a button with calendar icon and selected range text.

---

## 19. Responsive Behavior

Dashboard Bootstrap primarily targets desktop administrative applications. Responsive behavior supports smaller screens gracefully but does not force mobile parity.

### Breakpoint Behavior

| Viewport | Sidebar | Layout | Columns |
|----------|---------|--------|---------|
| >= 1280px | Expanded (240px) | Full | 3-4 column grids |
| 1024px - 1279px | Expanded (240px) | Full, narrower cards | 2-3 column grids |
| 768px - 1023px | Collapsed (64px icon-only) | Single column possible | 1-2 column grids |
| < 768px | Hidden, overlay on toggle | Single column | 1 column |

### Minimum Supported Viewport

**1024px** is the minimum width for a full desktop experience. The design system guarantees all features work at this width.

**768px** is the minimum for basic usability. Some features (split view, wide tables) may require horizontal scrolling.

Below 768px is supported for basic navigation and simple pages but is not the primary target.

### Responsive Rules

- Tables always remain tables. Do not convert to card layouts on smaller screens.
- Cards in grids reflow from multi-column to fewer columns as width decreases.
- Metric card rows may wrap to 2x2 or stack vertically.
- Builder canvas requires minimum 1024px — show a viewport warning on smaller screens.
- Drawers become full-width below 768px.
- Dialogs maintain their defined widths with horizontal margin. Below their width + 32px, they become full-width with padding.

---

## 20. Accessibility

Accessibility is a non-negotiable part of the design contract.

### Target

WCAG 2.1 Level AA compliance.

### Color Contrast

- **Normal text (< 18px):** Minimum 4.5:1 contrast ratio against background.
- **Large text (>= 18px or >= 14px bold):** Minimum 3:1 contrast ratio.
- **UI components (borders, icons):** Minimum 3:1 contrast ratio against adjacent colors.
- All color combinations defined in this document meet these requirements. Do not introduce new combinations without verifying contrast.

### Keyboard Navigation

- All interactive elements must be reachable via Tab key.
- Focus order must follow logical reading order (top to bottom, left to right).
- Sidebar navigation items navigable via Arrow keys.
- Dialogs and drawers trap focus. Escape closes them.
- Tables support Arrow key navigation between cells (optional, but row focus via Tab is required).

### Visible Focus

- All focusable elements must show a visible focus indicator on `:focus-visible`.
- Focus ring: 2px `border.color.focus` with 2px offset from the element.
- Do not remove focus indicators. Do not use `outline: none` without a replacement.

### Semantic Structure

- Headings follow a logical hierarchy (h1 > h2 > h3). Page title is h1. Section headings are h2. Card titles are h3.
- Navigation uses `<nav>` landmark with `aria-label`.
- Main content uses `<main>` landmark.
- Tables use `<table>`, `<thead>`, `<th scope="col">` for proper screen reader support.
- Forms use `<label>` elements associated with inputs via `htmlFor`/`id`.

### Labels

- All form inputs have visible labels. Placeholder text is not a substitute for a label.
- Icon-only buttons have `aria-label` describing their action.
- Status badges include text — do not convey meaning through color alone.
- Images and illustrations have `alt` text or `aria-hidden="true"` if decorative.

### Dialogs

- Dialogs use `role="dialog"` and `aria-modal="true"`.
- Dialog title is referenced by `aria-labelledby`.
- Focus moves to the dialog on open and returns to the trigger on close.

### Reduced Motion

- All animations respect `prefers-reduced-motion: reduce`. When reduced motion is preferred:
  - Skeleton shimmer stops.
  - Drawer/dialog transitions are instant (no slide/fade).
  - Loading spinners remain (they are functional, not decorative).

---

## 21. Interaction and Motion

### Hover

- Elements that respond to hover must visually change: background color shift (`background.surfaceHover`), border color shift, or text color shift.
- Hover transitions: 150ms ease-out.
- Non-interactive elements must not have hover effects.

### Focus

- 2px `border.color.focus` ring, 2px offset.
- On `:focus-visible` only (not on mouse click in supported browsers).
- Transition: instant (no animation on focus ring).

### Pressed/Active

- Buttons darken slightly beyond hover state.
- Duration: 50ms.

### Selected

- Selected rows: `action.primaryMuted` background.
- Selected navigation items: `background.surfaceActive` + weight change.
- Selected tabs: underline indicator.

### Transitions

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Hover background | `background-color` | `150ms` | `ease-out` |
| Border color | `border-color` | `150ms` | `ease-out` |
| Drawer open/close | `transform` | `200ms` | `ease-out` |
| Dialog open | `opacity, transform` | `150ms` | `ease-out` |
| Dialog close | `opacity` | `100ms` | `ease-in` |
| Sidebar collapse | `width` | `200ms` | `ease-out` |
| Tooltip appear | `opacity` | `100ms` | `ease-out` |

### Motion Philosophy

Motion is restrained. It exists to provide feedback and spatial orientation, not decoration. No bouncing, no elastic easing, no gratuitous animation. If removing an animation would not reduce comprehension, remove it.

---

## 22. Empty, Loading, and Error States

### First-Use Empty State

- Displayed when the user has not yet created any items in a collection.
- Centered in the content area.
- Contains: icon or illustration (`icon.lg` or custom illustration), encouraging title ("No workflows yet"), helpful description ("Create your first workflow to get started."), primary CTA button ("Create Workflow").
- Tone: Encouraging, not apologetic.

### Filtered Empty State

- Displayed when filters or search return no results, but data does exist.
- Centered in the content area (or table body).
- Contains: search icon, title ("No results found"), description ("Try adjusting your filters or search terms."), optional "Clear filters" action.
- Tone: Helpful, suggesting next steps.

### Loading

- **Page-level:** Skeleton layout matching the expected page structure.
- **Component-level:** Skeleton matching the component shape (table rows, cards, text blocks).
- **Inline:** Small spinner (16px) next to the loading element.
- Skeleton color: `neutral.200` with subtle shimmer animation (left-to-right gradient sweep, 1.5s duration, infinite).
- Do not use full-page spinners for pages with known layouts. Use skeletons instead.

### Partial Loading

- When some content is loaded and some is pending, show the loaded content immediately and skeleton placeholders for pending content.
- Do not block the entire page for a single slow-loading section.

### Page Error

- Centered in the content area.
- Icon: alert-circle in `status.error`.
- Title: "Something went wrong" or contextual message.
- Description: Brief explanation without technical jargon.
- Action: "Try again" button.

### Component Error

- Within the component's bounds (e.g., a card that failed to load).
- Smaller scale: error icon, brief message, retry link.
- Does not affect surrounding components.

### Retry Behavior

- Retry buttons re-attempt the failed operation.
- Show a loading state during retry.
- If retry fails again, continue showing the error with the retry option.

---

## 23. Content and Microcopy

### Page Titles

- Use nouns or noun phrases: "Users", "Workflow Settings", "Analytics".
- Do not use verbs: not "Manage Users", not "View Analytics".
- Capitalize each significant word (title case).

### Action Verbs

- Use specific verbs: "Create", "Save", "Delete", "Export", "Invite".
- Avoid vague verbs: not "Submit", not "Go", not "Proceed".
- Primary actions use a verb + noun: "Create User", "Save Changes", "Export Report".

### Button Labels

- Confirm buttons match the action: "Delete" for delete confirmation, "Save" for save, "Create User" for user creation.
- Cancel buttons say "Cancel" — not "Nevermind", not "Go Back".

### Empty-State Language

- Title: state the absence positively. "No workflows yet" rather than "Error: No data found."
- Description: guide the next step. "Create your first workflow to automate tasks."
- CTA: match the description. "Create Workflow."

### Confirmation Language

- Destructive confirmation: clearly state the consequence. "This will permanently delete 3 users. This action cannot be undone."
- Non-destructive confirmation: state the action. "Save changes to Workflow Settings?"

### Destructive Actions

- Always use the word "delete" or "remove" (not "trash" or "clear" when permanent).
- Always require confirmation.
- Confirmation dialog must name the affected resource.

---

## 24. Customization and Escape Hatches

### Escalation Hierarchy

```text
1. Existing semantic component
        |
        v
2. Existing page template
        |
        v
3. Composition of approved components
        |
        v
4. Product-specific component (using design tokens)
        |
        v
5. Proposed shared design-system addition
```

### Rules

- Steps 1-3 should cover the vast majority of product UI.
- Step 4 is acceptable. Product-specific components must use design-system tokens for colors, spacing, typography, and radius. They should visually harmonize with the design system without duplicating existing primitives.
- Step 5 is a contribution back to the shared system. It requires design review and version coordination.

### What Applications May Customize

- Application name and logo in the sidebar.
- Navigation structure and items (via `dashboard.yaml`).
- Page-specific content, data, and business logic.
- Product-specific components that do not duplicate design-system primitives.
- Additional routes beyond the generated set.

### What Applications Must Not Customize

- Design tokens (spacing, colors, typography, radius, elevation).
- Sidebar width, header height, or shell layout dimensions.
- Button hierarchy or button styles.
- Table density or table header treatment.
- Card styling (border, radius, shadow).
- Common component behavior (how drawers animate, how dialogs dismiss).
- Font family or font scale.

---

## 25. Prohibited Patterns

The following patterns are explicitly prohibited in applications consuming the design system:

| Prohibition | Reason |
|-------------|--------|
| Arbitrary hex/rgb colors in application components | Bypasses semantic color system; prevents global updates |
| Arbitrary spacing values (e.g., `margin: 13px`) | Breaks spacing scale consistency |
| Custom fonts without a design-system version change | Typography must remain unified |
| Direct Lucide icon imports in consuming applications | Icons must go through the `Icon` abstraction |
| Additional icon libraries (Font Awesome, Material Icons, etc.) | Single icon system prevents visual inconsistency |
| Additional component frameworks (Chakra, Ant Design, Bootstrap, Tailwind) | Competing design systems cause visual drift |
| Duplicating semantic components (e.g., custom card with different styling) | Use the design-system `AppCard` instead |
| Inline `style` props that override design tokens | Produces one-off visual exceptions |
| Custom sidebar, header, or shell layouts | Shell is owned by the design system |
| Heavy box shadows on resting surfaces | Borders are the separation mechanism |
| Decorative color without semantic purpose | Color must convey meaning |
| Nested cards (card inside card) | Creates visual noise; flatten the hierarchy |
| Product-specific redefinition of page header, navigation, or table patterns | These are shared patterns owned by the design system |
| `!important` overrides on design-system component styles | Undermines the component contract |

---

## 26. Governance and Enforcement

### What the Design System Defines

This document and the `@dashboard-bootstrap/design-system` package define the rules.

### What Dashboard Bootstrap Implements

The packages (`design-system`, `templates`, `generator`, `cli`) implement the rules as code. The reference application demonstrates compliance.

### What Can Be Checked Automatically

| Check | Mechanism | Scope |
|-------|-----------|-------|
| No direct MUI imports outside design-system | ESLint import boundary rule | Generated apps, reference app |
| No direct Lucide imports outside design-system | ESLint import boundary rule | Generated apps, reference app |
| No additional icon libraries | ESLint restricted imports | Generated apps, reference app |
| No arbitrary color values in application code | ESLint or stylelint rule | Application components |
| No `!important` overrides | Stylelint rule | All stylesheets |
| Component visual regression | Playwright screenshot comparison | Reference app |
| Accessibility violations | axe-core integration in component tests | All components |
| Design token completeness | Unit test | design-system package |

### What Keel May Enforce

Keel may invoke these checks as build gates:

- `design-system` — lint + unit tests pass.
- `frontend-tests` — all component and template tests pass.
- `visual-regression` — no unexpected screenshot changes.
- `accessibility` — axe-core audit passes.

Keel validates and enforces. Keel does not own the design contract. Ownership remains with `DESIGN_SYSTEM.md` and `@dashboard-bootstrap/design-system`.

---

## 27. Storybook Contract

Every semantic component and page template must be represented in Storybook with the following states where applicable:

### Component States

| State | Description |
|-------|-------------|
| Default | Normal resting state with representative content |
| Hover | Hovered interactive state (for interactive components) |
| Focus | Keyboard-focused state with focus ring visible |
| Disabled | Non-interactive disabled state |
| Loading | Loading/skeleton state |
| Error | Error state with error message |
| Empty | Empty/no-data state |
| Long content | Content that tests truncation, wrapping, and overflow |
| Small viewport | Component at minimum supported width |

### Required Storybook Entries

| Component | Required Stories |
|-----------|-----------------|
| AppShell | Default, collapsed sidebar, mobile overlay |
| Sidebar | Expanded, collapsed, with nested items, with many items (scroll) |
| TopNav | Default, with long breadcrumb path |
| PageHeader | With/without description, with actions, with tabs |
| PrimaryAction | Button, button with icon, button with dropdown |
| AppCard | Default, interactive hover, with title and content |
| MetricCard | With trend up, trend down, with sparkline, loading |
| AppDataTable | Default, loading, empty, with selection, with pagination, with sorting |
| FilterBar | With filters, with active filters, compact |
| SearchInput | Default, with value, focused |
| StatusBadge | Success, warning, error, info, neutral, with dot |
| AppDrawer | Small, medium, large, with form, with scroll |
| AppDialog | Default, destructive confirmation, alert |
| EmptyState | First-use, no results, with illustration |
| LoadingState | Skeleton table, skeleton cards, spinner |
| ErrorState | Page error, component error, with retry |
| AppForm | Standard form, with validation errors, with sections |
| FormField | Text input, select, checkbox, radio, switch, textarea, error state, disabled, read-only |
| Icon | All sizes, representative icons |
| Buttons | All variants (primary, secondary, tertiary, destructive, ghost), all sizes, disabled, loading, icon-only |

### Page Template Stories

Each template should have at least:
- Default with representative content
- Loading state
- Empty state
- Error state

---

## 28. Visual Regression Baseline

The following canonical pages from the reference application should be captured as Playwright screenshot baselines:

| Baseline | Page | Template | Key Elements |
|----------|------|----------|-------------|
| `dashboard-default` | Overview/Dashboard | Dashboard | Metric cards, charts, activity feed |
| `table-default` | Collection list | Table | Table with data, filter bar, pagination |
| `table-empty` | Empty collection | Table | Empty state |
| `detail-default` | Entity detail | Detail | Tabs, sections, metadata |
| `settings-default` | Settings | Settings | Settings nav, form fields |
| `catalog-default` | Catalog grid | Catalog | Card grid with multiple items |
| `builder-default` | Builder | Builder | Canvas with nodes, toolbar |
| `split-view-default` | Split view | Split View | List panel, detail panel |
| `empty-state-onboarding` | First-use | Empty State | Centered CTA |

### Baseline Rules

- Baselines are captured at 1280x800 viewport.
- A second set at 1024x768 validates the minimum supported desktop width.
- Screenshots validate the visual output of `@dashboard-bootstrap/design-system` and `@dashboard-bootstrap/templates` against this contract.
- Any visual difference beyond anti-aliasing tolerance must be reviewed.
- Baselines must be updated when this contract intentionally changes.

---

## 29. Design-System Versioning

Aligned with `docs/TDD.md` versioning strategy.

### Version Coupling

`DESIGN_SYSTEM.md` and `@dashboard-bootstrap/design-system` are versioned together. A change to the design contract in this document must be accompanied by a corresponding change to the executable implementation, and vice versa.

### Breaking Changes

The following are breaking changes that require a major version bump:

- Removing a semantic component.
- Changing a component's required props.
- Changing design tokens that affect layout (spacing scale, sidebar width, header height).
- Changing the typography scale.
- Changing the color system in a way that affects existing theme consumers.

### Non-Breaking Changes

The following are non-breaking:

- Adding new semantic components.
- Adding optional props to existing components.
- Adjusting token values within the same semantic role (e.g., shifting a hex value slightly).
- Adding new token roles.

### Application Dependency

Product applications depend on a known design-system version. Upgrading the design system should be an explicit, reviewed action — not an automatic drift.

### Visual Review

Visual changes must be intentional and reviewed via:
1. Updated `DESIGN_SYSTEM.md` documenting the change.
2. Updated implementation in `@dashboard-bootstrap/design-system`.
3. Visual regression test baseline updates reviewed and approved.

---

## 30. Design Decision Register

| ID | Decision | Rationale | Source |
|----|----------|-----------|--------|
| DS-001 | Sidebar width = 240px | Consistent with reference screenshots (~210-250px). 240px accommodates labels without truncation. | Screenshot synthesis |
| DS-002 | Borders preferred over shadows for resting surfaces | All references use thin borders. Enterprise admin UIs favor flat, clean card separation. | Screenshot synthesis |
| DS-003 | Card radius = 12px | Moderate rounding. Enough to feel modern without appearing casual. Consistent with 4 of 6 references. | Screenshot synthesis |
| DS-004 | 44px table row height | Balances density with touch target and readability. References ranged 40-48px. | Screenshot synthesis |
| DS-005 | Lucide outline icons at 1.5px stroke | Approved in TDD. All references use outline-style icons. | TDD AD-1, screenshot synthesis |
| DS-006 | Inter as primary typeface | Optimized for UI at small sizes. Tabular figures. Free. Widely supported. | Design evaluation |
| DS-007 | No elevation on cards — border only | 5 of 6 references show no card shadow. Shadows reserved for floating overlays only. | Screenshot synthesis |
| DS-008 | Page title 24px, body 14px | References show 22-28px page titles and 13-14px body text. Normalized to a clean scale. | Screenshot synthesis |
| DS-009 | action.primary = #2563EB (blue) | Neutral brand color that works across diverse product contexts. Not tied to a specific brand identity. | Design decision |
| DS-010 | Neutral cool gray scale (no warm tints) | Professional enterprise appearance. Warm tints create brand association. Cool neutrals are brand-agnostic. | Design decision |
| DS-011 | Uppercase section labels in sidebar (11px overline) | Consistent across 5 of 6 references. Clearly distinguishes navigation groups from navigation items. | Screenshot synthesis |
| DS-012 | 36px standard control height (buttons, inputs) | References show compact 34-40px controls. 36px aligns with the spacing scale and is a comfortable click target. | Screenshot synthesis |
| DS-013 | Primary text #111827 (near-black), not pure black | Reduces eye strain on white backgrounds. Consistent with reference screenshots. | Design evaluation |
| DS-014 | base-4 spacing scale | Enables fine-grained control (4, 8, 12, 16...) while maintaining mathematical consistency. Most references show spacing divisible by 4. | Screenshot synthesis |
| DS-015 | Metric cards: 28px value, 12px label above | References consistently use large numeric values with small labels. Normalized to design system type scale. | Screenshot synthesis |
| DS-016 | Collapsible sidebar supported | 2 of 6 references show collapse. Valuable for smaller screens and user preference. | Screenshot synthesis + responsive needs |
| DS-017 | Right-side context panel at 400px | References show 350-400px detail panels. 400px accommodates form fields and metadata. | Screenshot synthesis |
| DS-018 | WCAG 2.1 AA compliance target | Industry standard for enterprise SaaS. Required for many enterprise customers. | Accessibility requirement |

---

## 31. Open Design Questions

### DQ-1: Charting Library

**Question:** Which React charting library should be used for dashboard data visualizations?

**Why it matters:** The design system defines chart color palette, axis styling, and tooltip behavior. The library implements them. Library choice affects bundle size, customization depth, and accessibility.

**Candidates:** Recharts (popular, MUI-friendly), Nivo (declarative, good accessibility), Visx (low-level, maximum control).

**Input required:** Team preference on complexity vs. control tradeoff.

**Blocks implementation:** Does not block design-system or template architecture. Blocks dashboard template implementation that includes charts. Can be deferred to the dashboard template implementation phase.

### DQ-2: Sidebar Icon-Only Collapsed UX Details

**Question:** In collapsed sidebar mode, should navigation items show tooltip labels on hover, or should clicking the collapsed sidebar expand it?

**Why it matters:** Affects the interaction model for smaller screens and user preference.

**Recommendation:** Tooltips on hover (consistent with reference screenshots that show collapse). This is the default unless implementation reveals a UX problem.

**Blocks implementation:** No. Recommendation is provided. Can be validated during implementation.

---

Neither open question blocks design-system or template implementation. Both can be resolved during their respective implementation phases.
