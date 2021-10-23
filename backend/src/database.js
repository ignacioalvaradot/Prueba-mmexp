//Instanciar conexion mongoDB
const mongoose = require('mongoose');

// const URI = process.env.MONGODB_URI;
//cambiar para mongo
const URI = 'mongodb://localhost/mongodatabase';
// const URI = 'mongodb://mongodatabase';

//parametros de conexion
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//cuando la conexion se abra, se ejecutara el print
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
})