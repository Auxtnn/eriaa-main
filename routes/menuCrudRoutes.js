const express = require('express');
const router = express.Router();
const menuCrudController = require('../controllers/menuCrudController');



// ADMIN MENU CRUD OPERATION
router.get ('/menu-posts', menuCrudController.getMenuPosts);
router.get ('/menu-post/create', menuCrudController.getMenuCreate);
router.post ('/menu-post', menuCrudController.menuCreatePost);
router.get('/menu-post/edit/:id', menuCrudController.menuEditGet);
router.put('/menu-post/:id', menuCrudController.menuEditPut);
router.delete('/menu-post/:id', menuCrudController.menuDelete);
router.get ('/', menuCrudController.getIndex);
// RENDER POST ON MENU PAGE
router.get ('/menu', menuCrudController.getMenu);

module.exports = router;