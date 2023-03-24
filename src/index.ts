import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routes/products-router";
const app = express()
const port = process.env.PROT || 5000


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)



app.use('/products', productsRouter)
app.listen(port, () => {
    console.log(`kkkkkk${port}`)
})