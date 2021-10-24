require("dotenv").config()

const connectDb = require('./models').connectDb
const bodyParser = require('body-parser')
var cors = require('cors')
const express = require('express')
const path = require('path')


const port = process.env.PORT || 5000;
const app = express()

app.use(cors())
app.use(bodyParser.json())



const steam = require('./api/Steam.js')
app.use('/api/steam', steam)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}





connectDb().then(async () => {
    app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`),
    );
});
