const express = require('express');
const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.static(__dirname + '/dist/angular-material-base'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
  

app.get('/*',(req,res) => {
    res.sendFile(__dirname + '/dist/angular-mateial-base/index.html')
});

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta ' + PORT);
})