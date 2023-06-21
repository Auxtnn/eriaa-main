const Blog = require('../models/blog');
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
    folder: 'blog',
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

// GET all blog posts on admin dashboard
const getBlogPosts = async (req, res) => {
  try {
    const blog = await Blog.find().sort({ timeCreated: 'desc' });
    res.render('blogpost', { blog: blog });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getBlog = async (req, res) => {
  try {
    // Fetch the blog data from the database or API
    const blog = await Blog.find().sort({ timeCreated: 'desc' });; // Replace with your fetch logic

    // Render the view and pass the blogs data
    res.render('blog', { blog: blog });
  } catch (error) {
    // Handle any errors that occur during the fetch or rendering process
    console.error('Error fetching blog data:', error);
    res.status(500).send('Internal Server Error');
  }
};

// GET create blog post form
const getBlogCreate = (req, res) => {
  res.render('addpost');
};
// GET MENU POST
const blogCreatePost = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    try {
      const { title, content, snippet } = req.body;
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'blog-images'
      });
      const image = {
        public_id: result.public_id, // Add the public_id property
        url: result.secure_url
      };

      const blog = new Blog({ title, content, snippet, image });
      await blog.save();

      res.redirect('/blog-posts');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
};




// GET show blog post on main website
const showMainBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render('mainBlogShow', { blog: [blog] }); // Pass the blog as an array
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};



// GET edit blog post form
const blogEditGet = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render('editblog', { blog: blog });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// PUT update blog post
const blogEditPut = async (req, res) => {
  try {
    const { title, content, snippet } = req.body;
    const blog = await Blog.findByIdAndUpdate(req.params.id);

    // Check if a new image is being uploaded
    if (req.file) {
      // Delete previous image from Cloudinary
      await cloudinary.uploader.destroy(blog.image.public_id);

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'blog-images'
      });
      const image = {
        public_id: result.public_id,
        url: result.secure_url
      };
      // Update the image property in the blog
      blog.image = image;
    }

    // Update only the provided fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (snippet) blog.author = snippet;

    await blog.save();
    res.redirect('/blog-posts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

  
  // DELETE blog post
  const blogDelete = async (req, res) => {
  try {
  const blog = await Blog.findById(req.params.id);
  // Delete image from Cloudinary
  await cloudinary.uploader.destroy(blog.image.public_id);

  await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blog-posts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
    }
    };
    
    module.exports = {
    getBlogPosts,
    getBlogCreate,
    getBlog,
    blogCreatePost,
    blogEditGet,
    blogEditPut,
    blogDelete,
    showMainBlog
    };

