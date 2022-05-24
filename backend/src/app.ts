import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import formularioController from "./routes/formulario/routes";
import hospitalController from "./routes/hospital/routes";
import insumosController from "./routes/insumos/routes";

const app = express();

app.set('port',process.env.PORT || 5000);

app.use(morgan('dev')); 
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));

app.use(formularioController);
app.use(hospitalController);
app.use(insumosController);

export default app;