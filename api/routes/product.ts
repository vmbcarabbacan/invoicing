import express from "express"
import verifyJWT from "../middleware/verifyJWT"
import product from '../controllers/productController'

const router = express.Router()

router.use(verifyJWT)

router.route('/').get(product.getProducts)
                .post(product.createProduct)

export default router