import {Request, Response, Router} from "express";
import {productsDbRepository, ProductType} from "../repositories/products-db-repository";
import {body, validationResult} from "express-validator";

export const productsRouter = Router({})

productsRouter.get('/',async (req: Request, res: Response) => {
    const foundProduct : ProductType[] = await productsDbRepository.findProducts(req.query.title?.toString());
    res.send(foundProduct)
})
productsRouter.post('/',  body('title').trim().isLength({min: 1, max: 30}).withMessage('Title length should be 1-30 symbols'),
    async(req: Request, res: Response) => {
const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const newProduct: ProductType =  await productsDbRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
    return;


})
productsRouter.get('/:id', (req: Request, res: Response) => {
    let product = productsDbRepository.findProductById(+req.params.id)
    if (product) {
        res.send(product)
        return;
    } else {
        res.send(404)
        return;
    }

})
productsRouter.delete('/:id', async(req: Request, res: Response) => {
    const isDeleted = await productsDbRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.put('/:id', async(req: Request, res: Response) => {
    const isUpdated = await productsDbRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const product = await productsDbRepository.findProductById(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})