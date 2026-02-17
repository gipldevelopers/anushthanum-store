# Anushthanum Final - Project Guidelines

This document outlines the structure, technology stack, and development guidelines for the `anushthanum-final` project.

## 1. Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Built on [Radix UI](https://www.radix-ui.com/) primitives (likely using [shadcn/ui](https://ui.shadcn.com/) patterns).
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: 
  - **Server State**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
  - **Global State**: React Context (`src/context`)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with resolvers (`@hookform/resolvers`).

## 2. Project Structure

The project follows the standard Next.js App Router structure within the `src` directory:

```
src/
├── app/
│   ├── admin/
│   │   ├── categories/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.js
│   │   │   ├── new/
│   │   │   │   └── page.js
│   │   │   └── page.js
│   │   ├── content/
│   │   │   └── page.js
│   │   ├── login/
│   │   │   └── page.js
│   │   ├── media/
│   │   │   └── page.js
│   │   ├── orders/
│   │   │   └── page.js
│   │   ├── products/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.js
│   │   │   ├── new/
│   │   │   │   └── page.js
│   │   │   └── page.js
│   │   ├── settings/
│   │   │   └── page.js
│   │   ├── subcategories/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.js
│   │   │   ├── new/
│   │   │   │   └── page.js
│   │   │   └── page.js
│   │   ├── layout.js
│   │   └── page.js
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.js
│   │   └── page.js
│   ├── browse-by-intention/
│   │   └── page.js
│   ├── category/
│   │   ├── [...slug]/
│   │   │   └── page.js
│   │   └── [slug]/
│   ├── checkout/
│   │   └── page.js
│   ├── contact/
│   │   └── page.js
│   ├── disclaimer/
│   │   └── page.js
│   ├── education/
│   │   └── page.js
│   ├── energization/
│   │   └── page.js
│   ├── forgot-password/
│   │   └── page.js
│   ├── guidance/
│   │   └── [topic]/
│   │       └── page.js
│   ├── order-confirmation/
│   │   └── [orderId]/
│   │       └── page.js
│   ├── product/
│   │   └── [slug]/
│   │       └── page.js
│   ├── profile/
│   │   └── page.js
│   ├── signin/
│   │   └── page.js
│   ├── signup/
│   │   └── page.js
│   ├── track-order/
│   │   └── page.js
│   ├── wishlist/
│   │   └── page.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   ├── not-found.js
│   └── page.js
├── components/
│   ├── admin/
│   │   ├── AdminHeader.jsx
│   │   ├── AdminSidebar.jsx
│   │   └── ProductForm.jsx
│   ├── layout/
│   │   ├── CartSidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── LayoutShell.jsx
│   │   ├── Navbar.jsx
│   │   ├── RootLayoutClient.jsx
│   │   ├── ScrollNavigation.jsx
│   │   └── WhatsAppButton.jsx
│   ├── providers/
│   │   └── Providers.jsx
│   ├── sections/
│   │   ├── BlogSection.jsx
│   │   ├── CategoriesSection.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── GuidanceSection.jsx
│   │   ├── HeroCarousel.jsx
│   │   ├── LearningJourneySection.jsx
│   │   ├── PopularProductsSection.jsx
│   │   ├── ProductReviews.jsx
│   │   ├── QuickAccessSection.jsx
│   │   ├── RecentlyViewedSection.jsx
│   │   ├── TeamExpertsSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   └── WhyChooseUsSection.jsx
│   └── ui/
│       ├── accordion.jsx
│       ├── alert-dialog.jsx
│       ├── avatar.jsx
│       ├── badge.jsx
│       ├── button.jsx
│       ├── card.jsx
│       ├── checkbox.jsx
│       ├── DeliveryEstimate.jsx
│       ├── dialog.jsx
│       ├── dropdown-menu.jsx
│       ├── EmptyState.jsx
│       ├── ImageLightbox.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── ProductCard.jsx
│       ├── progress.jsx
│       ├── QuickViewModal.jsx
│       ├── radio-group.jsx
│       ├── scroll-area.jsx
│       ├── select.jsx
│       ├── separator.jsx
│       ├── skeleton.jsx
│       ├── slider.jsx
│       ├── StickyAddToCart.jsx
│       ├── switch.jsx
│       ├── table.jsx
│       ├── tabs.jsx
│       ├── textarea.jsx
│       └── tooltip.jsx
├── context/
│   ├── AdminAuthContext.jsx
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── RecentlyViewedContext.jsx
│   └── WishlistContext.jsx
├── data/
│   ├── blogs.js
│   ├── products.js
│   └── reviews.js
├── lib/
│   └── utils.js
└── services/
    └── adminApi.js
```

## 3. Development Workflow

### Prerequisites
Ensure you have Node.js installed (LTS version recommended).

### Installation
Install dependencies:
```bash
npm install
```

### Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production
Build the application:
```bash
npm run build
```

### Start Production Server
Run the built application:
```bash
npm start
```

### Linting
Check for code issues:
```bash
npm run lint
```

## 4. Coding Standards & Best Practices

### Styling
- **Utility-First**: Use Tailwind CSS classes for styling.
- **Class Merging**: Use the `cn()` utility from `src/lib/utils.js` when conditionally applying classes or allowing class overrides in components.
  ```javascript
  import { cn } from "@/lib/utils";
  
  export function MyComponent({ className }) {
    return <div className={cn("p-4 bg-white", className)}>...</div>;
  }
  ```

### Components
- **Composition**: Prefer small, reusable components.
- **Client Components**: Add `"use client";` at the top of files that use hooks (`useState`, `useEffect`) or event handlers.
- **Server Components**: By default, components in `app/` are Server Components. Keep them as such for performance unless interactivity is needed.

### API & Data Fetching
- **Services**: Centralize API calls in `src/services` (e.g., `adminApi.js`).
- **React Query**: Use `useQuery` and `useMutation` for data fetching and caching in client components.

### File Naming
- **Components**: PascalCase (e.g., `Button.js`, `ProductCard.js`).
- **Utilities/Services**: camelCase (e.g., `utils.js`, `adminApi.js`).
- **Routes**: kebab-case directories (e.g., `product-details/page.js`).

## 5. Key Dependencies Overview

- **`clsx` & `tailwind-merge`**: Used together in `cn()` to handle Tailwind class conflicts.
- **`lucide-react`**: Import icons as components (e.g., `import { Menu } from 'lucide-react';`).
- **`sonner`**: Use `toast` for notifications.
  ```javascript
  import { toast } from "sonner";
  toast.success("Operation successful");
  ```
