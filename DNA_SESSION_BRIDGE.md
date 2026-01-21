# 🌉 DNA SESSION BRIDGE - Session-to-Session Connector
## Token-Optimized Command Templates & Continuity Protocol

**Version**: 1.0.0  
**Purpose**: Enable seamless session handoff dengan minimal token consumption  
**Target**: 100 token/day budget optimization  

---

## 🎯 HOW THIS WORKS

### The Problem:
- Setiap konversasi baru = AI kehilangan konteks
- Harus upload semua docs lagi (high token cost)
- Harus re-explain project dari awal

### The Solution:
- **1-File Upload**: Cukup upload QUICK_CONTEXT.md (5KB = 3 tokens)
- **Command Templates**: Copy-paste command siap execute
- **Checkpoint System**: Resume dari mana saja dengan mudah

---

## 📋 SESSION HANDOFF PROTOCOL

### For AI Code Agent (When Starting New Session):

```
STEP 1: Read Context (3 tokens)
└─ Read /home/user/webapp/QUICK_CONTEXT.md

STEP 2: Identify Checkpoint (0 tokens - just scan)
└─ Find current checkpoint status
└─ Identify next action

STEP 3: Execute Commands (5-15 tokens)
└─ Use pre-written templates below
└─ No exploration, direct execution

STEP 4: Update Status (2 tokens)
└─ Update QUICK_CONTEXT.md checkpoint status
└─ Commit to git
```

**Total Token Cost per Session Handoff**: 10-20 tokens only!

---

## 🔥 COMMAND TEMPLATES BY CHECKPOINT

### CHECKPOINT 0: Documentation Phase ✅ COMPLETE

Status: All DNA docs created and ready  
Next: Proceed to CHECKPOINT 1

---

### CHECKPOINT 1: Foundation Setup 🟡 IN PROGRESS

**Objective**: Initialize project structure, git, dependencies

**Commands** (Copy-paste to Bash tool):

```bash
# === PART 1: Project Initialization ===
cd /home/user
mkdir -p webapp
cd webapp

# Initialize Hono project with Cloudflare Pages template
npm create -y hono@latest . -- --template cloudflare-pages --install --pm npm

# === PART 2: Git Configuration ===
git init
git branch -M main

# Create comprehensive .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnpm-store/

# Environment variables
.env
.env.local
.dev.vars

# Build outputs
dist/
build/
.wrangler/
.vercel/

# Logs
*.log
logs/
pids/
*.pid

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Temporary files
*.tmp
*.temp
EOF

# Initial commit
git add .
git commit -m "CHECKPOINT 1: Foundation setup - Hono + Cloudflare Pages initialized"

# === PART 3: Setup GitHub Remote ===
# Note: PAT will be configured via setup_github_environment
git remote add origin https://github.com/Estes786/BARBERSHOP-ECOSYSTEM-HIERARCHIAL.git
```

**AI Agent Actions**:
1. Call `setup_github_environment` first (2 tokens)
2. Execute bash commands above (10 tokens)
3. Push to GitHub: `cd /home/user/webapp && git push -u origin main` (2 tokens)
4. Update QUICK_CONTEXT.md status (2 tokens)

**Success Criteria**:
- ✅ Directory `/home/user/webapp` exists
- ✅ `package.json` with Hono dependencies
- ✅ Git initialized with main branch
- ✅ .gitignore configured
- ✅ Pushed to GitHub successfully

**Token Budget**: 15-20 tokens total

---

### CHECKPOINT 2: Database Layer ⏳ PENDING

**Objective**: Setup Cloudflare D1 database dengan complete schema

**Commands**:

```bash
cd /home/user/webapp

# === PART 1: Create D1 Database ===
npx wrangler d1 create barbershop-dna-production

# Copy database_id from output and update wrangler.jsonc

# === PART 2: Create Migrations Directory ===
mkdir -p migrations

# === PART 3: Create Initial Migration ===
cat > migrations/0001_initial_schema.sql << 'EOF'
-- Users table (customers + barbers)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT CHECK(role IN ('customer', 'barber', 'admin')) NOT NULL DEFAULT 'customer',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Barber profiles
CREATE TABLE IF NOT EXISTS barber_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  shop_name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  bio TEXT,
  avatar_url TEXT,
  rating REAL DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT 0,
  subscription_tier TEXT DEFAULT 'free',
  subscription_expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Services offered by barbers
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  barber_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (barber_id) REFERENCES barber_profiles(id)
);

-- Barber availability schedules
CREATE TABLE IF NOT EXISTS availability (
  id TEXT PRIMARY KEY,
  barber_id TEXT NOT NULL,
  day_of_week INTEGER CHECK(day_of_week >= 0 AND day_of_week <= 6),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  is_available BOOLEAN DEFAULT 1,
  FOREIGN KEY (barber_id) REFERENCES barber_profiles(id)
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  barber_id TEXT NOT NULL,
  service_id TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  status TEXT CHECK(status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  total_price REAL NOT NULL,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (barber_id) REFERENCES barber_profiles(id),
  FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  booking_id TEXT UNIQUE NOT NULL,
  amount REAL NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT CHECK(payment_status IN ('pending', 'paid', 'failed', 'refunded')) DEFAULT 'pending',
  duitku_reference TEXT,
  duitku_merchant_ref TEXT,
  paid_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  booking_id TEXT UNIQUE NOT NULL,
  customer_id TEXT NOT NULL,
  barber_id TEXT NOT NULL,
  rating INTEGER CHECK(rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (barber_id) REFERENCES barber_profiles(id)
);

-- Loyalty points
CREATE TABLE IF NOT EXISTS loyalty_points (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  points INTEGER DEFAULT 0,
  tier TEXT CHECK(tier IN ('bronze', 'silver', 'gold')) DEFAULT 'bronze',
  total_spent REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(id)
);

-- Point transactions
CREATE TABLE IF NOT EXISTS point_transactions (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  booking_id TEXT,
  points_change INTEGER NOT NULL,
  transaction_type TEXT CHECK(transaction_type IN ('earned', 'redeemed')),
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- Subscription plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  billing_cycle TEXT CHECK(billing_cycle IN ('monthly', 'yearly')),
  features TEXT, -- JSON string
  max_bookings INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_barber_profiles_user_id ON barber_profiles(user_id);
CREATE INDEX idx_services_barber_id ON services(barber_id);
CREATE INDEX idx_availability_barber_id ON availability(barber_id);
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_barber_id ON bookings(barber_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_reviews_barber_id ON reviews(barber_id);
CREATE INDEX idx_loyalty_customer_id ON loyalty_points(customer_id);
EOF

# === PART 4: Apply Migration Locally ===
npx wrangler d1 migrations apply barbershop-dna-production --local

# === PART 5: Commit ===
git add migrations/ wrangler.jsonc
git commit -m "CHECKPOINT 2: Database schema with 10 tables"
git push origin main
```

**AI Agent Actions**:
1. Call `setup_cloudflare_api_key` first (2 tokens)
2. Execute database creation (10 tokens)
3. Create migration files (5 tokens)
4. Update wrangler.jsonc (3 tokens)
5. Commit and push (2 tokens)

**Success Criteria**:
- ✅ D1 database created
- ✅ Migration file with 10 tables
- ✅ Local database migrated successfully
- ✅ wrangler.jsonc configured

**Token Budget**: 22-25 tokens

---

### CHECKPOINT 3: Authentication System ⏳ PENDING

**Objective**: JWT auth, register, login endpoints

**Commands**: (To be executed after CHECKPOINT 2)

```bash
cd /home/user/webapp/src

# === PART 1: Install JWT Library ===
cd /home/user/webapp && npm install hono/jwt

# === PART 2: Create Auth Utilities ===
mkdir -p lib
cat > lib/jwt.ts << 'EOF'
// JWT utility functions will be created here
EOF

# === PART 3: Create Auth Routes ===
cat > routes/auth.ts << 'EOF'
// Authentication routes will be created here
EOF
```

**Token Budget**: 15-20 tokens

---

### CHECKPOINT 4: Barber Management ⏳ PENDING
### CHECKPOINT 5: Booking System ⏳ PENDING
### CHECKPOINT 6: Payment Integration ⏳ PENDING
### CHECKPOINT 7: Frontend UI ⏳ PENDING
### CHECKPOINT 8: Deployment ⏳ PENDING

---

## 🔄 SESSION RESUME COMMANDS

### For Vibe Code Orchestration (You):

When starting new session with fresh AI agent:

```
Option 1 (Minimal - 3 tokens):
"Read /home/user/webapp/QUICK_CONTEXT.md and continue from current checkpoint"

Option 2 (With checkpoint specification - 3 tokens):
"Continue BARBERSHOP DNA project from CHECKPOINT 2"

Option 3 (Full context - 5 tokens):
"I'm continuing BARBERSHOP DNA marketplace. Current status: CHECKPOINT 1 complete, 
project initialized at /home/user/webapp. Next: Execute CHECKPOINT 2 database setup. 
Read /home/user/webapp/QUICK_CONTEXT.md for details."
```

---

## 🎯 TOKEN OPTIMIZATION STRATEGIES

### DO (Low Token Cost):
- ✅ Use `setup_github_environment` - 2 tokens
- ✅ Use `setup_cloudflare_api_key` - 2 tokens
- ✅ Execute bash with pre-written commands - 5-10 tokens
- ✅ Use `Edit` for single file changes - 3-5 tokens
- ✅ Use `MultiEdit` for batch changes - 8-12 tokens
- ✅ Read small files (<200 lines) - 5-8 tokens

### DON'T (High Token Cost):
- ❌ Read large files (>500 lines) - 15-20 tokens
- ❌ Explore directories unnecessarily - 5-10 tokens
- ❌ Multiple separate reads - use MultiEdit instead
- ❌ Video analysis - 30-40 tokens (use text docs)

### Session Management:
- 🎯 Start each session by reading QUICK_CONTEXT.md only
- 🎯 Follow checkpoint commands exactly (already optimized)
- 🎯 Update QUICK_CONTEXT.md after each checkpoint
- 🎯 Commit frequently to preserve state

---

## 📊 ESTIMATED TOKEN BUDGET BY CHECKPOINT

```
CHECKPOINT 0: Documentation ✅ COMPLETE
CHECKPOINT 1: Foundation     → 15-20 tokens
CHECKPOINT 2: Database        → 22-25 tokens
CHECKPOINT 3: Auth            → 15-20 tokens
CHECKPOINT 4: Barbers         → 12-15 tokens
CHECKPOINT 5: Bookings        → 12-15 tokens
CHECKPOINT 6: Payments        → 15-18 tokens
CHECKPOINT 7: Frontend        → 15-20 tokens
CHECKPOINT 8: Deployment      → 10-15 tokens
─────────────────────────────────────────
TOTAL PROJECT COMPLETION: 116-148 tokens

With 100 token/day limit:
└─ Complete MVP in 2 days maximum!
```

---

## 🔥 EMERGENCY RECOVERY

If session gets stuck or confused:

```bash
# Check current state
cd /home/user/webapp && git status
cat /home/user/webapp/QUICK_CONTEXT.md | grep "CHECKPOINT"

# Reset to last known good state if needed
git log --oneline | head -5
git reset --hard <commit-hash>

# Resume from that checkpoint
# Then upload QUICK_CONTEXT.md to new session
```

---

**Last Updated**: 2026-01-20  
**Maintenance**: Update after each checkpoint completion  
**Owner**: Vibe Code Orchestration Master
