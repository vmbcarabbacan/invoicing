import express from "express"
import misc from '../controllers/miscController'
import verifyJWT from "../middleware/verifyJWT"

const router = express.Router()

router.use(verifyJWT)

router.route('/categories').get(misc.getCategories)
router.route('/category').patch(misc.updateCategory)
                        .post(misc.createCategory)
                        
router.route('/attributes').get(misc.getAttributes)
router.route('/attribute').patch(misc.updateAttribute)
                        .post(misc.createAttribute)

router.route('/categories/sub').get(misc.getSubCategories)
router.route('/category/sub').patch(misc.updateSubCategory)
                            .post(misc.createSubCategory)

router.route('/brands').get(misc.getBrands)
router.route('/brand').patch(misc.updateBrand)
                    .post(misc.createBrand)

router.route('/tags').get(misc.getTags)
router.route('/tag').patch(misc.updateTag)
                    .post(misc.createTag)

router.route('/category/:id').get(misc.getCategory)
router.route('/attribute/:id').get(misc.getAttribute)
router.route('/category/sub/:id').get(misc.getSubCategory)
router.route('/tag/:id').get(misc.getTag)
router.route('/brand/:id').get(misc.getBrand)


export default router