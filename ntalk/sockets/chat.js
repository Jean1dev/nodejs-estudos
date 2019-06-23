module.exports = io => {
    let crypto = require(`crypto`)
        , md5 = crypto.createHash(`md5`)
        , sockets = io.sockets

    sockets.on(`connection`, client => {
        let session = client.handshake.session
        let usuario = session.usuario

        client.set(`email`, usuario.email)
        let online = sockets.clients()

        online.forEach(element => {
            let on = sockets.sockets[element.id]    
            on.get(`email`, (err, email) => {
                client.emit(`notify-onlines`, email)
                client.broadcast.emit(`notify-onlines`, email)
            })
        })

        client.on(`join`, sala => {
            if(sala){
                sala = sala.replace(`?`, ``)
            }else{
                let timestamp = new Date().toString()
                let md5 = crypto.createHash(`md5`)
                sala = md5.update(timestamp).digest(`hex`)
            }
            client.set(`sala`, sala)
            client.join(sala)
        })

        client.on(`disconnect`, () => {
            client.get(`sala`, (erro, sala) => {
                let msg = `<b>${usuario.nome}</b> saiu <br>`
                client.broadcast.emit(`notify-offline`, usuario.email)
                sockets.in(sala).emit(`send-client`, msg)
                client.leave(sala)
            })
        })

        client.on(`send-server`, msg => {
            msg = `<b>${usuario.nome}:</b> ${msg}<br>`
            client.get(`sala`, (erro, sala) => {
                let data = { email: usuario.email, sala }
                client.emit(`send-client`, data)
                client.broadcast.emit(`send-client`, data)
                sockets.in(sala).emit(`send-client`, msg)
            })
        })
    })
}