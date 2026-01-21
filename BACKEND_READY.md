# Backend Integration Complete! 🎉

## What's Been Set Up

### ✅ Database Schema (Prisma)
- **User** - Authentication with NextAuth
- **StudySession** - Track study time, subject, topic, duration
- **Task** - Task management with priorities and due dates
- **FocusCheck** - Track focus during study sessions
- **Account/Session** - NextAuth authentication tables

### ✅ API Routes Created

#### Study Sessions (`/api/study-sessions`)
- `POST /api/study-sessions` - Create new study session
- `GET /api/study-sessions?userId=xxx&limit=50` - Get all sessions
- `PATCH /api/study-sessions/[id]` - Update session
- `DELETE /api/study-sessions/[id]` - Delete session

#### Tasks (`/api/tasks`)
- `POST /api/tasks` - Create new task
- `GET /api/tasks?userId=xxx&completed=true` - Get all tasks (filter by completion)
- `PATCH /api/tasks/[id]` - Update task (auto-sets completedAt)
- `DELETE /api/tasks/[id]` - Delete task

#### Focus Checks (`/api/focus-checks`)
- `POST /api/focus-checks` - Log focus check response
- `GET /api/focus-checks?sessionId=xxx` - Get focus checks for session

#### Statistics (`/api/stats/today`)
- `GET /api/stats/today?userId=xxx` - Get today's stats:
  - Total study time
  - Sessions count
  - Average focus score
  - Completed tasks
  - Current streak

#### Analytics (`/api/analytics`)
- `GET /api/analytics?userId=xxx&range=week` - Get comprehensive analytics:
  - Total time by subject
  - Daily study patterns
  - Focus score trends
  - Best study times
  - Subject performance

### ✅ Authentication Setup
- NextAuth v5 configured
- Email magic links
- Google OAuth ready (need credentials)
- Session management
- Protected routes ready

### ✅ Helper Functions
Created in `/lib/helpers.ts`:
- `formatDuration()` - Convert seconds to "2h 30m"
- `formatTime()` - Convert to "HH:MM:SS"
- `calculateFocusScore()` - Calculate focus percentage
- `getTimeOfDay()` - Determine time category
- `getDateRange()` - Get date ranges for analytics

## How to Use

### 1. Setup Environment
Copy `.env.example` to `.env` and fill in:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/study_tracker"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
```

### 2. Run Migration (if you have existing data)
The migration script is in `prisma/migrations/add_user_relations.sql`

Or start fresh:
```bash
npx prisma db push --force-reset
```

### 3. Start Development
```bash
npm run dev
```

## Frontend Integration Guide

### Example: Fetch Today's Stats
```typescript
const response = await fetch('/api/stats/today?userId=temp-user');
const data = await response.json();
// { totalTime, sessionsCount, avgFocusScore, completedTasks, streak }
```

### Example: Create Study Session
```typescript
await fetch('/api/study-sessions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'temp-user',
    subject: 'Mathematics',
    topic: 'Calculus',
    startTime: new Date().toISOString(),
    studyMinutes: 25,
    breakMinutes: 5,
  }),
});
```

### Example: Create Task
```typescript
await fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'temp-user',
    title: 'Finish homework',
    priority: 'HIGH',
    dueDate: '2026-01-25',
  }),
});
```

### Example: Complete Task
```typescript
await fetch(`/api/tasks/${taskId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completed: true }),
});
```

## What You Need to Do

### 1. Update Frontend Pages
Connect your React components to the API:
- Dashboard: Fetch from `/api/stats/today`
- Analytics: Fetch from `/api/analytics`
- Tasks: CRUD operations with `/api/tasks`

### 2. Implement Timer Logic
- Create timer component that calls `/api/study-sessions` on start/stop
- Add focus check prompts that POST to `/api/focus-checks`

### 3. Add Authentication
- Wrap app with SessionProvider
- Use `useSession()` hook to get userId
- Protect routes with middleware

### 4. Test Everything
```bash
# Open Prisma Studio to view data
npx prisma studio
```

## Database Tools

### View Data
```bash
npx prisma studio
# Opens GUI at http://localhost:5555
```

### Reset Database
```bash
npx prisma db push --force-reset
# WARNING: Deletes all data!
```

### Generate New Migration
```bash
npx prisma migrate dev --name description
```

## API Testing with Examples

### Create a test user first:
```sql
INSERT INTO "User" (id, email, name) 
VALUES ('temp-user', 'test@example.com', 'Test User');
```

Then test your APIs in browser or with curl!

---

**All backend is ready!** Just connect the frontend to these API routes and you're good to go! 🚀
