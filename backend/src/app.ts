import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import formularioController from "./routes/formulario/routes";

const app = express();

app.set('port',process.env.PORT || 5000);

app.use(morgan('dev')); 
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));

app.use(formularioController);

export default app;