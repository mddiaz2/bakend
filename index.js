//declaraciones
//despendecias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
const morgan = require('morgan')

const app = express();
//const router= express.router();
//rutas
const userRoutes = require('./rutas/usuario');
const dimensionRoutes = require('./rutas/dimension');
const subdimensionRoutes = require('./rutas/subdimension');
const elementoRoutes = require('./rutas/elemento');
const metricaRoutes = require('./rutas/metrica');
const recomendacionRoutes = require('./rutas/recomendacion');
const cuestionarioRoutes = require('./rutas/cuestionario');
const preguntaRoutes = require('./rutas/pregunta');
const reporteRoutes = require('./rutas/resporte');



//Middlewares
//CORS
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.json());

//Rutas
/* app.post('/', function(req, res) {
    res.send('hello world');
});
 */
app.use('/api', userRoutes);
app.use('/api', dimensionRoutes );
app.use('/api', subdimensionRoutes);
app.use('/api', elementoRoutes);
app.use('/api', metricaRoutes);
app.use('/api', recomendacionRoutes);
app.use('/api', cuestionarioRoutes);
app.use('/api', preguntaRoutes);
app.use('/api', reporteRoutes);

//mongodb
async function main(db_url) {
    await mongoose.connect(db_url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
}
// Set up mongoose connection
//const db_url = 'mongodb://root:root@localhost:27017/desarrollo';
const db_url = 'mongodb+srv://root:root@cluster0.ukezf.mongodb.net/desarrollo?retryWrites=true&w=majority';
const port = process.env.PORT || 3000;

main(db_url).then(()=>{
    console.log('Conectado a MongoDB exitosamente ');
    
    app.listen(port, () => {
        console.log('Server is up and running http://127.0.0.1:'+port);
    });
}).catch(err => console.log(err));








