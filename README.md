# BuiltByRays™ Public Website

Professional website for BuiltByRays™ - a family-owned residential construction company serving Central Indiana.

## 🏗️ About BuiltByRays™

- **Services**: Home repairs, custom carpentry, remodels & renovations
- **Location**: Central Indiana
- **Experience**: 15+ years, 1000+ completed projects
- **Contact**: (317) 789-6362 | info@builtbyrays.com

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

#### Cloudflare Pages (Recommended)
1. Connect your GitHub repository to Cloudflare Pages
2. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 18.x or 20.x LTS
3. Deploy automatically on push to main branch

#### Manual Deployment
```bash
# Build the site
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

## 📁 Project Structure

```
builtbyrays-public/
├── public/                 # Static assets
│   ├── brand/             # Brand assets (logo, theme, hero images)
│   │   ├── theme.css      # Main stylesheet
│   │   └── hero/          # Hero background images
│   └── _headers           # Cloudflare Pages headers
├── src/                   # Source files
│   └── index.ts           # Main TypeScript entry
├── index.html             # Homepage
├── about.html             # About page
├── contact.html           # Contact page
├── package.json           # Dependencies & scripts
├── vite.config.ts         # Vite configuration
├── wrangler.toml          # Cloudflare configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎨 Design System

- **Fonts**: Poppins (headings) + Inter (body)
- **Colors**: Dark green palette (#0e6b50 primary)
- **Layout**: Responsive grid system
- **Components**: Cards, buttons, hero sections

## 🔧 Configuration

### Cloudflare Pages
- **Project name**: `builtbyrays-public`
- **Custom domain**: Configure in Cloudflare dashboard
- **Environment variables**: Set in Pages dashboard if needed

### Local Development
- **Port**: 3000 (dev) / 4173 (preview)
- **Hot reload**: Enabled
- **TypeScript**: Full support

## 📞 Contact

- **Email**: info@builtbyrays.com
- **Phone**: (317) 789-6362
- **Hours**: Mon-Fri 8a-6p, Sat-Sun 10a-5p
- **Service Area**: Central Indiana

---

© 2025 BuiltByRays™. All rights reserved.