# Hero Images

This folder contains hero background images for each page of the BuiltByRays website.

## Required Images

### Home Page

- `hero-home-1920.jpg` (16:9 aspect ratio, 1920×1080)
- `hero-home-3840.jpg` (16:9 aspect ratio, 3840×2160 for 4K displays)
- `hero-home-mobile-1080.jpg` (3:4 or 4:5 aspect ratio, 1080×1440 or 1080×1350)

### About Page

- `hero-about-1920.jpg` (16:9 aspect ratio, 1920×1080)
- `hero-about-3840.jpg` (16:9 aspect ratio, 3840×2160 for 4K displays)
- `hero-about-mobile-1080.jpg` (3:4 or 4:5 aspect ratio, 1080×1440 or 1080×1350)

### Contact Page

- `hero-contact-1920.jpg` (16:9 aspect ratio, 1920×1080)
- `hero-contact-3840.jpg` (16:9 aspect ratio, 3840×2160 for 4K displays)
- `hero-contact-mobile-1080.jpg` (3:4 or 4:5 aspect ratio, 1080×1440 or 1080×1350)

## Image Guidelines

- **Desktop/Large screens**: 16:9 aspect ratio (1920×1080, 3840×2160)
- **Mobile**: 3:4 or 4:5 aspect ratio (1080×1440, 1080×1350)
- Keep the subject center/left with safe area so overlay text doesn't cover faces/tools
- Alt text example: "Ray installing custom cabinetry in Indianapolis" or "Deck framing in progress — Brownsburg, IN"
- Images should showcase BuiltByRays construction work and projects

## Technical Notes

The CSS automatically selects the appropriate image based on screen size:

- Desktop (1440px+): Uses 3840px version
- Tablet/Desktop (768px+): Uses 1920px version
- Mobile (<768px): Uses mobile version

Images are served with a green overlay gradient for text readability.
