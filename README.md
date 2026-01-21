# Barbershop Ecosystem Hierarchial

## Project Overview
- **Name**: Barbershop Ecosystem Hierarchial
- **Goal**: Digital transformation platform untuk industri barbershop Indonesia
- **Tech Stack**: Hono + Cloudflare Pages + D1 + Vanilla JS + Duitku + WhatsApp API
- **Status**: ✅ Checkpoint 1 Complete - Foundation Setup

## URLs
- **Production**: TBD (deploy after Checkpoint 6)
- **GitHub**: https://github.com/Estes786/BARBERSHOP-ECOSYSTEM-HIERARCHIAL.git

## Current Features (Checkpoint 1)
✅ Project structure initialized  
✅ Git repository setup  
✅ Hono backend framework configured  
✅ Cloudflare Pages deployment ready  
✅ D1 database schema created  
✅ Development environment configured  

## Data Architecture
### Data Models
- **Users**: Customer profiles with loyalty tiers (Bronze/Silver/Gold)
- **Barbers**: Shop owner profiles with subscription tiers
- **Services**: Service offerings per barber
- **Bookings**: Appointment management system
- **Reviews**: Customer feedback and ratings

### Storage Services
- **Cloudflare D1**: SQLite database for relational data
- **Cloudflare KV**: (Future) Session storage and caching
- **Cloudflare R2**: (Future) Image and file storage

### Database Schema Highlights
```sql
users (id, phone, name, loyalty_tier, loyalty_points)
barbers (id, phone, name, shop_name, rating_average, subscription_tier)
services (id, barber_id, name, price, duration_minutes)
bookings (id, user_id, barber_id, service_id, booking_date, status)
reviews (id, booking_id, rating, comment)
```

## User Guide
### For Developers

**Setup (First Time)**
```bash
# Clone repository
git clone https://github.com/Estes786/BARBERSHOP-ECOSYSTEM-HIERARCHIAL.git
cd BARBERSHOP-ECOSYSTEM-HIERARCHIAL

# Install dependencies
npm install

# Build project
npm run build

# Setup local D1 database
npm run db:migrate:local
npm run db:seed
```

**Development Workflow**
```bash
# Start development server with PM2
npm run clean-port
pm2 start ecosystem.config.cjs

# Test the application
npm test

# Check logs
pm2 logs webapp --nostream

# Stop server
pm2 delete webapp
```

**Database Management**
```bash
# Apply migrations locally
npm run db:migrate:local

# Seed test data
npm run db:seed

# Reset database (delete + migrate + seed)
npm run db:reset

# Execute SQL query locally
npm run db:console:local -- --command="SELECT * FROM users"
```

**Deployment**
```bash
# Build for production
npm run build

# Deploy to Cloudflare Pages
npm run deploy:prod
```

### For Users (Coming Soon)
- Customer booking interface (Checkpoint 4)
- Barber dashboard (Checkpoint 4)
- Payment integration (Checkpoint 5)
- WhatsApp notifications (Checkpoint 5)

## Tech Stack Details
- **Backend**: Hono v4.x (Lightweight edge framework)
- **Deployment**: Cloudflare Pages (Edge computing)
- **Database**: Cloudflare D1 (Global SQLite)
- **Frontend**: Vanilla JS + TailwindCSS + FontAwesome
- **Process Manager**: PM2 (Development)
- **Version Control**: Git + GitHub

## Deployment Status
- **Platform**: Cloudflare Pages
- **Status**: 🟡 Ready for deployment (after Checkpoint 6)
- **Environment**: Local development configured
- **Last Updated**: 2026-01-21

## Next Steps (Checkpoint 2)
⏳ Setup authentication system (WhatsApp OTP)  
⏳ Create user registration endpoints  
⏳ Implement JWT token generation  
⏳ Add role-based access control (RBAC)  

## Project Structure
```
webapp/
├── src/
│   └── index.tsx           # Main Hono application
├── public/
│   └── static/             # Static assets
├── migrations/
│   └── 0001_initial_schema.sql
├── .git/                   # Git repository
├── .gitignore              # Git ignore rules
├── ecosystem.config.cjs    # PM2 configuration
├── wrangler.jsonc          # Cloudflare configuration
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── seed.sql                # Test data
└── README.md               # This file
```

## DNA System Integration
This project uses the DNA Context Compression System for token-optimized development:
- **QUICK_CONTEXT.md**: Session state snapshot (3 tokens)
- **CHECKPOINT_SYSTEM.md**: Modular execution framework
- **DNA_SESSION_BRIDGE.md**: Pre-written command templates

## License
MIT License - Free to use for commercial and personal projects
