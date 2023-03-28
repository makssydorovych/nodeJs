import {Request, Response, Router} from "express";
import {productsRepository, ProductType} from "../repositories/products-in-memory-repository";
import {body, validationResult} from "express-validator";

export const productsRouter = Router({})

productsRouter.get('/',async (req: Request, res: Response) => {
    const foundProduct : ProductType[] = await productsRepository.findProducts(req.query.title?.toString());
    res.send(foundProduct)
})
productsRouter.post('/',  body('title').trim().isLength({min: 1, max: 30}).withMessage('Title length should be 1-30 symbols'),
    async(req: Request, res: Response) => {
const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const newProduct: ProductType =  await productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
    return;


})
productsRouter.get('/:id', (req: Request, res: Response) => {
    let product = productsRepository.findProductById(+req.params.id)
    if (product) {
        res.send(product)
        return;
    } else {
        res.send(404)
        return;
    }

})
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.put('/:id', async(req: Request, res: Response) => {
    const isUpdated = await productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const product = productsRepository.findProductById(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})