# Next.js E-commerce Store

A full-stack e-commerce store built with **Next.js**, created as a learning project to explore modern web development practices, performance optimization, and full-stack integrations.

---

## Features

### Core Functionality

- **User Authentication**: Sign up, sign in, and secure password hashing with **bcrypt** and Auth.js.
- **Product Management**:
  - Product categories
  - Product search
  - Product sorting
  - Pagination
- **Shopping Cart**: Fully functional cart with add/remove items.
- **Orders**: Personal orders tab for users.
- **Payments**: Stripe sandbox integration for payment processing.

### Forms & Validation

- Forms handled with **React Hook Form (RHF)**
- Validation and schema management using **Zod**

### UI & Icons

- Components styled using **shadcn/ui**
- Icons powered by **lucide-react**

### SEO & Marketing

- Dynamic **metadata** for pages
- **JSON-LD structured data** for rich search results
- **Sitemap** and **robots.txt** for search engine indexing

### Performance Optimization

- **ISR (Incremental Static Regeneration)** for static pages
- **SWR** for client-side data fetching (e.g., from cookies)
- Database queries cached using **Next.js `unstable_cache`**

---

## Tech Stack

- **Frontend & Backend**: Next.js
- **Database**: PostgreSQL (via Docker)
- **ORM**: Prisma
- **Authentication & Security**: Auth.js + bcrypt
- **Payments**: Stripe
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Form Handling**: React Hook Form + Zod
- **SEO**: Metadata, JSON-LD, Sitemap, Robots.txt
- **Caching**: SWR + unstable_cache
