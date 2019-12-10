// const config = require('./config')
const { Client } = require('pg')

const tablesNames = []

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'jeanfernandes',
    password: 'admin',
    database: 'goBarber'
})

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})