/* importing all needed packages locally */
const express = require('express');
      morgan = require('morgan');
      app = express();
      fs = require('fs');
      path = require ('path');
      bodyParser = require('body-parser');
      uuid = require('uuid');
      accessLogStream = fs.createWriteStream(path.join(__dirname, './log.txt.log'), {flags: 'a'});

/* invoking morgan to log and write into log.txt.log */
app.use(morgan('common', {
  stream: fs.createWriteStream('./log.txt.log', {flags: 'a'})
}));
app.use(morgan('dev'));

/* allows the return of multiple static files in response to a request */
app.use(express.static('public'));
app.use(bodyParser.json());

let users = [
  {
    "id": "1.1",
    "name": "John",
    "favouriteMovie": []
  },
  {
    "id": "1.2",
    "name": "Manik",
    "favouriteMovie": "Angamaly Diaries"
  }
];

let myMovies = [
    {
      "title": "Angamaly Diaries",
      "description": "describe movie",
      "release": "2017",
      "genre": {
        "name": "Drama",
      },
      "director": {
        "name": "Lijo-Jose-Pellissery",
        "bio": "aka LJP",
        "birth year": "1978",
        "death year": "2050",
      },
      "imageUrl": "link to image URL",
      "featured":false
    },
    {
      "title": "Ee.Ma.Yau",
      "description": "describe movie",
      "release": "2018",
      "genre": {
        "name": "thriller",
      },
      "director": {
        "name": "Lijo-Jose-Pellissery",
        "bio": "aka LJP",
        "birth year": "1978",
        "death year": "2050",
      },
      "imageUrl": "link to image URL",
      "featured":false
    },
    {
      "title": "Jallikkattu",
      "description": "describe movie",
      "release": "2019",
      "genre": {
        "name": "Thriller",
      },
      "director": { 
        "name": "Lijo-Jose-Pellissery",
        "bio": "aka LJP",
        "birth year": "1978",
        "death year": "2050",
      },
      "imageUrl": "link to image URL",
      "featured":false
    },
    {
      "title": "Churuli",
      "description": "describe movie",
      "release": "2021",
      "genre": {
        "name": "thriller",
      },
      "director": {
        "name": "Lijo-Jose-Pellissery",
        "bio": "aka LJP",
        "birth year": "1978",
        "death year": "2050",
      },
      "imageUrl": 'link to image URL',
      "featured": 'false'
    },
    {
      "title": "Nanpakal Nerathu Mayakkam",
      "description": "describe movie",
      "release": "2023",
      "genre": {
        "name": "comedy",
      },
      "director": {
        "name": "Lijo-Jose-Pellissery",
        "bio": "aka LJP",
        "birth year": "1978",
        "death year": "2050",
      },
      "imageUrl": "link to image URL",
      "featured":false
    }
  
];


/* GETs List of all movies */
app.get('/movies', (req, res) => {
        res.status(200).json(myMovies);
    });

    /* res.send object replaces response.writeHead and response.end code */
    app.get('/', (req, res) => {
        res.send('Welcome to myFlix Movie App!');
});

/* 2. GETs specific movie data by title */
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = myMovies.find( movie => movie.title === title );
  
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(400).send('this movie doesn\'t exist!')
    }
})

/* 3. GETs specific movie data by genre */
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = myMovies.find( movie => movie.genre.name === genreName ).genre;
  
    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(400).send('this genre doesn\'t exist!')
    }
})

/* 4. GETs specific movie data by director */
app.get('/movies/director/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = myMovies.find( movie => movie.director.name === directorName ).director;

    if (director) {
    res.status(200).json(director);
    } else {
    res.status(400).send('this director doesn\'t exist!')
    }
})
  
/* 5. POST: allows new users to register  */
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('user name required');
    }
})
  
/* 6. PUT: allows user to update their userinfo */

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updateUser = req.body;
    /* only use 2 = rather than 3 = as user.id is a number but id is  a string */
    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updateUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('user name not found')

    }
})

/* 7. POST: allow users to add a movie to their favourites   */

app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    /* only use 2 = rather than 3 = as user.id is a number but id is  a string */
    let user = users.find( user => user.id == id );

    if (user) {
        user.favouriteMovie.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('user name not found')

    }
})

/* 8. DELETE: allow users to remove a movie from their favourites */

app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    /* only use 2 = rather than 3 = as user.id is a number but id is  a string */
    let user = users.find( user => user.id == id );

    if (user) {
        user.favouriteMovie = user.favouriteMovie.filter( title => title !== movieTitle )
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('user name not found')

    }
})

/* 9. DELETE: allow users to de-register */

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    /* only use 2 = rather than 3 = as user.id is a number but id is  a string */
    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id )
        res.status(200).send(` user ${id} has been successfully deleted `);
    } else {
        res.status(400).send('user name not found')

    }
})

/* error handler comes after all route calls and app.use but before app.listen */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('It\'s not working right now!');
});

/* listen for requests, replaces http.createServer code */
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});