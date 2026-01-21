-- Create a test user for development
INSERT INTO "User" (id, email, name, "createdAt", "updatedAt") 
VALUES 
  ('temp-user', 'test@studytracker.com', 'Test User', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Sample study sessions
INSERT INTO "StudySession" (id, "userId", subject, topic, "startTime", "endTime", duration, "studyMinutes", "breakMinutes", completed, "createdAt", "updatedAt")
VALUES
  ('sess1', 'temp-user', 'Mathematics', 'Calculus', NOW() - INTERVAL '3 hours', NOW() - INTERVAL '2.5 hours', 1800, 25, 5, true, NOW(), NOW()),
  ('sess2', 'temp-user', 'Physics', 'Quantum Mechanics', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1.5 hours', 1800, 25, 5, true, NOW(), NOW()),
  ('sess3', 'temp-user', 'Chemistry', NULL, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '0.5 hours', 1500, 25, 5, true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Sample focus checks
INSERT INTO "FocusCheck" ("id", "sessionId", "timestamp", "wasFocused", "createdAt")
VALUES
  ('fc1', 'sess1', NOW() - INTERVAL '2.75 hours', true, NOW()),
  ('fc2', 'sess1', NOW() - INTERVAL '2.5 hours', true, NOW()),
  ('fc3', 'sess2', NOW() - INTERVAL '1.75 hours', true, NOW()),
  ('fc4', 'sess2', NOW() - INTERVAL '1.5 hours', false, NOW()),
  ('fc5', 'sess3', NOW() - INTERVAL '0.75 hours', true, NOW())
ON CONFLICT (id) DO NOTHING;

-- Sample tasks
INSERT INTO "Task" (id, "userId", title, description, priority, "dueDate", completed, "createdAt", "updatedAt")
VALUES
  ('task1', 'temp-user', 'Finish calculus homework', 'Complete problems 1-15 from chapter 5', 'HIGH', NOW() + INTERVAL '1 day', false, NOW(), NOW()),
  ('task2', 'temp-user', 'Read Physics Chapter 7', 'Quantum mechanics introduction', 'MEDIUM', NOW() + INTERVAL '4 days', false, NOW(), NOW()),
  ('task3', 'temp-user', 'Review Chemistry Notes', NULL, 'LOW', NULL, false, NOW(), NOW()),
  ('task4', 'temp-user', 'Study for Math Test', 'Review all chapters', 'HIGH', NOW() + INTERVAL '2 days', false, NOW(), NOW()),
  ('task5', 'temp-user', 'Complete lab report', 'Physics lab 3', 'MEDIUM', NOW() + INTERVAL '3 days', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

SELECT 'Sample data inserted successfully!' as message;
