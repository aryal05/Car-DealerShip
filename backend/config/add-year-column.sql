-- Add year column to vehicles table
ALTER TABLE vehicles 
ADD COLUMN year INT AFTER model;

-- Update existing vehicles with default years based on status
-- New vehicles: 2024
-- Available vehicles: 2023
-- Used vehicles: 2022
-- Sold vehicles: 2021

UPDATE vehicles SET year = CASE
  WHEN status = 'new' THEN 2024
  WHEN status = 'Available' THEN 2023
  WHEN status = 'Used' THEN 2022
  WHEN status = 'Sold Out' THEN 2021
  ELSE 2023
END
WHERE year IS NULL;
