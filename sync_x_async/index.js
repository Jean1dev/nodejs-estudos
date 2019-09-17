const http = require('http')
const fs = require('fs')
const f_async = require('./leitura.async')
const f_sync = require('./leitura.sync')
const arquivo = './node.exe'
const stream = fs.createWriteStream(arquivo)
const url = "http://nodejs.org/dist/v10.16.3/node-v10.16.3.pkg"
http.get(url, res => {
    console.log("Fazendo download do Node.js");

    res.on('data', data => stream.write(data))  

    res.on('end', () => {
        stream.end()
        console.log("Download finalizado!")
        f_async(arquivo)
        f_sync(arquivo)
    })
})
