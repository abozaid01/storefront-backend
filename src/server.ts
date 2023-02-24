import express, { Application, Request, Response } from 'express';
const app: Application = express();
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middlware/error.middlware';
import config from './middlware/config';
import db from './database';
import routes from './routes';

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(
    rateLimit({
        windowMs: 24 * 60 * 3, // next request to endpoint
        max: 100, // maximal request for all endpoint
        message: 'To many request, send back request after 3 minutes',
    })
);
app.use('/api', routes);

//test database connection
db.connect()
    .then((client) => {
        return client
            .query('SELECT NOW()')
            .then((res) => {
                client.release();
                console.log(res.rows);
            })
            .catch((err) => {
                client.release();
                console.log(err.stack);
            });
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/', (req: Request, res: Response) => {
    throw new Error();
    res.send('hello');
});

//Internal errors in the server
app.use(errorMiddleware);

//NOT FOUND ROUTES
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: 'THAT IS WRONG ROUTE!!',
    });
});

const port = config.port || 3000;
app.listen(port, () => {
    console.log('listening on port 3000');
});

export default app;
