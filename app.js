// 從node_modules加入express、express-handlebars
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const restaurantList = require('./restaurant.json');

// 伺服器埠號
const port = 3000;

// 設定樣板引擎
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));

// 設定靜態檔案
app.use(express.static('public'));

// 設定路由
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results });
});

app.get('/restaurants/:restaurant_id', (req, res) => {
  res.render('show');
});

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});