# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and vanilla JavaScript. Features dark/light theme switching, particle animations, and responsive design.

## Features

- 🎨 **Dark/Light Theme** - Toggle between dark and light themes with persistent storage
- ✨ **Particle Animations** - Interactive particle background with mouse interaction
- 📱 **Responsive Design** - Mobile-first approach with breakpoints for all devices
- 🎯 **Smooth Navigation** - Smooth scrolling and active link indicators
- 📝 **Contact Form** - Email form validation with Supabase integration
- ⚡ **Performance Optimized** - Lazy loading, optimized CSS, and efficient JavaScript
- ♿ **Accessible** - WCAG 2.1 compliant with semantic HTML

## Project Structure

```
/
├── index.html              # Home page
├── projects.html           # Projects showcase
├── about.html              # About/CV page
├── contact.html            # Contact form
├── css/
│   ├── main.css           # Core styles and design tokens
│   ├── components.css     # Component styles
│   └── responsive.css     # Responsive/mobile styles
├── js/
│   ├── main.js            # Core functionality & theme
│   ├── navigation.js      # Navigation & mobile menu
│   ├── particles.js       # Particle animation system
│   ├── contact-form.js    # Form validation & submission
│   └── projects-filter.js # Project filtering
├── images/                # Project images
├── .github/workflows/     # GitHub Actions CI/CD
└── vercel.json           # Vercel deployment config
```

## Installation

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd projekt_trae_builder
```

2. Install dependencies (optional, for development tools):
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Serve with a local server:
```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js http-server
npx http-server
```

5. Open `http://localhost:8000` in your browser

## Configuration

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_FUNCTIONS_URL=https://your-project.supabase.co/functions/v1
SUPABASE_ANON_KEY=your-anon-key

# Optional
SENTRY_DSN=your-sentry-dsn
DEPLOY_ENV=development
```

### Theme Configuration

The theme system uses CSS custom properties (variables) defined in `css/main.css`:

- Light theme: `html[data-theme="light"]`
- Dark theme: `html[data-theme="dark"]`
- Default: Follows system preference

### Customization

1. **Colors** - Edit CSS variables in `css/main.css`
2. **Content** - Update HTML files directly
3. **Projects** - Add projects in `projects.html`
4. **Contact Info** - Update `contact.html`

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Enable GitHub Actions CI/CD
4. Push to `main` branch to deploy

### Manual Deployment

1. Build/optimize assets:
```bash
# Minify CSS/JS if needed
# Optimize images
```

2. Deploy to your hosting provider:
```bash
# Example with Vercel CLI
vercel --prod

# Example with GitHub Pages
# Push to gh-pages branch
```

### GitHub Actions

The CI/CD pipeline automatically:
- Validates HTML files
- Deploys to Vercel on `main` push
- Supports preview deployments on PRs

## Features Breakdown

### Dark/Light Theme
- Automatically detects system preference
- Persists user choice in localStorage
- Toggles via button in header
- Full theme switching with CSS variables

### Particle Animation
- Mouse-interactive particles
- Theme-aware colors
- Responsive to viewport size
- Smooth animations at 60 FPS

### Responsive Design
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Contact Form
- Email validation
- Character counter
- Form field validation
- Supabase integration (optional)
- Fallback to console logging

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Performance

- Lighthouse Score: 90+
- Core Web Vitals optimized
- Lazy loading for images
- CSS/JS minification ready
- No external dependencies

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Color contrast compliance

## Customization Guide

### Adding a New Project

1. Open `projects.html`
2. Add a new `<article class="project-card">` block
3. Update image, title, description, and tags
4. Add appropriate `data-category` for filtering

### Changing Colors

Edit `css/main.css` CSS variables:

```css
:root {
  --color-primary: #00A8FF;
  --color-secondary: #FF6B6B;
  /* ... */
}
```

### Modifying Layout

Breakpoints in `css/responsive.css`:
- `@media (max-width: 768px)` - Tablet
- `@media (max-width: 640px)` - Mobile

## Troubleshooting

### Theme Not Persisting
- Check if localStorage is enabled
- Clear browser cache and cookies

### Contact Form Not Submitting
- Verify Supabase credentials in `.env.local`
- Check browser console for errors
- Ensure Edge Function is deployed

### Images Not Loading
- Verify image paths in HTML
- Check image files exist in `/images/`
- Use relative paths: `./images/image.jpg`

## Development

### Code Style
- Vanilla JavaScript (no frameworks)
- BEM CSS naming convention
- Semantic HTML5
- Progressive enhancement

### Best Practices
- Use CSS variables for consistency
- Minimize DOM manipulation
- Debounce/throttle event listeners
- Use semantic HTML elements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[Your License Here]

## Support

For issues or questions:
- Check existing documentation
- Review the code comments
- Open an issue on GitHub

## Deployment Checklist

Before deploying:
- [ ] Update all content (projects, about, contact info)
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check images are optimized
- [ ] Update domain in vercel.json
- [ ] Set environment variables in Vercel
- [ ] Test form submission
- [ ] Verify theme switching works
- [ ] Run performance audit

## Related Documentation

- [Design System](/.trae/documents/portfolio_architecture.md)
- [Dark Theme Implementation](/.trae/documents/Comprehensive%20Dark%20Theme%20and%20Deployment%20Plan.md)
- [Deployment Plan](/.trae/documents/portfolio_prd.md)
