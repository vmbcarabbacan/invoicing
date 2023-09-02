import express from "express"
import verifyJWT from "../middleware/verifyJWT"
import product from '../controllers/productController'

const router = express.Router()

router.use(verifyJWT)

router.route('/').get(product.getProducts)
                .post(product.createProduct)
                .patch(product.createProduct)

router.route('/:id').get(product.getProduct)

export default router