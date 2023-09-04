import { Request, Response } from 'express'
import { Category, ICategory } from '../models/categories'
import { SubCategory, ISubCategory } from '../models/subCategories'
import { Brand, IBrand } from '../models/brands'
import { Attribute, IAttribute } from '../models/attributes'
import { Tag, ITag } from '../models/tags'
import { isEmpty, bodyWithId, pages, paginatedData, updateName } from '../services/'
import { Queries, Fitlers } from '../types'
require('dotenv').config() 

export const getCategories = async(req: Request, res: Response) => {
    const { per_page, indexStart } = await pages(req)

    let query = <Queries>{}

    if(req.query.qn) query.name = <Fitlers>{ $regex: req.query.qn, $options: 'i' }
    if(req.query.show_all) query.show_all = true

    paginatedData(res, Category, query, per_page, indexStart)
    
}

export const getCategory = async(req: Request, res: Response) => {
    try {
        if(!req.params.id) res.status(400).json({ message: 'Id is required' })

        const exist = await Category.findById(req.params.id)
        if(!exist) return res.status(400).json({ message: 'Not found' })

        res.status(200).json({ data: exist })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const getBrands = async(req: Request, res: Response) => {
    const { per_page, indexStart } = await pages(req)

    let query = <Queries>{}

    if(req.query.qn) query.name = <Fitlers>{ $regex: req.query.qn, $options: 'i' }
    if(req.query.show_all) query.show_all = true

    paginatedData(res, Brand, query, per_page, indexStart)

}

export const getBrand = async(req: Request, res: Response) => {
    try {
        if(!req.params.id) res.status(400).json({ message: 'Id is required' })

        const exist = await Brand.findById(req.params.id)
        if(!exist) return res.status(400).json({ message: 'Not found' })

        res.status(200).json({ data: exist })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const getTags = async(req: Request, res: Response) => {
    const { per_page, indexStart } = await pages(req)

    let query = <Queries>{}

    if(req.query.qn) query.name = <Fitlers>{ $regex: req.query.qn, $options: 'i' }
    if(req.query.show_all) query.show_all = true

    paginatedData(res, Tag, query, per_page, indexStart)
}

export const getTag = async(req: Request, res: Response) => {
    try {
        if(!req.params.id) res.status(400).json({ message: 'Id is required' })

        const exist = await Tag.findById(req.params.id)
        if(!exist) return res.status(400).json({ message: 'Not found' })

        res.status(200).json({ data: exist })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const getAttributes = async(req: Request, res: Response) => {
    const { per_page, indexStart } = await pages(req)

    let query = <Queries>{}

    if(req.query.qn) query.name = <Fitlers>{ $regex: req.query.qn, $options: 'i' }
    if(req.query.show_all) query.show_all = true

    paginatedData(res, Attribute, query, per_page, indexStart)
}

export const getAttribute = async(req: Request, res: Response) => {
    try {
        if(!req.params.id) res.status(400).json({ message: 'Id is required' })

        const exist = await Attribute.findById(req.params.id)
        if(!exist) return res.status(400).json({ message: 'Not found' })

        res.status(200).json({ data: exist })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const getSubCategories = async(req: Request, res: Response) => {
    const { per_page, indexStart } = await pages(req)

    let query = <Queries>{}
    query.category = req.body.category ?? req.query.category 

    if(req.query.qn) query.name = <Fitlers>{ $regex: req.query.qn, $options: 'i' }
    if(req.query.show_all) query.show_all = true

    paginatedData(res, SubCategory, query, per_page, indexStart, ['category'])

}

export const getSubCategory = async(req: Request, res: Response) => {
    try {
        if(!req.params.id) res.status(400).json({ message: 'Id is required' })

        const exist = await SubCategory.findById(req.params.id)
        if(!exist) return res.status(400).json({ message: 'Not found' })

        res.status(200).json({ data: exist })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const createCategory = async(req: Request, res: Response) => {
    try {
        const { name } =  await bodyWithId(req)

        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})
        
        const exist = await Category.find().byName(name.toLowerCase())
        if(exist.length > 0) return res.status(400).json({ message: 'Name was already taken' })

        const categoryObj = <ICategory>{
            name: name.toLowerCase()
        }
        const category = await Category.create(categoryObj)
        res.status(200).json({data: category})
    } catch (error) {
        res.status(400).json({error})
    }
}

export const updateCategory = async(req: Request, res: Response) => {
    try {
        const { name, id } = req.body

        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})
        const fields = {
            name: name.toLowerCase()
        }
        await updateName(res, Category, id, fields)
    } catch (error) {
        res.status(400).json({error})
    }
}

export const createBrand = async(req: Request, res: Response) => {
    try {
        const { name } = req.body
        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})

        const brandObj = <IBrand>{
            name: name.toLowerCase()
        }
        const exist = await Brand.find(brandObj)
        if(exist.length > 0) return res.status(400).json({ message: 'Name was already taken' })

        const brand = await Brand.create(brandObj)
        res.status(200).json({data: brand})
    } catch (error) {
        res.status(400).json({error})
    }
}

export const updateBrand = async(req: Request, res: Response) => {
    try {
        const { name, id } = req.body

        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})
        const fields = {
            name: name.toLowerCase()
        }
        await updateName(res, Brand, id, fields)
    } catch (error) {
        res.status(400).json({error})
    }
}

export const createTag = async(req: Request, res: Response) => {
    try {
        const { name } = req.body
        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})
        
        const tagObj = <ITag>{
            name: name.toLowerCase()
        }

        const exist = await Tag.find(tagObj)
        if(exist.length > 0) return res.status(400).json({ message: 'Name was already taken' })

        const tag = await Tag.create(tagObj)
        res.status(200).json({data: tag})
    } catch (error) {
        res.status(400).json({error})
    }
}

export const updateTag = async(req: Request, res: Response) => {
    try {
        const { name, id } = req.body

        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})
        const fields = {
            name: name.toLowerCase()
        }
        await updateName(res, Tag, id, fields)
    } catch (error) {
        res.status(400).json({error})
    }
}

export const createAttribute = async(req: Request, res: Response) => {
    try {
        const { name } = req.body
        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})
        
        const attributeObj = <IAttribute>{
            name: name.toLowerCase()
        }

        const exist = await Attribute.find(attributeObj)
        if(exist.length > 0) return res.status(400).json({ message: 'Name was already taken' })

        const attribute = await Attribute.create(attributeObj)
        res.status(200).json({data: attribute})
    } catch (error) {
        res.status(400).json({error})
    }
}

export const updateAttribute = async(req: Request, res: Response) => {
    try {
        const { name, id } = req.body

        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})
        const fields = {
            name: name.toLowerCase()
        }
        await updateName(res, Attribute, id, fields)
    } catch (error) {
        res.status(400).json({error})
    }
}

export const createSubCategory = async(req: Request, res: Response) => {
    try {
        const { name, category } = req.body
        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})

        const exist = await SubCategory.find({ name: name.toLowerCase(), category })
        if(exist.length > 0) return res.status(400).json({ message: 'Name was already taken' })
    
        const subCategoryObj = <ISubCategory>{
            ...req.body,
            name: name.toLowerCase()
        }
        const subCategory = await SubCategory.create(subCategoryObj)
        res.status(200).json({data: subCategory})
    } catch (error) {
        res.status(400).json({error})
    }
}

export const updateSubCategory = async(req: Request, res: Response) => {
    try {
        const { name, id } = req.body

        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})
        const fields = {
            name: name.toLowerCase()
        }
        await updateName(res, SubCategory, id, fields)
    } catch (error) {
        res.status(400).json({error})
    }
}

let misc = {
    getCategories,
    getCategory,
    updateCategory,
    createCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    createSubCategory,
    getBrands,
    getBrand,
    updateBrand,
    createBrand,
    getAttributes,
    getAttribute,
    updateAttribute,
    createAttribute,
    getTags,
    getTag,
    updateTag,
    createTag
}


export default misc


