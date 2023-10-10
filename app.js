const express = require("express");
const env = require("dotenv");
const http = require("http");
const logger = require('morgan');
const path = require("path");
const cors = require('cors');
const handle404Middleware = require("./middlewares/handle-404.middleware");
const routeProvider = require("./config/routes.config");

const app = express();

env.config();

const server = http.createServer(app);



/**
 * Initialize the database
 */
const db = require("./config/database.config")();

// connect db


if (process.env.NODE_ENV !== "test") {
    app.use(logger('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend-build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(routeProvider());

app.use("*", (req, res) => {

    var options = {
        root: path.join(__dirname)
    };

    var fileName = 'frontend-build/index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

const port = process.env.OVERRIDE_PORT ?? (process.env.PORT || 4000);

module.exports = [server, app];