var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var { ObjectID } = require('mongodb');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/Todo');
var { User } = require('./models/User');
var app = express();
app.use(bodyParser.json())
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    });
    console.log(req.body);
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (error) => {
        res.status(400).send('Not Found')
    });
})
app.get('/todos/:id', (req, res) => {
    var id = req.params["id"];
    if (ObjectID.isValid(id)) {
        Todo.findById({
            id: id
        }).then((todos) => {
            res.send({ todos });
        }, (error) => {
            res.status(400).send('Not Found')
        }).catch((error) => {
            res.status(400).send('Not Found')
        })
    } else {
        res.status(404).send();
    }
});
app.delete('/todos/:id', (req, res) => {
    var id = req.params["id"];
    if (ObjectID.isValid(id)) {
        Todo.findByIdAndRemove({
            id: id
        }).then((todo) => {
            res.send({ todo });
        }, (error) => {
            res.status(400).send('Not Found')
        }).catch((error) => {
            res.status(400).send('Not Found')
        })
    } else {
        res.status(404).send();
    }
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params["id"];
    var body = _.pick(req.body, ['text', 'completed']);
    if (ObjectID.isValid(id)) {
        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completedAt = null;
            body.completed = false;
        }
        Todo.findByIdAndUpdate(
            id, {
                $set: body
            }, {
                new: true
            }
        ).then((todo) => {
            res.send({ todo });
        }, (error) => {
            res.status(400).send('Not Found')
        }).catch((error) => {
            res.status(400).send('Not Found')
        });
    } else {
        res.status(404).send();
    }
});
app.listen(3000, () => {
    console.log('started on port 3000');
});
module.exports = { app };