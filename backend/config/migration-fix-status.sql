-- Migration to fix vehicle status enum
USE aryals_dealer;

-- Update the status column to support new status values
ALTER TABLE vehicles MODIFY COLUMN status VARCHAR(50) DEFAULT 'Available';

-- Update existing records to use new status values if needed
UPDATE vehicles SET status = 'Available' WHERE status IN ('new', 'demo');
UPDATE vehicles SET status = 'Sold' WHERE status = 'used';

-- Optional: You can also keep both old and new values by using a larger ENUM
-- ALTER TABLE vehicles MODIFY COLUMN status ENUM('Available', 'Sold', 'Reserved', 'new', 'used', 'demo') DEFAULT 'Available';
