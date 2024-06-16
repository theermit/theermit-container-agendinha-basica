const express = require('express');
const cors = require('cors');
const  path = require('path');
const app = new express();

app.use(cors());

/*
const corsOptions = {
    origin: 'http://frontend:80', //substitua pela porta do seu frontend
    optionsSucessStatus: 200
};

app.use(cors(corsOptions));
*/

const port = 80;

//configurar body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//serve os arquivos estáticos da pasta dist do vue.js
app.use(express.static(path.join(__dirname, '/dist')));

app.use(bodyParser.urlencoded({ extended: false }));


//routes
const router = require("./routes/route");
app.use('/api',router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});


app.listen(port, () => {
    console.log(`app escutando na porta ${port}`);
});