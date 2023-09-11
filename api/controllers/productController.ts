import { Request, Response } from 'express'
import { Product, IProduct } from '../models/products'
import { ProductSku, IProductSku } from '../models/productSkus'
import { Queries, Fitlers, DefData } from '../types'
import { isEmpty, bodyWithId, pages, paginatedData, randomString, addSlug } from '../services/'
import mongoose from 'mongoose'
import { ProductSkueValue } from '../models/productSkuValues'

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
            
            /**
             * updating the sku options
             */
            for(const i in skus) {
                const skuData = <DefData> createSkuData({
                    name: skus[i].name ?? `${product.name}-${randomString()}`,
                    product_id: product._id,
                    sku: skus[i].sku ?? randomString(),
                    price: skus[i].price ?? 0,
                    quantity: skus[i].quantity ?? 0
                })
                skuData['id'] = skus[i]._id
                await createSku(skuData)
            }

            /**
             * function will be enable once variable options
             * is present from the payload and is variable
             * is set to true
             * 
             * will save new sku options and values
             */
            if(req.body.variable_options && req.body.variable_options.length > 0 && is_variable) {
                for(const j in req.body.variable_options) {
                    const skuData = <DefData> createSkuData({
                        name: `${product.name}-${req.body.variable_options[j].name}` ?? `${product.name}-${randomString()}`,
                        product_id: product._id,
                        sku: req.body.variable_options[j].sku ?? randomString(),
                        price: req.body.variable_options[j].price ?? 0,
                        quantity: req.body.variable_options[j].quantity ?? 0
                    })
                    const variable_sku_exist = await checkSkuExist(skuData)
                    if(!variable_sku_exist) {
                        const variable_sku = await createSku(skuData)
                        for(const k in req.body.variable_options[j].skus) {
                            const sku_value = <DefData>{
                                product_id: product._id,
                                product_sku_id: variable_sku,
                                variation_id: req.body.variable_options[j].skus[k].variation_id,
                                variation_option_id: req.body.variable_options[j].skus[k].variation_option_id
                            }
                            await createSkuValues(sku_value)
                        }
                    }
                }
            }
            const prod = await getProductQuery(product._id, product.is_variable, true)
            return res.status(200).json({ data: prod })
        }
        
        const product = await Product.create(productObj)
        const skuData = <DefData> createSkuData({
            name: product.name,
            product_id: product._id
        })
        await createSku(skuData)

        const prod = await getProductQuery(product._id, product.is_variable, true)

        res.status(200).json({data: prod})
    } catch (error) {
        res.status(400).json({error})
    }
}

const checkSkuExist = async(data: DefData) => {
    return ProductSku.findOne({ product_id: data.product_id, name: data.name }).exec()
}

const createSku = async(data: DefData) => {
    if(data.id) {
        const id = data.id
        delete data.id
        await ProductSku.findByIdAndUpdate(id, data)

        return await ProductSku.findById(id)
    }

    return await ProductSku.create(data)
}

const createSkuValues = async(sku_value: DefData) => {
    await ProductSkueValue.create(sku_value)
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
