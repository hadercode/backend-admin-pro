require('dotenv').config({ path: './environments/.env' });

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use( cors() );

app.use( express.static("public") );

//Body Parser
app.use( express.json() );

//Database Connection
dbConnection(process.env.DB_URL);

//Routes
app.use( '/api/users', require('./routes/users') );
app.use( '/api/doctors', require('./routes/doctors') );
app.use( '/api/hospitals', require('./routes/hospitals') );
app.use( '/api/auth', require('./routes/auth') );

app.use( '/api/searching', require('./routes/searching') );
app.use( '/api/upload', require('./routes/uploads') );

app.listen(process.env.port, () => {
    console.log(`Listen port: ${ process.env.port }`);
});