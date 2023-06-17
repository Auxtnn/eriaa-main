const Blog = require('../models/blog');
const multer = require('multer');


// Lets define Storage for storing the uploaded images 

const storage = multer.diskStorage({
  // to locate destination of a file which is being uploaded
  destination: function(res, file, callback){
      callback(null,'./public/images');
  },

  // add back the extension to the file name
  filename: function(res, file, callback){
      callback(null, Date.now() + file.originalname);
  },

})

// upload parameters for multer for uploading images
const upload = multer({
  // multer will only accept files with these extensions
  storage: storage,
  limits:{
      fileSize: 1024* 1024* 3,
  },
})

// GET all blog posts on admin dashboard
const getBlogPosts = (async (req, res) => {
    try {
      const blog = await Blog.find().sort({ timeCreated: "desc" });
      res.render('blogpost', { blog: blog });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});


  // GET create blog post form
  const getBlogCreate = (req, res) => {
    res.render('addpost');
};
  
  // POST create blog post
  // router.post('/blog-posts', upload.single('image'), async(req, res)=>{
const blogCreatePost = ('/blog-posts', upload.single('image'), async (req, res) => {
    try {
      const { title, content, author, image } = req.body;
      const blog = new Blog({ title, content, author, image });
      await blog.save();
      res.redirect('/blog-posts');
} catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // GET edit blog post form
  const blogEditGet = (async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      res.render('editblog', { blog: blog });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // PUT update blog post
const blogEditPut = (async (req, res) => {
    try {
      const { title, content, author, image } = req.body;
      const blog = await Blog.findById(req.params.id);
      blog.title = title;
      blog.content = content;
      blog.author = author;
      blog.image = image;
      
      await blog.save();
      res.redirect('/blog-posts');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // DELETE blog post
const blogDelete = (async (req, res) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.redirect('/blog-posts');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});

module.exports = {
    getBlogPosts,
    getBlogCreate,
    blogCreatePost,
    blogEditGet,
    blogEditPut,
    blogDelete
}

