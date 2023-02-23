import express, { Application, Request, Response } from 'express';
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send('hello');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('listening on port 3000');
});

export default app;
