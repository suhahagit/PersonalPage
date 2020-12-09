const express = require('express');
const router = express.Router();
const axios = require('axios');
const session = require('express-session');
const Book = require('../models/Book.js');
const Link = require('../models/Link.js');
const Movie = require('../models/Movie.js');
const Series = require('../models/Series.js');
const Note = require('../models/Note.js');
const Picture = require('../models/Picture.js');
const Quote = require('../models/Quote.js');
const Recipe = require('../models/Recipe.js');
const Restaurant = require('../models/Restaurant.js');
const User = require('../models/User.js');
const Video = require('../models/Video.js');
const Books_API_KEY = "AIzaSyDSqefB9VlxkmI8tXqjzsdab5roCN4SKT0";
const OMDB_API_KEY = "15f932bf";
const Weather_API_KEY = "484da5e921c1d538aee222ffd65ca2da";

router.use(session({
    secret: 'hahaha',
    saveUninitialized: true,
    resave: true
}));
let sess;


/* SANITY CHECK */
router.get('/sanity', function (req, res) {
    //200 = OK
    res.sendStatus(200);
});
/* END OF SANITY CHECK */

/* GET WEATHER */
router.get('/weather/:lat/:lon', async function (req, res) {
    try {
        const weatherData = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.lon}&appid=${Weather_API_KEY}&units=metric`);
        const weather = {
            temperature: weatherData.data.main.temp,
            conditionPic: `http://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`
        }
        res.send(weather);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});
/* END OF WEATHER */

/* REQUEST SESSION */
router.get('/session', function (req, res) {
    if (sess)
        res.send({
            userName: sess.userName,
            password: sess.password
        });
    else
        res.send(null);
});

router.get('/sessionDelete', function (req, res) {
    req.session.destroy();
    req.session = null;
    sess = null;
    res.send(null);
});
/* END OF REQUEST OF SESSION */

/* USER SCHEME */
router.get('/user/:userName', async function (req, res) {
    try {
        const user = await User.find({
            userName: req.params.userName
        });
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.post('/user/login', async function (req, res) {
    try {
        const user = await User.findOne({
            userName: req.body.userName
        });
        if (req.body.password === user.password) {
            sess = req.session;
            sess.userName = user.userName;
            sess.password = user.password;
            res.send(user);
        } else {
            res.send(null);
        }
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.post('/user/register', async function (req, res) {
    try {
        const user = new User({
            ...req.body
        });
        await user.save();
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

// router.put('/user/:userName', async function (req, res) {

// });
/* END OF USER SCHEME */

/* BOOK SCHEME */
router.get('/books/:userName', async function (req, res) {
    try {
        const books = await Book.find({}, {
            userName: req.params.userName
        });
        res.send(books);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.get('/book/:bookName', async function (req, res) {
    //example: `https://www.googleapis.com/books/v1/volumes?key=${Books_API_KEY}&q=the%20girl%20with`
    try {
        const bookData = await axios.get(`https://www.googleapis.com/books/v1/volumes?key=${Books_API_KEY}&q=${req.params.bookName}`);
        //const bookData = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=title:${req.params.bookName}`
        const books = []
        for (let b of bookData.data.items) {
            books.push({
                title: b.volumeInfo.title,
                author: b.volumeInfo.authors,
                thumbnail: b.volumeInfo.imageLinks.thumbnail,
                description: b.volumeInfo.description
            })
        }
        res.send(books);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.post('/book', async function (req, res) {
    try {
        const book = new Book({
            ...req.body
        });
        await book.save();
        res.send(book);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

// router.put('/book/:bookName', async function (req, res) {
// });

router.delete('/book/:bookId', async function (req, res) {
    const id = req.params.bookId
    try {
        const book = await Book.findByIdAndRemove
            ({
                id
            });
        res.send(book);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});
/* END OF BOOK SCHEME */

// router.post('/book', async function(req, res){

/* LINK SCHEME */
router.get('/links/:userName', async function (req, res) {
    try {
        const links = await Link.find({}, {
            userName: req.params.userName
        });
        res.send(links);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.post('/link', async function (req, res) {
    try {
        const link = new Link({
            ...req.body
        });
        await link.save();
        res.send(link);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

// router.put('/link/:linkName', async function (req, res) {
// });

router.delete('/link/:linkID', async function (req, res) {
    const linkID = req.params.linkID
    try {
        const link = await Link.findByIdAndRemove({
            linkID
        })
        res.send(link);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});
/* END OF LINK SCHEME */

// router.post('/link', async function(req, res){

/* NOTE SCHEME */
router.get('/notes/:userName', async function (req, res) {
    try {
        const notes = await Note.find({}, {
            userName: req.params.userName
        });
        res.send(notes);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.post('/note', async function (req, res) {
    try {
        const note = new Note({
            ...req.body
        })
        await note.save();
        res.send(note);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

// router.put('/note/:noteName', async function (req, res) {
// });

router.delete('/note/:noteID', async function (req, res) {
    const noteID = req.params.noteID
    try {
        const note = await Note.findByIdAndRemove({
            noteID
        })
        res.send(note);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});
/* END OF NOTE SCHEME */

// router.post('/note', async function(req, res){

/* PICTURE SCHEME */
router.get('/pictures/:userName', async function (req, res) {
    try {
        const pictures = await Picture.find({}, {
            userName: req.params.userName
        })
        res.send(pictures)
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.post('/picture', async function (req, res) {
    try {
        const picture = new Picture({
            ...req.body
        })
        await picture.save();
        res.send(picture);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

// router.put('/picture/:pictureName', async function (req, res) {
// });

router.delete('/picture/:pictureID', async function (req, res) {
    const pictureID = req.params.pictureID;
    try {
        const picture = await Picture.findByIdAndRemove({
            pictureID
        });
        res.send(picture);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});
/* END OF PICTURE SCHEME */

// router.post('/picture', async function(req, res){

/* QUOTE SCHEME */
router.get('/quotes/:userName', async function (req, res) {
    try {
        const quotes = await Quote.find({}, {
            userName: req.params.userName
        });
        res.send(quotes);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.post('/quote', async function (req, res) {
    try {
        const quote = new Quote({
            ...req.body
        });
        await quote.save();
        res.send(quote);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

// router.put('/quote/:quoteName', async function (req, res) {
// });

router.delete('/quote/:quoteID', async function (req, res) {
    const quoteID = req.params.quoteID;
    try {
        const quote = await Quote.findByIdAndRemove({
            quoteID
        });
        res.send(quote);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});
/* END OF QUOTE SCHEME */

// router.post('/quote', async function(req, res){

/* RECIPE SCHEME */
router.get('/recipes/:userName', async function (req, res) {
    try {
        const recipes = await Recipe.find({}, {
            userName: req.params.userName
        });
        res.send(recipes);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.post('/recipe', async function (req, res) {
    try {
        const recipe = new Recipe({
            ...req.body
        });
        await recipe.save();
        res.send(recipe);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

// router.put('/recipe/:recipeName', async function (req, res) {
// });

router.delete('/recipe/:recipeID', async function (req, res) {
    const recipeID = req.params.recipeID;
    try {
        const recipe = await Recipe.findByIdAndRemove({
            recipeID
        });
        res.send(recipe);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});
/* END OF RECIPE SCHEME */

// router.post('/recipe', async function(req, res){

/* RESTAURANT SCHEME */
router.get('/restaurants/:userName', async function (req, res) {
    try {
        const restaurants = await Restaurant.find({}, {
            userName: req.params.userName
        });
        res.send(restaurants);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.post('/restaurant', async function (req, res) {
    try {
        const restaurant = new Restaurant({
            ...req.body
        });
        await restaurant.save();
        res.send(restaurant);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

// router.put('/restaurant/:restaurantName', async function (req, res) {
// });

router.delete('/restaurant/:restaurantId', async function (req, res) {
    const restaurantId = req.params.restaurantId
    try {
        const restaurant = await Restaurant.findByIdAndRemove({
            restaurantId
        });
        res.send(restaurant);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});
/* END OF RESTAURANT SCHEME */

// router.post('/restaurant', async function(req, res){

/* VIDEO SCHEME */
router.get('/videos/:userName', async function (req, res) {
    try {
        const videos = await Video.find({}, {
            userName: req.params.userName
        });
        res.send(videos);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.post('/video', async function (req, res) {
    try {
        const video = new Video({
            ...req.body
        });
        await video.save();
        res.send(video);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

// router.put('/video/:videoName', async function (req, res) {
// });

router.delete('/video/:videoId', async function (req, res) {
    const videoId = req.params.videoId;
    try {
        const video = await Video.findByIdAndRemove({
            videoId
        });
        res.send(video);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});
/* END OF VIDEO SCHEME */

// router.post('/video', async function(req, res){

/* MOVIE SCHEME */
router.get('/movies/:userName', async function (req, res) {
    try {
        const movies = await Movie.find({}, {
            userName: req.params.userName
        });
        res.send(movies);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.get('/movie/:movieName', async function (req, res) {
    //API TODO
    //example: `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=mirage`
    try {
        const movieData = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${req.params.movieName}`);
        const movie = {
            title: movieData.data.Title,
            plot: movieData.data.Plot,
            year: movieData.data.Year,
            pic: movieData.data.Poster,
            rate: movieData.data.Ratings[0].value
        }
        res.send(movie);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.post('/movie', async function (req, res) {
    try {
        const movie = new Movie({
            ...req.body
        });
        await movie.save();
        res.send(movie)
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

// router.put('/movie/:movieName', async function (req, res) {
// });

router.delete('/movie/:movieId', async function (req, res) {
    const movieId = req.params.movieId;
    try {
        const movie = await Movie.findByIdAndRemove({
            movieId
        });
        res.send(movie);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});
/* END OF MOVIES SCHEME */

/* SERIES SCHEME */
router.get('/serieses/:userName', async function (req, res) {
    try {
        const serieses = await Series.find({}, {
            userName: req.params.userName
        });
        res.send(serieses);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.get('/series/:seriesName', async function (req, res) {
    //API TODO
    //example: `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=mirage`
    try {
        const seriesData = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${req.params.seriesName}`);
        const series = {
            title: seriesData.data.Title,
            plot: seriesData.data.Plot,
            year: seriesData.data.Year,
            pic: seriesData.data.Poster,
            rate: seriesData.data.Ratings[0].value
        }
        res.send(series);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

router.post('/series', async function (req, res) {
    try {
        const series = new Series({
            ...req.body
        });
        await series.save();
        res.send(series)
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});

// router.put('/series/:seriesName', async function (req, res) {
// });

router.delete('/series/:seriesId', async function (req, res) {
    const seriesId = req.params.seriesId;
    try {
        const series = await Series.findByIdAndRemove({
            seriesId
        });
        res.send(series);
    } catch (error) {
        console.log(error);
        res.send(null);
    }
});
/* END OF SERIES SCHEME */



module.exports = router;