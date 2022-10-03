const app = require('./config/express')();
const cors = require('cors');
const port = app.get('port');


app.use(cors({origin:true}))

// Rodando nossa aplicação na porta setada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});
