# TicketBounty - Road to Next.js Course Project

A full-stack ticket management application built while completing the [Road to Next.js](https://www.road-to-next.com) course (Software Engineer Journey). This project demonstrates modern Next.js development patterns with personal adjustments and improvements beyond the original course material.

🌐 **Live Demo**: [https://roadtonext.deibit.dev](https://roadtonext.deibit.dev)

## Overview

TicketBounty is a multi-tenant ticket management system where users can create tickets with bounties, collaborate within organizations, and manage team workflows. The application showcases production-ready patterns for authentication, authorization, payments, and background job processing.

## Key Features

### 🎫 Ticket Management
- Create, edit, and track tickets with bounty amounts
- Rich status workflow (Open → In Progress → Done)
- File attachments for tickets and comments
- Advanced search, filtering, sorting, and pagination

### 👥 Multi-tenant Organizations
- Create and manage multiple organizations
- Role-based access control (Admin/Member)
- Granular permissions per membership
- Invite team members via email with secure tokens
- Switch between organizations seamlessly

### 🔐 Authentication & Security
- Full authentication flow with Better Auth
- Email verification with custom React Email templates
- Password reset functionality
- Secure session management
- API credentials for programmatic access

### 💳 Stripe Integration
- Subscription-based billing per organization
- Multiple pricing tiers
- Webhook handling for payment events
- Customer portal integration

### 💬 Comments & Collaboration
- Comment threads on tickets
- Infinite scroll loading (TanStack Query)
- File attachments on comments

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 with App Router |
| **Language** | TypeScript (strict mode) |
| **React** | React 19 with React Compiler |
| **Database** | PostgreSQL with Prisma ORM |
| **Authentication** | Better Auth |
| **State Management** | TanStack Query (React Query) |
| **Forms** | React Hook Form + Zod validation |
| **Styling** | Tailwind CSS 4 + shadcn/ui (Radix UI) |
| **Email** | React Email + Resend |
| **Payments** | Stripe |
| **Background Jobs** | Inngest |
| **File Storage** | AWS S3 with presigned URLs |
| **URL State** | nuqs |
| **Linting** | Biome |

## Architecture Highlights

### Feature-Based Organization

The codebase follows a **feature-based architecture** where related functionality is grouped together, making it highly maintainable and scalable:

```
src/
├── app/                    # Next.js App Router
│   ├── (home)/             # Public landing page
│   ├── (public)/           # Auth pages (sign-in, sign-up, etc.)
│   ├── (app)/              # Authenticated routes
│   │   └── (org_required)/ # Routes requiring organization
│   └── api/                # API routes
├── features/               # Feature modules
│   ├── ticket/             # Ticket management
│   ├── organization/       # Organization handling
│   ├── membership/         # Team memberships
│   ├── comment/            # Comment system
│   ├── auth/               # Authentication
│   ├── stripe/             # Payment integration
│   └── ...
├── components/             # Shared UI components
└── lib/                    # Core utilities
```

### Server-First Data Fetching

Almost all data fetching happens server-side in Server Components, with client-side fetching reserved only for specific use cases like infinite scroll:

```typescript
// Server Component - Direct database access
export default async function TicketsPage({ searchParams }) {
  const tickets = await getTickets(userId, searchParams);
  return <TicketList tickets={tickets} />;
}
```

### Type-Safe Server Actions

Mutations use server actions with a clean `ActionResult<T>` pattern:

```typescript
'use server';

const updateTicket = async (id: string, data: TicketData) => {
  // Validation, authorization, database operations
  await prisma.ticket.update({ where: { id }, data });
  revalidatePath('/tickets');
  return actionSuccess({ id });
};
```

## Differences from the Course

This implementation includes several personal adjustments:

| Area | Course | This Project |
|------|--------|--------------|
| **Authentication** | Lucia/Oslo | BetterAuth |
| **Server Actions** | FormData + ActionState | Async server calls with `ActionResult<T>` |
| **Code Quality** | ESLint + Prettier | Biome (faster, unified) |
| **AI usage** | - | Cursor & rules for AI-assisted development |

## Learning Outcomes

Building this project provided hands-on experience with:

- **Modern Next.js patterns** - App Router, Server Components, Server Actions, Parallel Routes
- **Full-stack TypeScript** - End-to-end type safety from database to UI
- **Authentication flows** - Email verification, password reset, session management
- **Multi-tenancy** - Organization-based data isolation and access control
- **Payment integration** - Stripe subscriptions with webhook handling
- **Background jobs** - Async processing with Inngest
- **File uploads** - Secure S3 presigned URL workflow
- **Production patterns** - Error handling, loading states, optimistic updates

## License

This project was built as part of the Road to Next.js course for educational purposes.

---

Built with ❤️ by David Ramos | [Course](https://www.road-to-next.com) | [Live Demo](https://roadtonext.deibit.dev)
