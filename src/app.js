import express from 'express';
import { urlRouter } from './routes/urls.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', urlRouter);


app.listen(
    PORT, () => console.log(`it's alive on http://localhost:${PORT}`)
)
