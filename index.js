/* importing the express package locally */
const express = require('express');
/* importing morgan */
const morgan = require('morgan');
/* declaring the variable 'app' and attaching to it all functionalities of express */
const app = express();

const fs = require('fs');
const path = require ('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

/* invoking morgan, for logging */
app.use(morgan('common', {stream: accessLogStream}));

/* allows the return of multiple static files in response to a request, shows documentation.html */
app.use(express.static('public'));

let myMovies = [
    {
      title: 'Angamaly Diaries',
      release: '2017'
    },
    {
      title: 'Ee.Ma.Yau',
      release: '2018'
    },
    {
      title: 'Jallikkattu',
      release: '2019'
    },
    {
      title: 'Churuli',
      release: '2021'
    },
    {
      title: 'Nanpakal Nerathu Mayakkam',
      release: '2023'
    },
    {
      title: 'Malaikottai Vaaliban',
      release: '2023'
    },
    {
      title: 'Thamaasha',
      release: '2019'
    },
    { 
      title: 'City of God',
      release: '2011'
    },
    {
      title: 'Darvinte Parinamam',
      release: '2016'
    },
    {
      title: 'Mayaanadhi',
      release: '2017'
    }

  ];

/* GET requests */
app.get('/movies', (req, res) => {
    res.json(myMovies);
  });

/* res.send object replaces response.writeHead and response.end code */
app.get('/', (req, res) => {
    res.send('Welcome to myFlix Movie App!');
});

/* error handler comes after all route calls and app.use but before app.listen */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('It\'s not working right now!');
  });

/* listen for requests, replaces http.createServer code */
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });