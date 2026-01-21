# StudyTracker - Backend Setup Guide

## Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/study_tracker"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Email (for NextAuth Magic Links)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@studytracker.com"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Push Database Schema
```bash
npx prisma db push
```

### 5. Start Development Server
```bash
npm run dev
```

## API Endpoints

### Study Sessions
- `POST /api/study-sessions` - Create a new study session
- `GET /api/study-sessions` - Get all sessions for user
- `PATCH /api/study-sessions/[id]` - Update a session
- `DELETE /api/study-sessions/[id]` - Delete a session

### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks for user
- `PATCH /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

### Focus Checks
- `POST /api/focus-checks` - Log a focus check
- `GET /api/focus-checks?sessionId=xxx` - Get focus checks for a session

### Analytics
- `GET /api/stats/today` - Get today's statistics
- `GET /api/analytics?range=week` - Get analytics data (week/month/year)

### Authentication
- `GET /api/auth/signin` - Sign in page
- `POST /api/auth/signout` - Sign out

## Database Schema

### User
- Authentication and profile info
- Relations: study sessions, tasks, focus checks

### StudySession
- Tracks study time with subject/topic
- Pomodoro settings
- Focus checks attached

### Task
- Task management with priority
- Due dates and completion tracking

### FocusCheck
- Tracks focus during study sessions
- Used to calculate focus score

## Deployment

### Database Setup
1. Create a PostgreSQL database
2. Update DATABASE_URL in .env
3. Run migrations: `npx prisma db push`

### Vercel Deployment
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Open Prisma Studio (Database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset
```

## Features Implemented

✅ User authentication with NextAuth
✅ Study session tracking with timer
✅ Focus checks and scoring
✅ Task management
✅ Analytics and statistics
✅ Dashboard with real-time data
✅ PostgreSQL database with Prisma ORM

## Next Steps

1. Implement password hashing (bcrypt)
2. Add email verification
3. Set up OAuth providers (Google, GitHub)
4. Add data export feature
5. Implement study goals
6. Add notifications/reminders
