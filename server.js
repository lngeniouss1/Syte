const express = require('express');
const path = require('node:path');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home', { title: 'Главная', activePage: 'home' });
});

app.get('/catalog', (req, res) => {
  res.render('catalog', { title: 'Каталог', activePage: 'catalog' });
});

app.get('/contacts', (req, res) => {
  res.render('contacts', { title: 'Контакты', activePage: 'contacts' });
});

app.use((req, res) => {
  res.status(404).render('not-found', { title: 'Страница не найдена', activePage: '' });
});

app.listen(port, () => {
  console.log(`Сайт доступен: http://localhost:${port}`);
});