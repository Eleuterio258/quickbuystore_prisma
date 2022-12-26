import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { Router, Request, Response } from 'express';

const app = express();

const route = Router()

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
})

route.get('/products', async (req: Request, res: Response) => {
  const products = await prisma.products.findMany()
  res.json(products)
});

route.get('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await prisma.products.findUnique({
    where: {
      id: Number(id)
    }
  })
  res.json(product)
});

// search by name

route.get('/products/search/:name', async (req: Request, res: Response) => {
  const { name } = req.params
  const product = await prisma.products.findMany({
    where: {
      name: {
        contains: name,
      }
    }
  })
  res.json(product)
})

//get products by category

route.get('/products/category/:category', async (req: Request, res: Response) => {
  const { category } = req.params
  const product = await prisma.products.findMany({
    
  })
})



app.use(route)


app.listen(3333, () => {
  console.log('Server is running')
})