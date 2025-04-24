import express from 'express';
import constituentsRouter from './routes/constituent';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // <-- This line is critical

app.use('/constituents', constituentsRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});