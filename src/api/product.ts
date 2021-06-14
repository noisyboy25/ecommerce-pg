import { PrismaClient } from '@prisma/client';
import express, { Router } from 'express';

const prisma = new PrismaClient();
const productRouter = Router();

productRouter.get(
  '/:id?',
  async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    if (id) {
      const foundProduct = await prisma.product.findUnique({
        where: { id },
        include: { category: true, specs: true },
      });

      if (!foundProduct)
        return res.status(404).send({ message: 'Product not found' });

      return res.json(foundProduct);
    }

    const allProducts = await prisma.product.findMany({
      include: { category: true, specs: true },
    });
    return res.json({ products: allProducts });
  }
);

productRouter.post('/', async (req: express.Request, res: express.Response) => {
  const { name, price, categoryId } = req.body;
  if (!categoryId)
    return res.status(400).json({ message: 'Category not specified' });

  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category)
      return res.status(404).json({ message: 'Category not found' });

    const newProduct = await prisma.product.create({
      data: { name, price, category: { connect: { id: categoryId } } },
    });
    return res.json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

export default productRouter;
