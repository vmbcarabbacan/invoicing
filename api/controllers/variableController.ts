import { Request, Response } from 'express'
import { Variable, IVariable } from '../models/variables'
import { VariableOption, IVariableOption } from '../models/variableOptions'
import { Queries, Fitlers } from '../types'
import { isEmpty, bodyWithId, pages, paginatedData, updateName, addSlug } from '../services/'
require('dotenv').config()

export const getVariables = async(req: Request, res: Response) => {
    const { per_page, indexStart } = await pages(req)

    let query = <Queries>{}

    if(req.query.qn) query.name = <Fitlers>{ $regex: req.query.qn, $options: 'i' }
    if(req.query.show_all) query.show_all = true

    paginatedData(res, Variable, query, per_page, indexStart)

}

export const getVariable = async(req: Request, res: Response) => {
    try {
        if(!req.params.id) res.status(400).json({ message: 'Id is required' })

        const exist = await Variable.findById(req.params.id)
        if(!exist) return res.status(400).json({ message: 'Not Found' })

        res.status(200).json({ data: exist })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const createVariable = async(req: Request, res: Response) => {
    try {
        const { name } =  await bodyWithId(req)

        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})
        
        const exist = await Variable.find().byName(name.toLowerCase())
        if(exist.length > 0) return res.status(400).json({ message: 'Name was already taken' })

        const categoryObj = <IVariable>{
            name: name.toLowerCase(),
            slug: addSlug(name.toLowerCase())
        }
        const category = await Variable.create(categoryObj)
        res.status(200).json({data: category})
    } catch (error) {
        res.status(400).json({error})
    }
}

export const updateVariable = async(req: Request, res: Response) => {
    try {
        const { name, id } = req.body

        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})
        const fields = {
            name: name.toLowerCase(),
            slug: addSlug(name.toLowerCase())
        }
        await updateName(res, Variable, id, fields)

    } catch (error) {
        res.status(400).json({error})
    }
}

export const getVariableOptions = async(req: Request, res: Response) => {
    const { per_page, indexStart } = await pages(req)

    let query = <Queries>{}
    query.variable = req.body.variable ?? req.query.variable

    if(req.query.qn) query.name = <Fitlers>{ $regex: req.query.qn, $options: 'i' }
    if(req.query.show_all) query.show_all = true
    
    paginatedData(res, VariableOption, query, per_page, indexStart, ['variable'])

}

export const getVariableOption = async(req: Request, res: Response) => {
    try {
        if(!req.params.id) res.status(400).json({ message: 'Id is required' })

        const exist = await VariableOption.findById(req.params.id).populate('variable')
        if(!exist) return res.status(400).json({ message: 'Not Found' })

        res.status(200).json({ data: exist })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const createVariableOption = async(req: Request, res: Response) => {
    try {
        const { name, variable } = req.body

        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})
        
        const exist = await VariableOption.find({ name: name.toLowerCase(), variable })
        if(exist.length > 0) return res.status(400).json({ message: 'Name was already taken' })

        const categoryObj = <IVariableOption>{
            ...req.body,
            name: name.toLowerCase(),
            slug: addSlug(name.toLowerCase())
        }
        const category = await VariableOption.create(categoryObj)
        res.status(200).json({data: category})
    } catch (error) {
        res.status(400).json({error})
    }
}

export const updateVariableOption = async(req: Request, res: Response) => {
    try {
        const { name, id } = req.body

        if(await isEmpty(Object.values(req.body))) return res.status(400).json({message: 'Name must not be empty'})
        const fields = {
            name: name.toLowerCase(),
            slug: addSlug(name.toLowerCase())
        }
        await updateName(res, VariableOption, id, fields)

    } catch (error) {
        res.status(400).json({error})
    }
}

const variable = {
    getVariables,
    getVariable,
    createVariable,
    updateVariable,
    getVariableOptions,
    getVariableOption,
    createVariableOption,
    updateVariableOption
}

export default variable