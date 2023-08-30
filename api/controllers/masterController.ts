import { Request, Response } from 'express'
import { types, roles, statuses } from "../utils/constant"

const getTypes = (req: Request, res: Response) => {
    res.status(200).json({ data: types })
}

const getRoles = (req: Request, res: Response) => {
    res.status(200).json({ data: roles })
}

const getStatuses = (req: Request, res: Response) => {
    res.status(200).json({ data: statuses })
}

export {
    getTypes,
    getRoles,
    getStatuses
}