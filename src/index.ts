import express from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/adresses-router";
import {RunDb} from "./repositories/db"
const app = express()
const port = process.env.PROT || 5000


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)
// app.listen(port, () => {
//     console.log(`kkkkkk${port}`)
// })
const startApp = async()=>{
    await RunDb()
    app.listen(port, ()=>{
        console.log('LOG')
    })
}
startApp();