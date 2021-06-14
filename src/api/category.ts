import { PrismaClient } from '@prisma/client';
import express, { Router } from 'express';

const prisma = new PrismaClient();
const categoryRouter = Router();

categoryRouter.get(
  '/:id?',
  async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    if (id) {
      const foundCategory = await prisma.category.findUnique({
        where: { id },
        include: { specNames: true },
      });

      if (!foundCategory)
        return res.status(404).send({ message: 'Category not found' });

      return res.json(foundCategory);
    }

    const allCategories = await prisma.category.findMany({
      include: { specNames: true },
    });
    return res.json({ categories: allCategories });
  }
);

categoryRouter.post(
  '/',
  async (req: express.Request, res: express.Response) => {
    const { name } = req.body;

    try {
      const newCategory = await prisma.category.create({
        data: { name },
      });
      return res.json(newCategory);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }
);

categoryRouter.patch(
  '/:id',
  async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    const foundCategory = await prisma.category.findUnique({ where: { id } });
    if (!foundCategory)
      return res.status(404).send({ message: 'Category not found' });
    try {
      await prisma.category.update({
        where: { id },
        data: { name },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }
);

categoryRouter.post(
  '/:id/spec-name',
  async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    const foundCategory = await prisma.category.findUnique({ where: { id } });

    if (!foundCategory)
      return res.status(404).send({ message: 'Category not found' });

    try {
      const category = await prisma.category.update({
        where: { id },
        data: { specNames: { create: { name } } },
        include: { specNames: true },
      });
      return res.json(category);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }
);

categoryRouter.delete(
  '/:id/spec-name/:specNameId',
  async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    const specNameId = Number(req.params.specNameId);

    try {
      const category = await prisma.category.update({
        where: { id },
        data: { specNames: { delete: { id: specNameId } } },
        include: { specNames: true },
      });
      return res.json(category);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }
);

categoryRouter.delete(
  '/:id',
  async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    try {
      await prisma.category.delete({ where: { id } });
      return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

export default categoryRouter;
