var express = require("express"),
    app = express(),
    http = require("http").Server(app),
    io = require("socket.io")(http),
    Log = require("log"),
    log = new Log('debug'),
    port = process.env.PORT || 8080;

app.use('/static', express.static(__dirname + "/static"));

app.set('views', __dirname + "/views");
app.set('view engine', "pug");

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/emitir', (req, res) => {
    res.render("emitir")
})

app.get('/visualizar', (req, res) => {
    res.render("visualizar")
})

io.on('connection', (socket) => {
    socket.on('stream', (image) => {
        socket.broadcast.emit('stream', image)
    })
})

http.listen(port, () => {
    log.info(`Servidor corriendo en el puerto ${port}`);
});