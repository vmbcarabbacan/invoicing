import express from "express"
import variable from '../controllers/variableController'
import verifyJWT from "../middleware/verifyJWT"

const router = express.Router()

router.use(verifyJWT)

router.route('/').get(variable.getVariables)
                .patch(variable.updateVariable)
                .post(variable.createVariable)
router.route('/option/').get(variable.getVariableOptions)
                    .patch(variable.updateVariableOption)
                    .post(variable.createVariableOption)

router.route('/:id').get(variable.getVariable)
router.route('/option/:id').get(variable.getVariableOption)



export default router