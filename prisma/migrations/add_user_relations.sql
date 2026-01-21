-- Migration script to add userId to existing tables

-- Add userId column with default temp value
ALTER TABLE "StudySession" ADD COLUMN IF NOT EXISTS "userId" TEXT;
ALTER TABLE "Task" ADD COLUMN IF NOT EXISTS "userId" TEXT;
ALTER TABLE "StudySession" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3);

-- Update existing rows with temp userId
UPDATE "StudySession" SET "userId" = 'temp-user' WHERE "userId" IS NULL;
UPDATE "Task" SET "userId" = 'temp-user' WHERE "userId" IS NULL;
UPDATE "StudySession" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "updatedAt" IS NULL;

-- Make userId NOT NULL
ALTER TABLE "StudySession" ALTER COLUMN "userId" SET NOT NULL;
ALTER TABLE "Task" ALTER COLUMN "userId" SET NOT NULL;
ALTER TABLE "StudySession" ALTER COLUMN "updatedAt" SET NOT NULL;

-- Add foreign key constraints
ALTER TABLE "StudySession" ADD CONSTRAINT "StudySession_userId_fkey" 
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" 
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add indexes
CREATE INDEX IF NOT EXISTS "StudySession_userId_idx" ON "StudySession"("userId");
CREATE INDEX IF NOT EXISTS "StudySession_startTime_idx" ON "StudySession"("startTime");
CREATE INDEX IF NOT EXISTS "Task_userId_idx" ON "Task"("userId");
CREATE INDEX IF NOT EXISTS "Task_completed_idx" ON "Task"("completed");
CREATE INDEX IF NOT EXISTS "FocusCheck_sessionId_idx" ON "FocusCheck"("sessionId");
