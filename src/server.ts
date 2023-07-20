import express from 'express';
import router from './routes';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';
import { errorHandler } from './handlers/errors';


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
        // res.status(200);
        // res.json({message: 'hello from express 😊'});
        //? Synchronous Error ..
        // next(new Error("Just Kidding 😘"));
        //? Asynchronous Error ..
        setTimeout(() => {
                next(new Error("Async Just Kidding 😘"));
        }) 
});

app.use('/api',[protect,router]);

app.post('/user',createNewUser);
app.post('/signin',signin);

app.use(errorHandler);

export default app;