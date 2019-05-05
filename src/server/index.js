
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'piano-test', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(errorHandler());

mongoose.connect('mongodb://vlad_mironov_piano:HvK7bqBuuz7mkzH@ds253353.mlab.com:53353/users', { useNewUrlParser: true });
mongoose.set('debug', true);

require('./models/Users');
require('./config/passport');
app.use(require('./routes'));

//Error handlers & middlewares
// app.use((err, req, res) => {
//     res.status(err.status || 500);

//     res.json({
//         errors: {
//             message: err.message,
//             error: err,
//         },
//     });
// });

// app.use((err, req, res) => {
//   res.status(err.status || 500);

//   res.json({
//     errors: {
//       message: err.message,
//       error: {},
//     },
//   });
// });

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));