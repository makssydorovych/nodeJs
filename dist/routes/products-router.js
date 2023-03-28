"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_repository_1 = require("../repositories/products-repository");
const express_validator_1 = require("express-validator");
exports.productsRouter = (0, express_1.Router)({});
exports.productsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const foundProduct = yield products_repository_1.productsRepository.findProducts((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    res.send(foundProduct);
}));
exports.productsRouter.post('/', (0, express_validator_1.body)('title').trim().isLength({ min: 1, max: 30 }).withMessage('Title length should be 1-30 symbols'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newProduct = yield products_repository_1.productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
    return;
}));
exports.productsRouter.get('/:id', (req, res) => {
    let product = products_repository_1.productsRepository.findProductById(+req.params.id);
    if (product) {
        res.send(product);
        return;
    }
    else {
        res.send(404);
        return;
    }
});
exports.productsRouter.delete('/:id', (req, res) => {
    const isDeleted = products_repository_1.productsRepository.deleteProduct(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.sendStatus(404);
    }
});
exports.productsRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield products_repository_1.productsRepository.updateProduct(+req.params.id, req.body.title);
    if (isUpdated) {
        const product = products_repository_1.productsRepository.findProductById(+req.params.id);
        res.send(product);
    }
    else {
        res.send(404);
    }
}));
