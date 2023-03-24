"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRepository = void 0;
const products = [{ id: 1, title: 'tomato' },
    { id: 2, title: 'orange' },
    { id: 3, title: 'banana' }];
exports.productsRepository = {
    findProducts(title) {
        if (title) {
            let filteredProduct = (products.filter(p => p.title.indexOf(title) > -1));
            return filteredProduct;
        }
        else {
            return products;
        }
    },
    createProduct(title) {
        const newProduct = {
            id: +(new Date()),
            title: title
        };
        products.push(newProduct);
        return newProduct;
    },
    findProductById(id) {
        let product = products.find(p => p.id === id);
        return product;
    },
    updateProduct(id, title) {
        let product = products.find(p => p.id === id);
        if (product) {
            product.title = title;
            return true;
        }
        else {
            return false;
        }
    },
    deleteProduct(id) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};
