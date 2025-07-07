# BB Web Research Prototypes

This repository contains prototypes for BB Web Research project - July 2025.

## GitHub Pages Deployment

- **Main Page**: https://susanwalsh-eng.github.io/BB-Web-Research-Prototypes/
- **Prototype 1**: https://susanwalsh-eng.github.io/BB-Web-Research-Prototypes/prototype-1/
- **Prototype 2**: https://susanwalsh-eng.github.io/BB-Web-Research-Prototypes/prototype-2/

## Local Development

The source files are in the "BB Web - Research - July 2025" directory.

## Deployment Status

Last updated: July 7, 2025 - Triggering fresh GitHub Pages deployment

# Forest Wines Dashboard - Unified Prototypes

A comprehensive banking dashboard application built with Next.js and TypeScript, featuring multiple prototype iterations for rapid development and testing.

## 🏗️ Repository Structure

```
forest-wines-dashboard/
├── prototype-1/              # Original dashboard implementation
├── prototype-2/              # Enhanced with Suggested Actions feature
├── shared/                   # Shared components and utilities (future)
└── README.md                # This documentation
```

## 🚀 Prototypes Overview

### Prototype 1 - Original Dashboard
**Location**: `./prototype-1/`

**Features:**
- Complete banking dashboard with sidebar navigation
- Account balance overview with Monzo branding
- Payment requests with contextual card interactions
- Scheduled payments table with side panel details
- Cash flow metrics and recent activity
- Get Paid page with invoices management
- Payments page with payment tools and recipients
- Responsive design and mobile optimization

**Key Components:**
- `DashboardHeader` - Main header with branding
- `PaymentRequests` - Expandable payment cards
- `ScheduledPayments` - Table with interactive rows
- `GetPaid` - Invoice management with filtering
- `Payments` - Payment tools and recent recipients

### Prototype 2 - Suggested Actions Enhancement
**Location**: `./prototype-2/`

**New Features:**
- **"Forest Wines 2" branding** - Updated header to identify prototype version
- **Suggested Actions component** - Horizontal scrolling cards with transport controls
- **Mock data integration** - 5 sample action cards from JSON database
- **Enhanced UI interactions** - Left/right arrow navigation
- **Contextual cards replacement** - Replaced right sidebar with main content integration

**Key Additions:**
- `SuggestedActions` component with transport controls
- `suggestedActions.json` mock data
- Updated CSS styling for new layout
- Removed contextual card stack dependencies

**Design Specifications:**
- Title: "Suggested actions" with sparkle icon (✨)
- Horizontally scrollable layout with overflow handling
- Card width: ~325px with rounded corners
- Transport controls: circular arrow buttons in top-right
- Status pills: OVERDUE (orange), PAID (green), DRAFT (grey), DUE (dark)

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Running Prototype 1
```bash
cd prototype-1
npm install
npm run dev
```
Open [http://localhost:3000/forest-wines-dashboard/](http://localhost:3000/forest-wines-dashboard/)

### Running Prototype 2  
```bash
cd prototype-2
npm install
npm run dev
```
Open [http://localhost:3000/forest-wines-dashboard/](http://localhost:3000/forest-wines-dashboard/)

## 🔧 Technical Stack

- **Framework**: Next.js 15.3.4
- **Language**: TypeScript
- **Styling**: CSS Modules with custom properties
- **Icons**: SVG components
- **Data**: JSON mock data
- **Responsive**: Mobile-first design

## 📊 Comparison Between Prototypes

| Feature | Prototype 1 | Prototype 2 |
|---------|-------------|-------------|
| Branding | "Forest Wines" | "Forest Wines 2" |
| Right Sidebar | Contextual Cards | Removed |
| Main Content | Standard layout | Suggested Actions integrated |
| Transport Controls | None | Left/right arrows |
| Mock Data | Banking data only | + Suggested actions |
| Layout Width | Fixed with sidebar | Full-width main content |

## 🎯 Future Development

### Shared Components (./shared/)
Plan to extract common components:
- `Button` - Reusable button system
- `Card` - Base card component
- `Table` - Enhanced table with sorting
- `Modal` - Unified modal system
- `Icons` - SVG icon library

### Next Prototypes
- **Prototype 3**: Advanced filtering and search
- **Prototype 4**: Real-time notifications
- **Prototype 5**: Mobile-native optimizations

## 🚀 Deployment

Each prototype can be deployed independently:

### Vercel Deployment
```bash
# For Prototype 1
cd prototype-1
vercel --prod

# For Prototype 2  
cd prototype-2
vercel --prod
```

### Docker Support
```dockerfile
# Example Dockerfile for any prototype
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Development Notes

- Each prototype maintains independent `package.json` and dependencies
- Shared styling variables defined in `globals.css`
- Mobile-responsive breakpoints: 768px (tablet), 480px (mobile)
- TypeScript strict mode enabled
- ESLint configuration for code quality

## 🤝 Contributing

1. Choose the appropriate prototype folder
2. Make changes within that prototype's scope
3. Test locally before committing
4. Document any new features in this README

## 📄 License

Private repository - Forest Wines Banking Dashboard Prototypes

---

**Last Updated**: January 2, 2025  
**Current Version**: Prototype 2 (Suggested Actions)  
**Repository**: https://github.com/susanwalsh-eng/forest-wines-dashboard 