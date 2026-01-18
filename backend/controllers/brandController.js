import pool from '../config/database.js';

// Get all brands
export const getAllBrands = async (req, res) => {
  try {
    const { active_only = 'false' } = req.query;
    
    let query = 'SELECT * FROM brands';
    if (active_only === 'true') {
      query += ' WHERE is_active = 1';
    }
    query += ' ORDER BY display_order ASC, name ASC';
    
    const [brands] = await pool.query(query);
    
    res.json({
      success: true,
      data: brands
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching brands',
      error: error.message
    });
  }
};

// Get single brand
export const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [brands] = await pool.query('SELECT * FROM brands WHERE id = ?', [id]);
    
    if (brands.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    res.json({
      success: true,
      data: brands[0]
    });
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching brand',
      error: error.message
    });
  }
};

// Create brand
export const createBrand = async (req, res) => {
  try {
    const { name, image_url, display_order = 0, is_active = 1 } = req.body;
    
    // Use uploaded file path if available, otherwise use provided URL
    let finalImageUrl = image_url;
    if (req.file) {
      finalImageUrl = `/uploads/${req.file.filename}`;
    }
    
    if (!name || !finalImageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Name and image are required'
      });
    }
    
    const [result] = await pool.query(
      'INSERT INTO brands (name, image_url, display_order, is_active) VALUES (?, ?, ?, ?)',
      [name, finalImageUrl, display_order, is_active]
    );
    
    res.status(201).json({
      success: true,
      message: 'Brand created successfully',
      data: {
        id: result.insertId,
        name,
        image_url: finalImageUrl,
        display_order,
        is_active
      }
    });
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating brand',
      error: error.message
    });
  }
};

// Update brand
export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, image_url, display_order, is_active } = req.body;
    
    // Use uploaded file path if available
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }
    
    const updates = [];
    const values = [];
    
    if (name !== undefined) {
      updates.push('name = ?');
      values.push(name);
    }
    if (image_url !== undefined) {
      updates.push('image_url = ?');
      values.push(image_url);
    }
    if (display_order !== undefined) {
      updates.push('display_order = ?');
      values.push(display_order);
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?');
      values.push(is_active);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }
    
    values.push(id);
    
    const [result] = await pool.query(
      `UPDATE brands SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Brand updated successfully'
    });
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating brand',
      error: error.message
    });
  }
};

// Delete brand
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query('DELETE FROM brands WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Brand deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting brand',
      error: error.message
    });
  }
};
