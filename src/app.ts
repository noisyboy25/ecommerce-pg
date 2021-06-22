import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import categoryRouter from './api/category';
import productRouter from './api/product';
import userRouter from './api/user';

const PORT = process.env.PORT || 5000;
const app = express();

const jsonErrorHandler: ErrorRequestHandler = (
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(500).json({ error });
};
app.use(express.static(path.resolve('client', 'build')));

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
});

app.use(jsonErrorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
