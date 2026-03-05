# Personal Book Manager

A beautifully simple, elegant space for readers to log their books, reflect on their habits, and rediscover their favorite authors. Built for exceptional clarity and a premium user experience without the noise.

## 🚀 Tech Stack

- **Frontend & Backend API**: Next.js 16 App Router (React Server Components, API Route Handlers)
- **Database**: MongoDB Atlas via Mongoose
- **Authentication**: Custom JWT implementation (HTTP-only cookies via `jose`)
- **Styling**: Tailwind CSS (with Glassmorphism and responsive design)

## 📁 Project Structure

This project uses the Next.js App Router paradigm, serving both frontend pages and backend API routes from a single, cohesive repository.

```
/app
  /api          # Backend Next.js API Routes (Auth, Books CRUD)
  /login        # Authentication Frontend
  /signup       # Registration Frontend
  /dashboard    # Protected Book Manager UI
  globals.css   # Main stylesheet (Tailwind directives & variables)
  layout.js     # Root layout structure
  page.js       # Premium Landing Page
/components
  /ui           # Reusable micro-components (Input, Button, Select, Modal)
  BookCard.js   # Individual book display logic
  BookForm.js   # Add/Edit book state management
/lib
  auth.js       # JWT signing and verification utilities
  mongodb.js    # Database connection caching logic
/models
  Book.js       # Mongoose Book Schema
  User.js       # Mongoose User Schema
proxy.js        # Next.js 16 Edge proxy to protect dashboard routes
```

## 🛠️ Local Setup Instructions

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Copy the example environment file and fill in your details:
   ```bash
   cp .env.example .env.local
   ```
   *You'll need a MongoDB Atlas connection string (`MONGODB_URI`) and a secure `JWT_SECRET` string.*

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 Key Product Decisions

1. **Next.js unified architecture:** Chosen over a separate Node/Express repo to maximize developer velocity, eliminate CORS complexities, and dramatically simplify Vercel deployments.
2. **Design Philosophy:** "Insight, not noise." Features heavy use of CSS variables for instant theming, subtle gradients, and glassmorphism (backdrop-filter) to give it a modern "macOS" aesthetic. Custom Tailwind components rather than off-the-shelf component libraries ensure it feels handcrafted.
3. **Security:** JWTs are stored in `httpOnly` secure cookies rather than LocalStorage to prevent XSS attacks. The application utilizes a Next.js Edge proxy to protect private routes seamlessly.

*Prepared with love and care.*
