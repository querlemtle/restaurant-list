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

app.get('/search', (req, res) => {
  // 取得使用者輸入之關鍵字
  const keyword = req.query.keyword;
  // 以輸入關鍵字至餐廳清單中搜尋是否有對應名稱或類別，並去除大小寫差異
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || 
    restaurant.category.toLowerCase().includes(keyword);
  });
  res.render('index', { restaurants: restaurants, keyword: keyword });
});

app.get('/restaurants/:restaurant_id', (req, res) => {
  // 根據被點擊圖卡超連結的id，至清單內找到對應資料
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id);
  res.render('show', { restaurant: restaurant });
});

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});