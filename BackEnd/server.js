const express = require('express');
const app = express();
const port = 4000;
// Import the Mongoose library to connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@admin.fmjxy.mongodb.net/');
// Define a schema for movies
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String
});
// Create a Movie model based on the movie schema
const Movie = mongoose.model('Movie', movieSchema);

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Define POST for creating a new movie and adding data top mongo DB
app.post('/api/movies', async (req, res)=>{

  const { title, year, poster } = req.body;//formatting the request and adding it to the const
  const newMovie = new Movie({ title, year, poster });// Create a new movie document using the Movie model with the provided data
  await newMovie.save();
 
  res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
})


app.get('/api/movies', async (req, res) => {//updating the api movies header in the url to be async
    const movies = await Movie.find({});
    res.status(200).json({movies})
});


app.get('/api/movie/:id', async (req, res) => {//
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});