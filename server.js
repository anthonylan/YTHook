const express = require('express');
const app = express();
// const { resolve } = require('path');
const router = express.Router()

const exphbs = require('express-handlebars');



// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');


// app.use(express.static(process.env.STATIC_DIR));
app.use(express.static(`${__dirname}/public`));




app.get('/', (req, res) => {
  res.render('index');
});

//Render Views
app.get('/play1', (req, res) => {
  res.render('play1');
});
app.get('/play2', (req, res) => {
  res.render('play2');
});
app.get('/play3', (req, res) => {
  res.render('play3');
});
app.get('/play4', (req, res) => {
  res.render('play4');
});
app.get('/play5', (req, res) => {
  res.render('play5');
});
app.get('/play6', (req, res) => {
  res.render('play6');
});




//CDN JavaScript
router.get('/hook.js', (req, res) => {
  res.sendFile('public/hook.js')
})

//==================//
app.listen(process.env.PORT || 3000, function(){
  console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});




