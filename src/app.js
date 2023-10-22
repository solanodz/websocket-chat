import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js'
import path from 'path';
import chatRouter from './routers/chat.router.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', chatRouter);

app.use((error, req, res, next) => {
    const message = `⛔ Ha ocurrido un error desconocido: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message });
})

export default app;