require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: "Please work!"
//     })
// })

axios.get('https://github.com/markfaulk350').then((res) => {
    const $ = cheerio.load(res.data);

    // const name = $('.p-name');
    // console.log(name.html());
    // console.log(name.text());
    // or
    // console.log($('.p-name').html());
    // console.log($('.p-nickname').text()); // We can use text or html

    const calendarGraph = $('.js-calendar-graph-svg').children('g');

    console.log(calendarGraph.html())


});

const port = process.env.PORT || 8080;

app.listen(port);