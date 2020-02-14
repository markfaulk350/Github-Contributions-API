require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
// const gh = require('./github');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Please work!"
    })
})

// app.get('/', async (req, res) => {
//     try {
//         await gh.init();

//         await gh.goToUsersGithub('markfaulk350');

//         res.status(200).json({
//             result: "result"
//         })
//     } catch (e) {
//         console.log(e)
//     }
// })

const port = process.env.PORT || 8080;

app.listen(port);