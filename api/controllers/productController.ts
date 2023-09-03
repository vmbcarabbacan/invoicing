import { Request, Response } from 'express'
import { Product, IProduct } from '../models/products'
import { ProductSku, IProductSku } from '../models/productSkus'
import { Queries, Fitlers, DefData } from '../types'
import { isEmpty, bodyWithId, pages, paginatedData, randomString, addSlug } from '../services/'
import mongoose from 'mongoose'

export const getProducts = async(req: Request, res: Response) => {
    const { per_page, indexStart } = await pages(req)

    let query = <Queries>{}

    if(req.query.qn) query.name = <Fitlers>{ $regex: req.query.qn, $options: 'i' }

    paginatedData(res, Product, query, per_page, indexStart)
}

export const getProduct = async(req: Request, res: Response) => {
    try {
        if(!req.params.id) res.status(400).json({ message: 'Id is required' })

        const product = await Product.findById(req.params.id)
        const exist = await getProductQuery(product._id, product.is_variable, true)
        
        if(!exist) return res.status(400).json({ message: 'Not found' })
        res.status(200).json({ data: exist })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const createProduct = async(req: Request, res: Response) => {
    try {
        const { name, id, skus, is_variable } = req.body

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

            const product = await Product.findById(id)
            
            for(const i in skus) {
                const skuData = <DefData> createSkuData({
                    name: skus[i].name ?? `${product.name}-${randomString()}`,
                    product_id: product._id,
                    sku: skus[i].sku ?? null,
                    price: skus[i].price ?? 0,
                    quantity: skus[i].quantity ?? 0
                })
                skuData['id'] = skus[i]._id
                const variable_sku = await createSku(skuData, 'update')
                
                // if(is_variable) {
                // // add sku values
                // }
                
            }
            const prod = await getProductQuery(product._id, product.is_variable, true)
            return res.status(200).json({ data: prod })
        }
        
        const product = await Product.create(productObj)
        const skuData = <DefData> createSkuData({
            name: product.name,
            product_id: product._id
        })
        await createSku(skuData, 'save')

        const prod = await getProductQuery(product._id, product.is_variable, true)

        res.status(200).json({data: prod})
    } catch (error) {
        res.status(400).json({error})
    }
}

const createSku = async(data: DefData, status: string = '') => {
    if(data.id) {
        const id = data.id
        delete data.id
        await ProductSku.findByIdAndUpdate(id, data)

        return await ProductSku.findById(id)
    }
    return await ProductSku.create(data)
}

const createSkuValues = async($product_id: string, $variation_id: string, $variation_option_id: string, $product_sku_id: string,) => {
    
}

const createSkuData = (data: DefData) => {
    let structure = {}
    structure['name'] = data.name
    structure['product_id'] = data.product_id
    structure['sku'] = data.sku ?? randomString()
    structure['price'] = data.price ?? 0
    structure['quantity'] = data.quantity ?? 0

    return structure
}

const getProductQuery = async (id: string, isVariable: boolean = false, isObject: boolean = false) => {
    let pipeline:any = []
    if(!isVariable) {
        pipeline = [{ $match: { $expr: { $eq: [ "$$product_name", "$name" ] } } } ] 
    } else {
        pipeline = [{ $match: { $expr: { $ne: [ "$$product_name", "$name" ] } } } ] 
    }

    const aggregation = [
        {
            $lookup: {
              from: 'productskus', // The collection to join with
              localField: '_id',
              foreignField: 'product_id',
              let: { product_name : "$name"},
              pipeline,
              as: 'skus', // The populated user data
            }
        },
        {
            $match: {_id: new mongoose.Types.ObjectId(id)}
        }
    ]
    const product = await Product.aggregate(aggregation)
    if(isObject) {
        return product[0]
    }

    return product
}

let product = {
    getProducts,
    getProduct,
    createProduct
}

export default product
