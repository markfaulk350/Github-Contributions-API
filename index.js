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

    // We can send JSON for normal applications where memory is not an issue 
    // and a string with values seperated by commmas for arduino
    let { format, weeks } = req.query;


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

        if (format === 'json' || format === undefined) {
            res.status(200).json({
                github_username,
                full_name,
                num_of_commits_this_year,
                days
            });
        } else if (format === 'string') {
            // Send all values in text form seperated by commas
            let stringResponse = `${github_username},${full_name},${num_of_commits_this_year},`;

            if (weeks === undefined || parseInt(weeks) >= 52 || parseInt(weeks) <= 0) {
                for (let i = days.length; i > 0; i--) {
                    // stringResponse = stringResponse + `${days[i - 1].count},${days[i - 1].date},`;
                    stringResponse = stringResponse + `${days[i - 1].count},`;
                }
            } else {
                for (let i = days.length; i > (365 - (parseInt(weeks) * 7)); i--) {
                    // stringResponse = stringResponse + `${days[i - 1].count},${days[i - 1].date},`;
                    stringResponse = stringResponse + `${days[i - 1].count},`;
                }
            }

            res.status(200).send(stringResponse);
        }
    }).catch((e) => {
        console.log(e);
        res.status(500).json({
            message: 'Something went wrong with Github user stats Web Scraper!',
            error: e
        });
    });
});


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`API running on port: ${port}`));