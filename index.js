const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    axios.get('https://api.trackany1.com/api/v1/users').then((result) => {
        res.status(200).json({
            result: result.data
        })
    })
})

const port = process.env.PORT || 8080;

app.listen(port);