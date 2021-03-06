
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || '3000');
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// global variables
app.use((req, res, next) => {
	next();
})

// routes
app.use(require('./routes'));
// app.use(require('./routes/employees'));
app.use('/logger', require('./routes/logger'));
app.use('/summary', require('./routes/summary'));
app.use('/auditory', require('./routes/auditory'));
app.use('/links', require('./routes/link'));

//public 
app.use(express.static(path.join(__dirname, 'public')));

// starting server
app.listen(app.get('port'), (req, res) => {
	console.log('Sever on port', app.get('port'));
	
});
