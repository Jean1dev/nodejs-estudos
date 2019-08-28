const axios = require('axios');
const express = require('express')
const app = express()

const getUser = username => {
    return axios
        .get(`https://api.github.com/users/${username}`)
        .then(res => res.data)
        .catch(error => console.log(error));
}


app.get('/', function (req, res) {
    res.send('Hello World')
})

// app.listen(8080)

module.exports = {
    getUser,
    app
};