# New Idealive Website

A modern web application built with Nuxt 3, featuring a responsive design powered by Tailwind CSS, smooth animations with GSAP, and backend services through Supabase.

## 🚀 Technologies Used

- **Nuxt 3** - The Vue.js framework for production-ready applications
- **Tailwind CSS** - A utility-first CSS framework for rapid UI development
- **GSAP** - High-performance JavaScript animation library
- **Supabase** - Open source Firebase alternative for backend services
- **Pinia** - Intuitive state management for Vue.js
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Typed JavaScript for better development experience

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn package manager
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/aepsaefulloh/new-idealive-website.git
cd new-idealive-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Supabase configuration:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm run start
```

### Static Site Generation
```bash
npm run generate
npm run preview
```

## 📁 Project Structure

```
├── assets/           # Static assets (CSS, images, fonts)
├── components/       # Reusable Vue components
├── composables/      # Vue composables for reusable logic
├── layouts/          # Page layouts
├── middleware/       # Nuxt middleware
├── pages/            # Application pages (file-based routing)
├── plugins/          # Nuxt plugins
├── public/           # Public static files
├── server/           # Server-side API routes
├── stores/           # Pinia state management
├── supabase/         # Supabase configuration and migrations
└── utils/            # Utility functions
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom configuration in `tailwind.config.js`. Additional plugins and utilities can be added as needed.

### GSAP Animations
GSAP is integrated through the `useGsap` composable. Animations are optimized for performance and accessibility.

### Supabase Integration
Database operations are handled through Supabase client configured in `plugins/supabase.ts`. Authentication and data fetching are managed via composables and stores.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run generate` - Generate static site
- `npm run preview` - Preview generated site
- `npm run postinstall` - Prepare Nuxt after installation

## 📞 Contact

For questions or support, please contact the development team.