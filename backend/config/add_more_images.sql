-- Add more diverse images for existing vehicles
USE aryals_dealer;

-- Add more images for first 20 vehicles (multiple angles)
INSERT INTO vehicle_images (vehicle_id, image_url, is_primary, display_order) VALUES
-- Tesla Model S images
(1, 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800', false, 2),
(1, 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800', false, 3),
(1, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800', false, 4),

-- Tesla Model 3 images
(2, 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800', false, 2),
(2, 'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?w=800', false, 3),
(2, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', false, 4),

-- Tesla Model X images  
(3, 'https://images.unsplash.com/photo-1548373911-dc96f0e55245?w=800', false, 2),
(3, 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=800', false, 3),
(3, 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=800', false, 4),

-- More Tesla variants
(4, 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800', false, 2),
(4, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800', false, 3),
(5, 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800', false, 2),
(5, 'https://images.unsplash.com/photo-1548373911-dc96f0e55245?w=800', false, 3),

-- Mercedes vehicles
(6, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', false, 2),
(6, 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', false, 3),
(7, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', false, 2),
(7, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', false, 3),

-- BMW vehicles
(8, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', false, 2),
(8, 'https://images.unsplash.com/photo-1617531653520-bd466ee00f0d?w=800', false, 3),
(9, 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800', false, 2),
(9, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', false, 3),

-- Audi vehicles
(10, 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800', false, 2),
(10, 'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800', false, 3);
