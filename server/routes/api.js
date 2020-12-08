const express = require('express');
const router = express.Router();
const axios = require('axios');
const Book = require('../models/Book.js');
const Books_API_KEY = "AIzaSyDSqefB9VlxkmI8tXqjzsdab5roCN4SKT0";
const OMDB_API_KEY = "15f932bf";

/* SANITY CHECK */
router.get('/sanity', function(req, res){
    //200 = OK
    res.sendStatus(200);
});
/* END OF SANITY CHECK */


/* GET WEATHER */
router.get('/weather/:lat/:lon', async function(req, res){

});
/* END OF WEATHER */


/* USER SCHEME */
router.get('/user/:userName', async function(req, res){
    //query password (authorize user TRUE or FALSE)
    //else: return the user data
});

router.post('/user', async function(req, res){

});

router.put('/user/:userName', async function(req, res){

});
/* END OF USER SCHEME */


/* BOOK SCHEME */
router.get('/books/:userName', async function(req, res){

});

router.get('/book/:bookName', async function(req, res){
    //example: `https://www.googleapis.com/books/v1/volumes?key=${Books_API_KEY}&q=the%20girl%20with`
});

router.post('/book', async function(req, res){

});

router.put('/book/:bookName', async function(req, res){

});

router.delete('/book/:bookName', async function(req, res){

});
/* END OF BOOK SCHEME */


/* LINK SCHEME */
router.get('/links/:userName', async function(req, res){

});

router.post('/link', async function(req, res){

});

router.put('/link/:linkName', async function(req, res){

});

router.delete('/link/:linkName', async function(req, res){

});
/* END OF LINK SCHEME */


/* NOTE SCHEME */
router.get('/notes/:userName', async function(req, res){

});

router.post('/note', async function(req, res){

});

router.put('/note/:noteName', async function(req, res){

});

router.delete('/note/:noteName', async function(req, res){

});
/* END OF NOTE SCHEME */


/* PICTURE SCHEME */
router.get('/pictures/:userName', async function(req, res){

});

router.post('/picture', async function(req, res){

});

router.put('/picture/:pictureName', async function(req, res){

});

router.delete('/picture/:pictureName', async function(req, res){

});
/* END OF PICTURE SCHEME */


/* QUOTE SCHEME */
router.get('/quotes/:userName', async function(req, res){

});

router.post('/quote', async function(req, res){

});

router.put('/quote/:quoteName', async function(req, res){

});

router.delete('/quote/:quoteName', async function(req, res){

});
/* END OF QUOTE SCHEME */


/* RECIPE SCHEME */
router.get('/recipes/:userName', async function(req, res){

});

router.post('/recipe', async function(req, res){

});

router.put('/recipe/:recipeName', async function(req, res){

});

router.delete('/recipe/:recipeName', async function(req, res){

});
/* END OF RECIPE SCHEME */


/* RESTAURANT SCHEME */
router.get('/restaurants/:userName', async function(req, res){

});

router.post('/restaurant', async function(req, res){

});

router.put('/restaurant/:restaurantName', async function(req, res){

});

router.delete('/restaurant/:restaurantName', async function(req, res){

});
/* END OF RESTAURANT SCHEME */


/* VIDEO SCHEME */
router.get('/videos/:userName', async function(req, res){

});

router.post('/video', async function(req, res){

});

router.put('/video/:videoName', async function(req, res){

});

router.delete('/video/:videoName', async function(req, res){

});
/* END OF VIDEO SCHEME */


/* MOVIE SCHEME */
router.get('/movies/:userName', async function(req, res){
});

router.get('/movie/:movieName', async function(req, res){
    //API TODO
    //example: `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=mirage`
});

router.post('/movie', async function(req, res){

});

router.put('/movie/:movieName', async function(req, res){

});

router.delete('/movie/:movieName', async function(req, res){

});
/* END OF VIDEO SCHEME */


module.exports = router;