module.exports = (app) => {
    let ChatController = {
        index: (req, res) => {
            let resultado = { email: req.params.email }
            res.render(`chat/index`)
        }
    }

    return ChatController
}