
Timothy

Install Dependencies,


npm init

git ad

npm i nodemon -D

create folders and basic files

For Example, 
Files: Index.js, server.js
Folders: 

		* 
index.js
		* 
server.js
	* 
Data

		* 
seeds
		* 
migrations(Will be created when you run the knex migrate:make command)
		* 
db-config.js
	* 
users

		* 
usersHelpers.js
		* 
usersRouter.js
	* 
auth

		* 
restricted-middleware.js




knex init (To create the knex file)

Example Code: for knexfile.js


module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/auth.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};

Example Code: for index.js


const server = require('./server.js');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

Example Code: for server.js


const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const UsersRouter = require('./users/usersRouter.js');  //This should route to whatever Route you are setting

const server = express();

server.use(cors())
server.user(helmet())
server.use(express.json());
server.use('/api/users', UsersRouter);

module.exports = server;

Using these templates are an example of setting up the routing for one file so far.
And they route to users-router.js

Example Code: usersRouter.js


const express = require('express');
const Users = require('./usersHelpers');
const router = express.Router();
const bcrypt = require('bcryptjs');
const restricted = require('../auth/restricted-middleware');

router.post('/register', (req, res) => {
    let { username, password } = req.body;

    const hash = bcrypt.hashSync(password, 8); // it's 2 ^ 8, not 8 rounds

    Users.add({ username, password: hash })
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: 'You cannot pass!' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/api/users', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

router.get('/hash', (req, res) => {
    const name = req.query.name;

    // hash the name
    const hash = bcrypt.hashSync(name, 8); // use bcryptjs to hash the name
    res.send(`the hash for ${name} is ${hash}`);
});

module.exports = router;

Example Code: usersHelpers.js


const db = require('../data/db-config');

module.exports = {
    add,
    find,
    findBy,
    findById,
};

function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users').where(filter);
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

Example Code: db-config.js


const knex = require('knex');

const config = require('../knexfile.js');

module.exports = knex(config.development);

Example Code: restricted-middleware.js


const bcrypt = require('bcryptjs');

const Users = require('../users/usersHelpers');

module.exports = (req, res, next) => {
    let { username, password } = req.headers;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                next();
            } else {
                res.status(401).json({ message: 'You cannot pass!' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

function fetch() {
    const reqOptions = {
        headers: {
            username: '',
            password: '',
        },
    };

    // axios.get(url, reqOptions).the().catch()
    // axios.post(url, data, reqOptions).the().catch()
}

Now you need to create the migration folder with the following command:


knex migrate:make users

Now you will want to build the schema for your database, for this example I will be building out a simple user loggin system so I need the following elements in the table username and password, and a key


exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users.string('username', 128).notNullable().unique();
        users.string('password', 128).notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};

Check to make sure that you have a script set up to start the server using nodemon, it should look like this...


"scripts": {
    "server": "nodemon index.js"
  },

And then type the command


npm run server

To start the server.