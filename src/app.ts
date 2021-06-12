import express from 'express';
import router from './api';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
