import { ProductType, productTypeCollection} from "./db";



export const productsDbRepository = {
    async findProducts(title: string | undefined | null): Promise<ProductType[]> {

        if (title) {
           return await productTypeCollection.find({title: {$regex: title}}).toArray()
        } else {
             return await productTypeCollection.find().toArray()
        }
    },
    async createProduct(title: string):Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        await productTypeCollection.insertOne(newProduct)

        return newProduct
    },
    async findProductById(id: number): Promise<ProductType | null> {
        let product: ProductType | null = await productTypeCollection.findOne({id: id})
        if(product) {
            return product;
        }else {
            return null
        }
    },
    async updateProduct(id: number, title: string):Promise<boolean> {
       const result =  await productTypeCollection.updateOne({id:id},{$set:{title: title}})
      return result.matchedCount === 1
    },
    async deleteProduct(id: number): Promise<boolean> {
        const result = await productTypeCollection.deleteOne({id: id})
        return result.deletedCount === 1
        }


}