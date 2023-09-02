import { Request, Response } from 'express'
import { Product, IProduct } from '../models/products'
import { Queries, Fitlers } from '../types'
import { isEmpty, bodyWithId, pages, paginatedData, updateName, addSlug } from '../services/'

export const getProducts = async(req: Request, res: Response) => {
    const { per_page, indexStart } = await pages(req)

    let query = <Queries>{}

    if(req.query.qn) query.name = <Fitlers>{ $regex: req.query.qn, $options: 'i' }

    paginatedData(res, Product, query, per_page, indexStart)
}

export const getProduct = async(req: Request, res: Response) => {
    try {
        if(!req.params.id) res.status(400).json({ message: 'Id is required' })

        const exist = await Product.findById(req.params.id)
        if(!exist) return res.status(400).json({ message: 'Not found' })

        res.status(200).json({ data: exist })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const createProduct = async(req: Request, res: Response) => {
    try {
        const { name, id } = req.body

        const productObj = <IProduct>{
            name: name.toLowerCase()
        }
        if(await isEmpty(Object.values(productObj))) return res.status(400).json({message: 'Name must not be empty'})
        
        if(!id) {
            const exist = await Product.find(productObj)
            if(exist.length > 0) return res.status(400).json({ message: 'Name was already taken' })
        }
    
        Object.entries(req.body).forEach(([key, value]) => {
            productObj[key] = value
        })

        productObj['slug'] = addSlug(productObj.name)

        if(!productObj.brand) delete productObj.brand
        if(!productObj.category) delete productObj.category
        if(!productObj.sub_category) delete productObj.sub_category
        if(!productObj.id) delete productObj.id

        if(id) {
            const exist = await Product.findById(id)
            if(!exist) res.status(400).json({ message: 'Product not found' })
            const nameExist = await Product.find({ _id: { $ne: id } }).byName(name.toLowerCase())
            if(nameExist.length > 0) return res.status(400).json({ message: 'Name was already taken' })

            delete productObj._id
            delete productObj.id
            await Product.findByIdAndUpdate(id, productObj)

            const data = await Product.findById(id)
            return res.status(200).json({ data })
        }
        
        const product = await Product.create(productObj)
        res.status(200).json({data: product})
    } catch (error) {
        res.status(400).json({error})
    }
}

let product = {
    getProducts,
    getProduct,
    createProduct
}

export default product
