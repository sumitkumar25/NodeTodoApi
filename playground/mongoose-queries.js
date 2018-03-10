const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/Todo');
var id = "5a9bf0f8d9f2240354da2572";
Todo.find({
    _id: id
}).then((todo) => {
    console.log('Todos', todo);
});

Todo.findOne({ _id: id })
    .then((todo) => {
        console.log('Todos', todo);
    });