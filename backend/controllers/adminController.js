import pool from '../config/database.js';

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const [users] = await pool.query(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Simple password check (in production, use bcrypt)
    if (password === 'admin123') {
      res.json({ 
        success: true, 
        message: 'Login successful',
        user: { id: users[0].id, username: users[0].username, email: users[0].email }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all banner images
export const getBannerImages = async (req, res) => {
  try {
    const { route } = req.query;
    let query = 'SELECT * FROM banner_images WHERE is_active = true';
    const params = [];
    
    if (route) {
      query += ' AND route = ?';
      params.push(route);
    }
    
    query += ' ORDER BY display_order ASC';
    
    const [images] = await pool.query(query, params);
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add banner image
export const addBannerImage = async (req, res) => {
  try {
    const { route, image_url, display_order } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO banner_images (route, image_url, display_order) VALUES (?, ?, ?)',
      [route, image_url, display_order || 0]
    );
    
    res.json({ 
      success: true, 
      message: 'Banner image added',
      data: { id: result.insertId }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update banner image order
export const updateBannerOrder = async (req, res) => {
  try {
    const { images } = req.body; // Array of {id, display_order}
    
    for (const img of images) {
      await pool.query(
        'UPDATE banner_images SET display_order = ? WHERE id = ?',
        [img.display_order, img.id]
      );
    }
    
    res.json({ success: true, message: 'Banner order updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update banner image
export const updateBannerImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url, display_order } = req.body;
    
    await pool.query(
      'UPDATE banner_images SET image_url = ?, display_order = ? WHERE id = ?',
      [image_url, display_order, id]
    );
    
    res.json({ success: true, message: 'Banner image updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete banner image
export const deleteBannerImage = async (req, res) => {
  try {
    await pool.query('DELETE FROM banner_images WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Banner image deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get vehicle images
export const getVehicleImages = async (req, res) => {
  try {
    const [images] = await pool.query(
      'SELECT * FROM vehicle_images WHERE vehicle_id = ? ORDER BY is_primary DESC, display_order ASC',
      [req.params.vehicleId]
    );
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add vehicle images (multiple)
export const addVehicleImages = async (req, res) => {
  try {
    const { vehicle_id, images } = req.body; // images is array of {url, is_primary, display_order}
    
    const values = images.map(img => [
      vehicle_id,
      img.url,
      img.is_primary || false,
      img.display_order || 0
    ]);
    
    await pool.query(
      'INSERT INTO vehicle_images (vehicle_id, image_url, is_primary, display_order) VALUES ?',
      [values]
    );
    
    res.json({ success: true, message: 'Images added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete vehicle image
export const deleteVehicleImage = async (req, res) => {
  try {
    await pool.query('DELETE FROM vehicle_images WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bulk create vehicles
export const bulkCreateVehicles = async (req, res) => {
  try {
    const { vehicles } = req.body; // Array of vehicle objects
    
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      for (const vehicle of vehicles) {
        const [result] = await connection.query(
          `INSERT INTO vehicles (model, variant, price, original_price, after_tax_credit, 
           mileage, range_epa, top_speed, acceleration, exterior_color, interior_color, 
           wheels, autopilot, seat_layout, additional_features, status, location) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            vehicle.model, vehicle.variant, vehicle.price, vehicle.original_price,
            vehicle.after_tax_credit, vehicle.mileage, vehicle.range_epa, vehicle.top_speed,
            vehicle.acceleration, vehicle.exterior_color, vehicle.interior_color, vehicle.wheels,
            vehicle.autopilot, vehicle.seat_layout, vehicle.additional_features,
            vehicle.status, vehicle.location
          ]
        );
        
        // Add images for this vehicle
        if (vehicle.images && vehicle.images.length > 0) {
          const imageValues = vehicle.images.map((img, idx) => [
            result.insertId,
            img.url,
            idx === 0,
            idx
          ]);
          
          await connection.query(
            'INSERT INTO vehicle_images (vehicle_id, image_url, is_primary, display_order) VALUES ?',
            [imageValues]
          );
        }
      }
      
      await connection.commit();
      res.json({ success: true, message: `${vehicles.length} vehicles created successfully` });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
