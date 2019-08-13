const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

//get to accounts
server.get('/', (req, res) => {
  db('accounts')
    .then(accts => {
      res.status(200).json(accts);
    })
    .catch(err => {
      res.status(500).json({ message: 'error' });
    });
});

// Get one account
server.get('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({ message: 'error getting the account from db' });
    });
});

// Add account
server.post('/', (req, res) => {
  const account = req.body;
  // validate the the account data is correct before saving to the db
  db('accounts')
    .insert(account, 'id')
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({ message: 'error saving the account to the db' });
    });
});

// Update account
server.put('/:id', (req, res) => {
  const changes = req.body;

  db('accounts')
    .where('id', '=', req.params.id)
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'error updating the account' });
    });
});

// Delete Account
server.delete('/:id', (req, res) => {
  db('accounts')
    .where('id', '=', req.params.id)
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'error removing the account' });
    });
});

module.exports = server;
