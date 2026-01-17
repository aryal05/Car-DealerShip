-- Add more diverse brand vehicles to the database
USE aryals_dealer;

INSERT INTO vehicles (model, variant, price, original_price, after_tax_credit, mileage, range_epa, top_speed, acceleration, exterior_color, interior_color, wheels, autopilot, seat_layout, additional_features, image_url, status, location) VALUES

-- More Tesla vehicles
('Model S', 'Plaid', 129990, 0, 122490, 0, 396, 200, '1.99s', 'Pearl White Multi-Coat', 'Black and White Premium', '21" Arachnid Wheels', true, 'Five Seat Interior', 'Tri Motor AWD, 1,020 hp, Carbon Fiber Spoiler, Track Mode', 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800', 'new', 'Palo Alto, CA'),

('Model 3', 'Performance', 55990, 0, 48490, 0, 315, 162, '3.1s', 'Solid Black', 'Black Premium', '20" Überturbine Wheels', true, 'Five Seat Interior', 'Track Mode, Carbon Fiber Spoiler, Performance Brakes', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800', 'new', 'Fremont, CA'),

('Model X', 'Plaid', 119990, 0, 112490, 0, 333, 163, '2.5s', 'Deep Blue Metallic', 'Cream Interior', '22" Turbine Wheels', true, 'Seven Seat Interior', 'Falcon Wing Doors, Tri Motor, Yoke Steering, 22-Speaker Audio', 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800', 'new', 'Austin, TX'),

-- More Mercedes vehicles
('Mercedes-Benz C-Class', 'C 300 4MATIC', 48500, 0, 48500, 0, 360, 130, '5.9s', 'Mojave Silver Metallic', 'Black Artico/Microfiber', '18" 5-Spoke Wheels', false, 'Five Seat Interior', 'MBUX, Navigation, Blind Spot Assist, LED Headlamps', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', 'new', 'Atlanta, GA'),

('Mercedes-AMG C63', 'S Coupe', 89500, 0, 89500, 0, 320, 180, '3.8s', 'Graphite Grey Metallic', 'Red Pepper/Black Nappa', '19/20" AMG Cross-Spoke', false, 'Four Seat Interior', 'AMG Performance Exhaust, Track Package, Night Package', 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800', 'new', 'Miami, FL'),

('Mercedes-Benz E-Class', 'E 450 4MATIC Wagon', 72500, 0, 72500, 1800, 370, 130, '5.2s', 'Polar White', 'Saddle Brown Leather', '19" AMG Twin 5-Spoke', false, 'Five Seat Interior', 'Premium Package, Air Suspension, Panoramic Roof', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800', 'used', 'Portland, OR'),

-- More BMW vehicles
('BMW 7 Series', '750i xDrive', 105000, 0, 105000, 0, 380, 130, '4.5s', 'Black Sapphire Metallic', 'Cognac Nappa Leather', '20" V-Spoke Style', false, 'Five Seat Interior', 'Executive Drive Pro, Bowers & Wilkins, Massage Seats, Sky Lounge', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', 'new', 'Los Angeles, CA'),

('BMW X3', 'M40i xDrive', 58900, 0, 58900, 2200, 360, 130, '4.6s', 'Phytonic Blue', 'Black Vernasca Leather', '21" M Double-Spoke', false, 'Five Seat Interior', 'M Sport Package, Harmon Kardon, Panoramic Roof', 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800', 'used', 'Denver, CO'),

('BMW i4', 'eDrive40', 59900, 67000, 52400, 0, 301, 118, '5.5s', 'Portimao Blue', 'Black Sensatec', '19" Aero Wheels', false, 'Five Seat Interior', '83.9 kWh Battery, iDrive 8, Harman Kardon', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', 'new', 'San Francisco, CA'),

-- More Audi vehicles
('Audi A6', '55 TFSI Premium Plus', 62900, 0, 62900, 0, 380, 130, '5.1s', 'Mythos Black Metallic', 'Black Leather', '19" 5-V-Spoke', false, 'Five Seat Interior', 'Virtual Cockpit Plus, Matrix LED, Bang & Olufsen', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'new', 'Chicago, IL'),

('Audi A8', 'L 60 TFSI Quattro', 89500, 0, 89500, 1500, 390, 130, '5.6s', 'Firmament Blue', 'Cognac/Black Valcona', '20" 5-Arm Rotor', false, 'Five Seat Interior', 'Executive Package, Relaxation Seats, 23-Speaker B&O 3D', 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800', 'used', 'New York, NY'),

('Audi Q8', '55 TFSI S Line', 75900, 0, 75900, 0, 370, 130, '5.6s', 'Dragon Orange', 'Black/Orange Valcona', '22" 5-Arm Offroad', false, 'Five Seat Interior', 'S Line Black Optic, Adaptive Air Suspension, HD Matrix LED', 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=800', 'new', 'Dallas, TX'),

-- More Lexus vehicles
('Lexus LS', '500 F Sport AWD', 82900, 0, 82900, 0, 400, 130, '5.4s', 'Sonic Titanium', 'Black F Sport Leather', '20" F Sport Wheels', false, 'Five Seat Interior', 'Mark Levinson 23-Speaker, Kiriko Glass, Executive Package', 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800', 'new', 'Seattle, WA'),

('Lexus NX', '450h+ Luxury', 59900, 0, 52400, 0, 280, 112, '6.3s', 'Cloudburst Gray', 'Rioja Red Semi-Aniline', '20" 10-Spoke Alloy', false, 'Five Seat Interior', 'Plug-in Hybrid, Panoramic Moonroof, Mark Levinson Audio', 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800', 'new', 'Phoenix, AZ'),

-- More Porsche vehicles
('Porsche Macan', 'GTS', 79900, 0, 79900, 0, 350, 162, '4.3s', 'Mahogany Metallic', 'Black Leather', '21" RS Spyder Design', false, 'Five Seat Interior', 'Sport Chrono, PASM, Sport Exhaust, GTS Interior Package', 'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?w=800', 'new', 'Las Vegas, NV'),

('Porsche 718', 'Boxster GTS 4.0', 92500, 0, 92500, 0, 300, 182, '3.8s', 'Python Green', 'Black/Bordeaux Red', '20" Carrera S Wheels', false, 'Two Seat Interior', 'Sport Chrono, PASM, Sports Exhaust, 718 GTS Interior Package', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', 'new', 'San Diego, CA'),

-- More Jaguar vehicles
('Jaguar XF', 'P300 R-Dynamic SE', 52500, 0, 52500, 0, 380, 121, '5.8s', 'Eiger Grey', 'Ebony Grained Leather', '19" 5-Split Spoke', false, 'Five Seat Interior', 'InControl Pro, Meridian Sound, Power Tailgate', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800', 'new', 'Charlotte, NC'),

('Jaguar F-PACE', 'SVR', 89500, 0, 89500, 0, 330, 178, '3.8s', 'Velocity Blue', 'Ebony/Light Oyster Windsor', '22" 5-Split Spoke', false, 'Five Seat Interior', 'Supercharged V8, Adaptive Dynamics, Meridian Signature Sound', 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800', 'new', 'Austin, TX'),

-- More Volvo vehicles
('Volvo XC60', 'B6 AWD Inscription', 54900, 0, 54900, 0, 360, 112, '5.9s', 'Crystal White', 'Blonde Leather', '20" 5-Double Spoke', false, 'Five Seat Interior', 'Mild Hybrid, Air Suspension, Bowers & Wilkins, Pilot Assist', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'new', 'Minneapolis, MN'),

('Volvo V90', 'Cross Country B6 AWD', 62900, 0, 62900, 1200, 380, 112, '6.2s', 'Pine Grey', 'Charcoal Nappa Leather', '19" 5-Double Spoke', false, 'Five Seat Interior', 'Bowers & Wilkins, Air Suspension, 360 Camera, Pilot Assist', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', 'used', 'Seattle, WA');
