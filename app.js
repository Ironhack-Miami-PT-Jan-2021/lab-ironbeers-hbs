const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  // ^ the /beers here refers to the url in the browser address bar
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', {beerList: beersFromApi});
      // the 'beers' ^ here refers to the name of the hbs file you wanna show when the user visits that url
    })
    .catch(error => console.log(error));
});







app.get('/random', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log(responseFromAPI[0]);
    res.render('single-beer', {theBeer: responseFromAPI[0]});
  })
  .catch(error => console.log(error));
});



app.get('/one-single-beer/:beerIdVariable', (req, res) => {
  punkAPI
  .getBeer(req.params.beerIdVariable)
  .then(responseFromAPI => {
    res.render('single-beer', {theBeer: responseFromAPI[0]});
  })
  .catch(error => console.log(error));
});











app.listen(3000, () => console.log('🏃‍ on port 3000'));
