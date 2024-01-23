// application packages
const express = require('express')
const app= express()

const path = require('path')
// add template engine
const hbs = require('express-handlebars');
// setup template engine directory and files extenstions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}))
// setup static public directory
app.use(express.static('public'));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const articleRoutes = require('./routes/article');

app.use('/', articleRoutes);
app.use('/article', articleRoutes)

// author's page
app.get('/author/:author_id', (req, res) => {
    let authorQuery = `select name from author where id = ${req.params.author_id}`;
    let articlesQuery = `select * from article where author_id = ${req.params.author_id}`;
    let authorName;
    let authorArticles;
   // author's name
    con.query(authorQuery, (err, result) => {
        if (err) throw err;
        authorName = result[0].name;
        // author's articles
        con.query(articlesQuery, (err, result) => {
            if (err) throw err;
            authorArticles = result;
            res.render('author', {
                authorName: authorName,
                authorArticles: authorArticles
            });
        });
    });
});

// app start point
app.listen(3000, () => {
    console.log('App is started at http://localhost:3000')
})