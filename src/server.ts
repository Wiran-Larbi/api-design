import express from 'express';
import router from './routes';

const app = express();


app.get('/', (req,res) => {
        res.status(200);
        res.json({message: 'hello from express 😊'});
});
export default app;