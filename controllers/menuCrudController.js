const Menu = require('../models/fooditem');
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
const getMenuPosts = (async (req, res) => {
    try {
      const menu = await Menu.find().sort({ timeCreated: "desc" });
      res.render('foodmenu', { menu: menu });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});


  // GET create blog post form
  const getMenuCreate = (req, res) => {
    res.render('addfood');
};
  
  // POST create blog post
  // router.post('/blog-posts', upload.single('image'), async(req, res)=>{
const menuCreatePost = ('/menu-posts', upload.single('image'), async (req, res) => {
    try {
      const { name, description, category, price, image } = req.body;
      const menu = new Menu({ name, description, category, price, image });
      await menu.save();
      res.redirect('/menu-posts');
} catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // GET edit blog post form
  const menuEditGet = (async (req, res) => {
    try {
      const menu = await Menu.findById(req.params.id);
      res.render('editfood', { menu: menu });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // PUT update blog post
const menuEditPut = (async (req, res) => {
    try {
      const { name, description, category, price, image } = req.body;
      const menu = await Menu.findById(req.params.id);
      menu.name = name;
      menu.description = description;
      menu.category = category;
      menu.price = price;
      menu.image = image;
      
      await menu.save();
      res.redirect('/menu-posts');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  // DELETE blog post
const menuDelete = (async (req, res) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.redirect('/menu-posts');
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