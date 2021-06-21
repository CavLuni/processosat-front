const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.static(__dirname + '/satselection-front/src'));

app.get('/*',(req,res) => {
    res.sendFile(__dirname + '/satselection-front/src/index.html/')
});

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta ' + PORT);
})