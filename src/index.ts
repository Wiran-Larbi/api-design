import dotenv from 'dotenv';
dotenv.config();
import app from "./server";



app.listen(3001,() => {
    console.log('hello from http://localhost:3001');
});