import { PrismaClient } from '@prisma/client';
import express, { Router } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get(
  '/user/:id?',
  async (req: express.Request, res: express.Response) => {
    if (req.params.id) {
      const foundUser = await prisma.user.findFirst({
        where: { id: Number(req.params.id) },
        select: { username: true, email: true, orders: true },
      });

      if (!foundUser)
        return res.status(404).send({ message: 'User not found' });

      return res.json(foundUser);
    }

    const allUsers = await prisma.user.findMany({
      select: { username: true, email: true, orders: true },
    });
    return res.json(allUsers);
  }
);

router.post('/user', async (req: express.Request, res: express.Response) => {
  const { username, password, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { username, password, email },
      select: { username: true, email: true },
    });
    return res.json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

export default router;
