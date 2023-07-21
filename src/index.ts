import dotenv from 'dotenv';
dotenv.config();
import app from "./server";
import config from './config'


console.log(config.port);
app.listen(config.port,() => {
    console.log(`hello from http://localhost:${config.port}`);
});