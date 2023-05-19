const blogPost = require('../models/blog');

// GET all blog posts on admin dashboard
const getBlogPosts = (async (req, res) => {
    try {
      const blogPost = await blogPost.find();
      res.render('blogpost', { blogPost });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // GET create blog post form
  const getBlogCreate = (req, res) => {
    res.render('addblog');
  };
  
  // POST create blog post
  const blogCreatePost = (async (req, res) => {
    try {
      const { title, content } = req.body;
      const blogPost = new blogPost({ title, content, author, image, date });
      await blogPost.save();
      res.redirect('blogpost');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // GET edit blog post form
  const blogEditGet = (async (req, res) => {
    try {
      const blogPost = await blogPost.findById(req.params.id);
      res.render('editpost', { blogPost });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // PUT update blog post
  const blogEditPut = (async (req, res) => {
    try {
      const { title, content } = req.body;
      const blogPost = await blogPost.findById(req.params.id);
      blogPost.title = title;
      blogPost.content = content;
      blogPost.author = author;
      blogPost.image = image;
      blogPost.date = date;
      await blogPost.save();
      res.redirect('blogpost');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // DELETE blog post
  const blogDelete = (async (req, res) => {
    try {
      await blogPost.findByIdAndDelete(req.params.id);
      res.redirect('blogpost');
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

