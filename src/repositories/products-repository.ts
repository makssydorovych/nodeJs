export type ProductType = {
        id: number,
        title: string
    }
const products = [{id: 1, title: 'tomato'},
    {id: 2, title: 'orange'},
    {id: 3, title: 'banana'}]
export const productsRepository = {
    async findProducts(title: string | undefined | null): Promise<ProductType[]> {
        if (title) {
            return (products.filter(p => p.title.indexOf(title) > -1));
        } else {
            return products;
        }
    },
    async createProduct(title: string):Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        products.push(newProduct)
        return newProduct
    },
    findProductById(id: number) {
        let product = products.find(p => p.id === id)
        return product;
    },
   async updateProduct(id: number, title: string):Promise<boolean> {
        let product = products.find(p => p.id === id)
        if (product) {
            product.title = title
            return true;
        } else {
            return false;
        }
    },
    deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}