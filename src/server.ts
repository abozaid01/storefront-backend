import express, { Application, Request, Response } from 'express';
const app: Application = express();
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

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

app.get('/', (req: Request, res: Response) => {
    res.send('hello');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('listening on port 3000');
});

export default app;
