const express=require('express');
const router=express.Router();
const upload=require('../middleware/multer.js')
const {createmovie, getallmovies, deletemovie, addratings, addComment, getmoviedetail}=require('../controllers/moviecontroller.js');
const { isauthenicated } = require('../middleware/auth.js');
const { getdetail } = require('../controllers/usercontroller.js');

router.route('/createmovie').post( upload.fields([{ name: 'imageurl', maxCount: 1 }, { name: 'vediourl', maxCount: 1 }]),createmovie)
router.route('/getmovies').get(getallmovies);

router.route('/deletemovie/:id').delete(deletemovie);
router.route('/ratings/:id').post(isauthenicated,addratings);
// router.route('/addcomment/:id').post(addComment);
router.route('/addcomment/:id').post(isauthenicated,addComment);
router.route('/detail/:id').get(getmoviedetail);


module.exports=router;

