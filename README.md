# BB-Web-Research-Prototypes

Web Research Prototypes for Business Banking

## 🚀 GitHub Pages Deployment

This repository is set up to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### Setup Instructions

1. **Enable GitHub Pages**:

   - Go to your repository Settings
   - Navigate to Pages section
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy on the next push

2. **Access the Site**:
   - Your site will be available at: `https://[username].github.io/BB-Web-Research-Prototypes`
   - The root redirects to the July 2025 research overview

### Site Structure

```
/                           → Redirects to /July2025/
/July2025/                  → Main overview page with prototype links
/July2025/prototype-1/      → Prototype 1 (placeholder)
/July2025/prototype-2/      → Prototype 2 (placeholder)
```

### Local Development

To run locally, simply open `index.html` in your browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .
```

### Adding New Prototypes

1. Create a new directory under `July2025/`
2. Add an `index.html` file
3. Update the links in `July2025/index.html`
4. Commit and push - GitHub Actions will automatically deploy

### Security Features

- Password protection on the main overview page
- Basic developer tools prevention
- Right-click context menu disabled

### Tech Stack

- Pure HTML/CSS/JavaScript
- No build process required
- Responsive design with Inter font
- Monzo brand colors and styling

## 🛠️ Repository Structure

```
BB-Web-Research-Prototypes/
├── index.html                    # Root redirect page
├── July2025/
│   ├── index.html               # Main overview page
│   ├── prototype-1/
│   │   ├── index.html          # Prototype 1
│   │   ├── next-env.d.ts       # Next.js config
│   │   └── next.config.js      # Next.js config
│   └── prototype-2/
│       ├── index.html          # Prototype 2
│       ├── next-env.d.ts       # Next.js config
│       └── next.config.js      # Next.js config
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions deployment
└── README.md                   # This documentation
```

## 🎯 Current Status

- **Root Page**: ✅ Redirects to July2025
- **Overview Page**: ✅ Password protected with prototype links
- **Prototype 1**: ✅ Placeholder page with Monzo branding
- **Prototype 2**: ✅ Placeholder page with Monzo branding
- **GitHub Pages**: ✅ Auto-deployment configured

## 📝 Development Notes

- Each prototype is currently a static HTML page
- Next.js config files present for future development
- Consistent Monzo branding across all pages
- Mobile-responsive design
- Password: `forest2025`

## 🤝 Contributing

1. Clone the repository
2. Make changes to the appropriate files
3. Test locally by opening `index.html`
4. Commit and push - GitHub Actions will deploy automatically

---

**Last Updated**: January 2025  
**Current Version**: Static HTML Prototypes  
**Repository**: BB-Web-Research-Prototypes
