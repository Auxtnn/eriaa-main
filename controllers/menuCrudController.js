const Menu = require('../models/fooditem');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
});

// Create a Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'menu',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] // specify the allowed file formats
  }
});


// Upload parameters for multer for uploading images
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3
  }
});

// GET all menu posts on admin dashboard
const getMenuPosts = async (req, res) => {
  try {
    const menu = await Menu.find().sort({ timeCreated: 'desc' });
    res.render('foodmenu', { menu: menu });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getMenu = async (req, res) => {
  try {
    // Fetch the menu data from the database or API
    const menu = await Menu.find().sort({ timeCreated: 'desc' }); // Replace with your fetch logic

    // Group the menu items by category
    const categories = {
      Grilled: [],
      Cooked: [],
      Baked: [],
      Beverages: [],
      Desserts: []
    };

    menu.forEach((item) => {
      categories[item.category].push(item);
    });

    // Render the view and pass the menu data for each category
    res.render('menu', { categories });
  } catch (error) {
    // Handle any errors that occur during the fetch or rendering process
    console.error('Error fetching menu data:', error);
    res.status(500).send('Internal Server Error');
  }
};



const getIndex = async (req, res) => {
  try {
    // Fetch the menu data from the database or API
    const menu = await Menu.find().sort({ timeCreated: 'desc' }) // Replace with your fetch logic

    // Group the menu items by category
    const categories = {
      Grilled: [],
      Cooked: [],
      Baked: [],
      Beverages: [],
      Desserts: []
    };

    menu.forEach((item) => {
      categories[item.category].push(item);
    });

    // Render the view and pass the menu data for each category
    res.render('index', { categories });
  } catch (error) {
    // Handle any errors that occur during the fetch or rendering process
    console.error('Error fetching menu data:', error);
    res.status(500).send('Internal Server Error');
  }
};



// GET create blog post form
const getMenuCreate = (req, res) => {
  res.render('addfood');
};

// CREATE MENU POST
const menuCreatePost = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    try {
      const { name, description, category, price } = req.body;
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'menu-images'
      });
      const image = {
        public_id: result.public_id, // Add the public_id property
        url: result.secure_url
      };

      const menu = new Menu({ name, description, category, price, image });
      await menu.save();

      res.redirect('/menu-posts');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
};

// GET edit menu post form
const menuEditGet = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.render('editfood', { menu: menu });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// PUT update menu post
const menuEditPut = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const menu = await Menu.findById(req.params.id);

  // Check if a new image is being uploaded
if (req.file) {
  // Delete previous image from Cloudinary
  await cloudinary.uploader.destroy(menu.image.public_id);

  // Upload new image to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'menu-images' // Optional folder in Cloudinary to organize the images
  });
 // Update the image properties in the database
 menu.image.public_id = result.public_id;
 menu.image.url = result.secure_url;
}


    // Update only the provided fields
    if (name) menu.name = name;
    if (description) menu.description = description;
    if (category) menu.category = category;
    if (price) menu.price = price;
    

    await menu.save();
    res.redirect('/menu-posts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
  
  // DELETE blog post
  const menuDelete = async (req, res) => {
  try {
  const menu = await Menu.findById(req.params.id);
  // Delete image from Cloudinary
  await cloudinary.uploader.destroy(menu.image.public_id);

  await Menu.findByIdAndDelete(req.params.id);
    res.redirect('/menu-posts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
    }
    };
    
    module.exports = {
    getMenuPosts,
    getMenuCreate,
    getMenu,
    menuCreatePost,
    menuEditGet,
    menuEditPut,
    menuDelete,
    getIndex
    };

