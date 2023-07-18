import express from 'express';
import router from './routes';
import morgan from 'morgan';
import cors from 'cors';


const app = express();

// ? MiddleWares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use((req,res,next) => {
//         req.params = {"secret": "Dog"};
//         res.status(404);
// })

app.get('/', (req,res,next) => {
        res.status(200);
        res.json({message: 'hello from express 😊'});
});

app.use('/api',router);

export default app;