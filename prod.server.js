let express = require('express');
let config = require('./config/index');

let port = process.env.PORT || config.build.port;
let app = express();
let router = express.Router();

router.get('/', function(req, res, next){
  req.url = '/index.html';
  next();
});

app.use(router);

const appData = require('./data.json');
const seller = appData.seller;
const goods = appData.goods;
const rating = appData.ratings;

const apiRoutes = express.Router();

apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get('/rating', function (req, res) {
  res.json({
    errno: 0,
    data: rating
  });
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function(err){
  if(err){
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n');
})

