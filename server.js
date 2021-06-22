const express = require('express');
const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.static(__dirname + '/dist/angular-material-base'));

app.get('/*',(req,res) => {
    res.sendFile(__dirname + '/dist/angular-mateial-base/index.html')
});

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta ' + PORT);
})