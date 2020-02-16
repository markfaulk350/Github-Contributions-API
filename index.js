const express = require('express');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Github User Stats Web Scraper Home Route'
    })
})

app.get('/github-user-stats/:username', (req, res) => {
    let { username } = req.params;

    axios.get(`https://github.com/${username}`).then((result) => {
        const $ = cheerio.load(result.data);

        let days = [];
        let num_of_commits_this_year = 0;

        const github_username = $('.p-nickname').text();
        const full_name = $('.p-name').text();

        const calendarGraph = $('.js-calendar-graph-svg').children('g').children('g');

        calendarGraph.each((i, el) => {

            $(el).find('rect').each((k, elem) => {
                // let fill = $(elem).attr('fill');
                let count = parseInt($(elem).attr('data-count'));
                let date = $(elem).attr('data-date');

                days.push({
                    count,
                    date
                });

                num_of_commits_this_year += count;
            });
        });

        // console.log(calendarGraph.html())

        res.status(200).json({
            github_username,
            full_name,
            num_of_commits_this_year,
            days
        });

    }).catch((e) => {
        // console.log(e);
        res.status(500).json({
            message: 'Something went wrong with Github user stats Web Scraper!',
            error: e
        });
    });
});


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`API running on port: ${port}`));