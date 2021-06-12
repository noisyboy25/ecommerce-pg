import { PrismaClient } from '@prisma/client';
import express from 'express';

const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/api/user', async (req: express.Request, res: express.Response) => {
  const allUsers = await prisma.user.findMany({
    select: { username: true, email: true, orders: true },
  });
  res.json(allUsers);
});

app.post('/api/user', async (req: express.Request, res: express.Response) => {
  const { username, password, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { username, password, email },
      select: { username: true, email: true },
    });
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({ error });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
