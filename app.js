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
  // this is a url parameter ^
  // this url is /one-single-beer/anything
  // as long as there is something after the /one-single-beer this route will take
  // value in the url and equal it to req.params.whatever-comes-after-the-colon

  punkAPI
  .getBeer(req.params.beerIdVariable)
  .then(responseFromAPI => {
    let data = {
     abv : false,
     ibu : false,
     ph : false,
     ebc : false,
     srm : false,
     theBeer: responseFromAPI[0]
   }
    console.log(req.query);
    
    if(req.query.abv) data.abv = true;
    if(req.query.ibu) data.ibu = true;
    if(req.query.ph) data.ph = true;
    if(req.query.ebc) data.ebc = true;
    if(req.query.srm) data.srm = true;

    res.render('single-beer', data);
  })
  .catch(error => console.log(error));
});











app.listen(3000, () => console.log('🏃‍ on port 3000'));
