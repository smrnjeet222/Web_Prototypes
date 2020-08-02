const express = require('express');
const exphbs = require('express-handlebars');

const logger = require('./middleware/logger');
const members = require('./data');


const app = express();
const PORT = process.env.PORT || 5050

// Init Logger
app.use(logger);

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: '../../Express/views/layouts/main' }));
app.set('view engine', 'handlebars');

// bodyParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => res.render('../Express/views/index', {
    title: "CRUD App",
    members
}))


// app.use('/', require('./routes/home'));
// app.use(express.static(path.join(__dirname, 'public')));


//members api routes
app.use('/api/members', require("./routes/api/members"));



app.listen(PORT, () => console.log(`App available on http://localhost:${PORT}`));