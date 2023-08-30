import express from "express"
import { getTypes, getRoles, getStatuses } from '../controllers/masterController'
import verifyJWT from "../middleware/verifyJWT"

const router = express.Router()

router.use(verifyJWT)

const myRoutes = [
    { name: '/types', func: getTypes },
    { name: '/roles', func: getRoles },
    { name: '/statuses', func: getStatuses },
]

for (const route of myRoutes) {
    router.route(route.name).get(route.func)
}


export default router