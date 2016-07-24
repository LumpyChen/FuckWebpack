/**
 * Created by Lumpychen on 16/3/11.
 */
const express = require('express'),
      path = require('path')

const webpack = require('webpack');

const PORT = process.env.port || 5000;

var config = require('./webpack.config');

var app = express();

app.use(express.static(path.resolve('dist')));

app.use('/static/bundle.js', function (req, res) {
    res.redirect('/bundle.js');
});

app.use('/', function (req, res) {
    res.sendFile(path.resolve('./index.html'));
});

app.listen(PORT, function(error) {
    if(error) throw error;
    webpack(config, (err, stats) => {
        if (err) throw error;
        console.log("It's product mode now");
        console.log(`Listening at localhost:${PORT}`);
        console.log(`bundle at ${config.output.path}${config.output.publicPath}`);
    });
});


