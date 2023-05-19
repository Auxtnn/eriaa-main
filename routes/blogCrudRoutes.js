const express = require('express');
const router = express.Router();
const blogCrudController = require ('../controllers/blogCrudController')

// ADMIN ROUTES FOR BLOG CRUD OPERATION
router.get ('/blog-posts', blogCrudController.getBlogPosts);
router.get ('/blog-post/create', blogCrudController.getBlogCreate);
router.post ('/blog-post', blogCrudController.blogCreatePost);
router.get('/blog-post/:id/edit', blogCrudController.blogEditGet);
router.put('/blog-post/:id', blogCrudController.blogEditPut);
router.delete('/blog-post/:id', blogCrudController.blogDelete);

module.exports = router