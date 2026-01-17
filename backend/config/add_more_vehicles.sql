-- Add more sample vehicles to the database
USE aryals_dealer;

INSERT INTO vehicles (model, variant, price, original_price, after_tax_credit, mileage, range_epa, top_speed, acceleration, exterior_color, interior_color, wheels, autopilot, seat_layout, additional_features, image_url, status, location) VALUES

-- BMW vehicles
('BMW X5', 'M50i xDrive', 82000, 89000, 82000, 0, 350, 155, '4.3s', 'Alpine White', 'Black Vernasca Leather', '21" M Sport Wheels', false, 'Five Seat Interior', 'Panoramic Moonroof, Harman Kardon Sound, Adaptive M Suspension', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', 'new', 'Los Angeles, CA'),

('BMW 3 Series', '330i Sport Line', 45500, 48000, 45500, 1200, 380, 130, '5.6s', 'Portimao Blue', 'Cognac Dakota Leather', '19" Sport Wheels', false, 'Five Seat Interior', 'Live Cockpit Professional, Wireless Charging, Parking Assistant', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', 'used', 'New York, NY'),

('BMW M4', 'Competition Coupe', 78900, 0, 78900, 0, 320, 180, '3.8s', 'Isle of Man Green', 'Black Merino Leather', '19/20" M Wheels', false, 'Four Seat Interior', 'M Carbon Bucket Seats, Carbon Fiber Roof, M Track Package', 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800', 'new', 'Miami, FL'),

-- Mercedes-Benz vehicles
('Mercedes-Benz S-Class', 'S 500 4MATIC', 115000, 122000, 115000, 0, 340, 155, '4.8s', 'Obsidian Black Metallic', 'Nappa Leather Beige', '20" AMG Multi-Spoke', false, 'Five Seat Interior', 'MBUX Augmented Reality, Executive Rear Seat, Burmester 4D Sound', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', 'new', 'Beverly Hills, CA'),

('Mercedes-Benz GLE', 'GLE 450 4MATIC', 69500, 74000, 69500, 2500, 350, 130, '5.7s', 'Selenite Grey', 'Black MB-Tex', '20" AMG Twin 5-Spoke', false, 'Five Seat Interior', 'AMG Line, Airmatic Suspension, Panoramic Sunroof, 360 Camera', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800', 'used', 'Houston, TX'),

('Mercedes-AMG GT', '63 S 4-Door Coupe', 159000, 0, 159000, 0, 310, 196, '3.1s', 'AMG Green Hell Magno', 'Black Nappa Leather', '21" AMG Cross-Spoke', false, 'Five Seat Interior', 'AMG Performance Exhaust, Carbon Ceramic Brakes, AMG Track Pace', 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800', 'new', 'Las Vegas, NV'),

-- Audi vehicles
('Audi e-tron GT', 'Quattro Premium Plus', 105000, 112000, 97500, 0, 238, 152, '3.9s', 'Tactical Green', 'Black Leather', '21" 5-V-Spoke Dynamic', false, 'Five Seat Interior', '93.4 kWh Battery, 800V Architecture, Matrix LED Headlights', 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800', 'new', 'San Francisco, CA'),

('Audi Q7', '55 TFSI Prestige', 64900, 68000, 64900, 3400, 380, 130, '5.7s', 'Navarra Blue', 'Okapi Brown Valcona', '21" 5-Arm Design', false, 'Seven Seat Interior', 'Virtual Cockpit Plus, Quattro AWD, Bang & Olufsen 3D Sound', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'used', 'Chicago, IL'),

('Audi RS6 Avant', 'Performance', 119000, 0, 119000, 0, 320, 190, '3.5s', 'Daytona Grey', 'Black Valcona Leather', '22" RS Design', false, 'Five Seat Interior', 'Sport Exhaust, Carbon Optic Package, RS Sport Suspension Plus', 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=800', 'new', 'Denver, CO'),

-- Porsche vehicles
('Porsche 911', 'Carrera S', 122000, 0, 122000, 0, 310, 191, '3.5s', 'Shark Blue', 'Black/Bordeaux Red Leather', '20/21" Carrera S Wheels', false, 'Four Seat Interior', 'Sport Chrono Package, PASM, Porsche Communication Management 6.0', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', 'new', 'Scottsdale, AZ'),

('Porsche Taycan', '4S Cross Turismo', 109000, 115000, 101500, 0, 215, 155, '3.9s', 'Frozen Blue Metallic', 'Slate Grey Leather', '21" Taycan Turbo Aero', false, 'Five Seat Interior', '93.4 kWh Performance Battery Plus, Adaptive Air Suspension', 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800', 'new', 'Portland, OR'),

('Porsche Cayenne', 'GTS Coupe', 138000, 0, 138000, 1800, 340, 168, '4.5s', 'Carrara White Metallic', 'Black/Bordeaux Red', '22" RS Spyder Design', false, 'Five Seat Interior', 'Sport Exhaust, PDCC, Porsche Dynamic Chassis Control, Carbon Interior', 'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?w=800', 'demo', 'Austin, TX'),

-- Lexus vehicles
('Lexus ES', '350 F Sport', 48500, 52000, 48500, 2100, 410, 130, '6.6s', 'Ultrasonic Blue Mica', 'Black F Sport Leather', '19" F Sport Wheels', false, 'Five Seat Interior', 'Mark Levinson Audio, Triple-Beam LED, Lexus Safety System+ 2.5', 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800', 'used', 'Dallas, TX'),

('Lexus RX', '450h+ Luxury', 58900, 0, 51400, 0, 280, 112, '7.4s', 'Atomic Silver', 'Parchment Semi-Aniline', '20" 10-Spoke Alloy', false, 'Five Seat Interior', 'Plug-in Hybrid, Panoramic Moonroof, Heads-Up Display, Mark Levinson', 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800', 'new', 'Seattle, WA'),

-- Jaguar vehicles
('Jaguar F-Type', 'R-Dynamic P450', 79500, 0, 79500, 0, 320, 177, '4.4s', 'Santorini Black', 'Ebony Windsor Leather', '20" 5-Split Spoke', false, 'Two Seat Interior', 'Active Sport Exhaust, Adaptive Dynamics, 12.3" Interactive Driver Display', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800', 'new', 'Miami Beach, FL'),

('Jaguar I-PACE', 'HSE', 72500, 79000, 65000, 1500, 234, 124, '4.5s', 'Yulong White', 'Ebony/Light Oyster', '20" 5-Split Spoke', false, 'Five Seat Interior', '90 kWh Battery, Adaptive Dynamics, Meridian Sound, 360 Camera', 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800', 'used', 'San Diego, CA'),

-- Range Rover vehicles
('Range Rover', 'Autobiography P530', 145000, 0, 145000, 0, 380, 140, '5.1s', 'Byron Blue', 'Navy/Tan Semi-Aniline', '23" 7-Split Spoke', false, 'Five Seat Interior', 'Executive Class Rear Seats, Meridian Signature, Electronic Air Suspension', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'new', 'Greenwich, CT'),

('Range Rover Sport', 'HSE Dynamic P400', 89900, 0, 89900, 0, 370, 130, '5.9s', 'Santorini Black', 'Ebony/Ebony Leather', '22" 5-Split Spoke', false, 'Five Seat Interior', 'Black Exterior Pack, Adaptive Dynamics, Sliding Panoramic Roof', 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800', 'new', 'Boston, MA'),

-- Volvo vehicles
('Volvo XC90', 'Recharge T8 Inscription', 71900, 0, 64400, 0, 305, 112, '5.4s', 'Denim Blue Metallic', 'Blonde Nappa Leather', '21" 5-Double Spoke', false, 'Seven Seat Interior', 'Plug-in Hybrid, Air Suspension, Bowers & Wilkins, Pilot Assist', 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800', 'new', 'Minneapolis, MN'),

('Volvo S60', 'T8 Polestar Engineered', 69500, 0, 69500, 0, 340, 155, '4.3s', 'Thunder Grey', 'Charcoal Nappa/Nubuck', '19" Polestar Wheels', false, 'Five Seat Interior', 'Öhlins Suspension, Akebono Brakes, Gold Seatbelts, Carbon Fiber', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', 'new', 'Phoenix, AZ');
