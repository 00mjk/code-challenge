const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();
const port = 3000;
const users = require('./users/users');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
const router = express.Router();

router.use((req, res, next) => {
	console.log('A call to the API is in progress');
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

router.get('/', (req, res) => {
	res.json({ message: 'Welcome! To our API!' });	
});

router.route('/user/:user_id')
  .get((req, res) => {
    const user = _.find(users.users, (value, index) => value.id === req.params.user_id);
		if (!user)
		  res.send('No user found!');
		res.json(user);
  });

router.route('/user/')
  .get((req, res) => {
    const user = users.users;
		if (!user)
		  res.send('No user found!');
		res.json(user);
  });

router.route('/transfer/:user_id')
  .get((req, res) => {
    const user = _.find(users.users, (value, index) => value.id === req.params.user_id);
		if (!user)
		  res.send('No user found!');
		res.json(user);
  });

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);