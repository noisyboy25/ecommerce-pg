import { PrismaClient } from '@prisma/client';
import express, { Router } from 'express';

const prisma = new PrismaClient();
const userRouter = Router();

userRouter.get('/:id?', async (req: express.Request, res: express.Response) => {
  const id = Number(req.params.id);
  if (id) {
    const foundUser = await prisma.user.findUnique({
      where: { id },
      select: { username: true, email: true, orders: true },
    });

    if (!foundUser) return res.status(404).send({ message: 'User not found' });

    return res.json(foundUser);
  }

  const allUsers = await prisma.user.findMany({
    select: { username: true, email: true, orders: true },
  });
  return res.json({ users: allUsers });
});

userRouter.post('/', async (req: express.Request, res: express.Response) => {
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

userRouter.patch(
  '/:id',
  async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    const { password, newPassword, newEmail } = req.body;

    const foundUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!foundUser) return res.status(404).json({ message: 'User not found' });
    if (foundUser.password !== password)
      return res.status(401).json({ message: 'User not authorized' });

    if (newEmail) {
      await prisma.user.update({ where: { id }, data: { email: newEmail } });
      return res.json({ message: 'Email changed successfully' });
    }

    if (newPassword) {
      await prisma.user.update({
        where: { id },
        data: { password: newPassword },
      });
      return res.json({ message: 'Password changed successfully' });
    }

    return res.status(400).json({ message: 'Bad request' });
  }
);

export default userRouter;
