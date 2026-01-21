# StudyTracker - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Add sample data
# Open PostgreSQL and run: prisma/seed.sql
```

### Step 3: Run the App
```bash
npm run dev
```

Visit: http://localhost:3000

## 📊 View Database
```bash
npx prisma studio
```
Opens at: http://localhost:5555

## 🔧 Environment Setup
Copy `.env.example` to `.env` and update:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/study_tracker"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-random-string-here"
```

## ✅ What's Working

### Frontend Pages (Ready)
- ✅ Homepage - Landing page
- ✅ Dashboard - Study timer + stats
- ✅ Tasks - Task management
- ✅ Analytics - Charts and insights
- ✅ Login/Register - Auth pages

### Backend APIs (Ready)
- ✅ `/api/study-sessions` - CRUD for study sessions
- ✅ `/api/tasks` - CRUD for tasks
- ✅ `/api/focus-checks` - Focus tracking
- ✅ `/api/stats/today` - Today's statistics
- ✅ `/api/analytics` - Full analytics data

### Database (Ready)
- ✅ User authentication
- ✅ Study sessions with focus tracking
- ✅ Task management
- ✅ Analytics data

## 🎯 Next Steps

1. **Connect Frontend to Backend**
   - Update Dashboard to fetch real data
   - Connect timer to API
   - Hook up task CRUD operations

2. **Add Authentication**
   - Implement login/register logic
   - Protect routes
   - Add user sessions

3. **Test Features**
   - Create study sessions
   - Add tasks
   - Check analytics

## 📝 Quick Test

Run this in browser console (with server running):

```javascript
// Test: Fetch today's stats
fetch('/api/stats/today?userId=temp-user')
  .then(r => r.json())
  .then(console.log);

// Test: Create a task
fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'temp-user',
    title: 'Test Task',
    priority: 'HIGH'
  })
}).then(r => r.json()).then(console.log);
```

## 🐛 Troubleshooting

**Database connection error?**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env

**Prisma errors?**
```bash
npx prisma generate
npx prisma db push
```

**Need to reset?**
```bash
npx prisma db push --force-reset
```

## 📚 Documentation

- Full setup: `SETUP.md`
- Backend details: `BACKEND_READY.md`
- API examples: See `BACKEND_READY.md`

---

**You're all set!** Start building your frontend integrations! 🎉
