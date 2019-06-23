module.exports = (app) => {
    let chat = app.controllers.chat
    app.get(`/chat/:email`, chat.index)
}