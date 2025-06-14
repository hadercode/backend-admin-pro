require('dotenv').config({ path: './environments/.env' });

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use( cors() );

//Database Connection
dbConnection(process.env.DB_URL);

app.get('/', ( req, res) =>{
    res.json({
        ok: true,
        message: "Hola mundo!"
    })
})

app.listen(process.env.port, () => {
    console.log(`Listen port: ${ process.env.port }`);
});