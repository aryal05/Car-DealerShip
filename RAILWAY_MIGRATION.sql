-- Railway Migration: Add year column and update existing vehicles
-- Run this in Railway MySQL console or via Railway CLI

-- Step 1: Add year column if it doesn't exist
ALTER TABLE vehicles 
ADD COLUMN IF NOT EXISTS year INT AFTER model;

-- Step 2: Update existing vehicles with years based on status
UPDATE vehicles 
SET year = CASE
  WHEN status = 'new' THEN 2024
  WHEN status = 'Available' THEN 2023
  WHEN status = 'Used' THEN 2022
  WHEN status = 'Sold Out' THEN 2021
  ELSE 2023
END
WHERE year IS NULL;

-- Step 3: Verify the migration
SELECT year, COUNT(*) as count 
FROM vehicles 
WHERE year IS NOT NULL 
GROUP BY year 
ORDER BY year DESC;
