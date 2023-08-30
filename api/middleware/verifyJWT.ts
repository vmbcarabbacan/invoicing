import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { Owner, IOwner } from '../models/owners'
import DB from '../server'

require('dotenv').config(); 

const { ACCESS_TOKEN_SECRET, MONGO_CONNECTION } = process.env

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' })

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.email = decoded.email
            req.role = decoded.role
            req.owner = decoded.owner
            const owner = <IOwner> await Owner.findById(req.owner)
            const database = `${MONGO_CONNECTION}${owner.database}`
            DB(database)
            next()
        }
    )
}

export default verifyJWT

