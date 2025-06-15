require('dotenv').config({ path: './environments/.env' });

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use( cors() );

//Body Parser
app.use( express.json() );

//Database Connection
dbConnection(process.env.DB_URL);

//Routes
app.use( '/api/users', require('./routes/users') );
app.use( '/api/auth', require('./routes/auth') );

app.listen(process.env.port, () => {
    console.log(`Listen port: ${ process.env.port }`);
});