const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';
MongoClient.connect(url, function(err, client) {
    const todos = client.db(dbName).collection('Todos');
    const users = client.db(dbName).collection('Users');
    todos.insert({
        todoA: 'todoA title'
    }, function(err, result) {
        if (err) {
            return console.log('error', err);
        }
        console.log('success insert', result);
    });
    users.insert({
        todoA: 'todoA title'
    }, function(err, result) {
        if (err) {
            return console.log('error', err);
        }
        console.log('success insert', result);
    });
});