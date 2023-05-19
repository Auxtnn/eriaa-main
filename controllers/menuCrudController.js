const menuPost = require('../models/fooditem');



// GET all menu posts
const getMenuPosts = (async (req, res) => {
    try {
      const menuPost = await menuPost.find();
      res.render('foodmenu', { menuPost });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // GET create menu post form
  const getMenuCreate = (req, res) => {
    res.render('addfood');
  };
  
  // POST create menu post
  const menuCreatePost = (async (req, res) => {
    try {
      const { title, description, price, category, image } = req.body;
      const menuPost = new menuPost({ title, description, price, category, image  });
      await menuPost.save();
      res.redirect('foodmenu');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // GET edit menu post form
  const menuEditGet = (async (req, res) => {
    try {
      const menuPost = await menuPost.findById(req.params.id);
      res.render('editfood', { menuPost });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // PUT update menu post
  const menuEditPut = (async (req, res) => {
    try {
      const { title, content } = req.body;
      const menuPost = await blogPost.findById(req.params.id);
      menuPost.title = title;
      menuPost.description = description;
      menuPost.image = image;
      menuPost.price = price;
      menuPost.category = category;
      await menuPost.save();
      res.redirect('foodmenu');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // DELETE menu post
  const menuDelete = (async (req, res) => {
    try {
      await menuPost.findByIdAndDelete(req.params.id);
      res.redirect('foodmenu');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

module.exports = {
    getMenuPosts,
    menuEditGet,
    getMenuCreate,
    menuCreatePost,
    menuDelete,
    menuEditPut
}