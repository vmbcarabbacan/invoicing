import express from "express"
import expressLimit from "../middleware/expressLimit"
import { login, register, refreshToken, logout } from '../controllers/authController'

const router = express.Router()

router.route('/refresh').get(refreshToken)
router.route('/logout').get(logout)
router.route('/').post([expressLimit], login)
router.route('/register').post(register)

export default router