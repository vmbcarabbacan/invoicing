import jwt_decode from "jwt-decode"
import jwt from "jsonwebtoken"
import { algorithm } from "../utils/constant";
import { Request, Response } from 'express'
import { Bearer, Queries } from '../types'
import { Collection } from "mongoose";

require('dotenv').config(); 

const { SECRET } = process.env

const containUndefined = (arr: Array<string>) => {
    return arr.some((element) => element === undefined);
  };
  
  const containNull = (arr: Array<string>) => {
    return arr.some((element) => element === null);
  };
  
  const containEmpty = (arr: Array<string>) => {
    return arr.some((element) => element === "");
  };

  const getBearerObject = async(req: Request) => {
    const bearer = await req.headers.authorization.replace('Bearer ', '')
    return await decode(bearer)
  }

  const bodyWithId = async(req: Request) => {
    const obj = {...req.body}
    const bearer = <Bearer> await getBearerObject(req)
    obj['user_id'] = bearer.id
    obj['owner'] = bearer.owner

    return obj
  }
  
  const isEmpty = async (arr: Array<string>) => {
    if (containUndefined(arr)) return true;
    if (containNull(arr)) return true;
    if (containEmpty(arr)) return true;
  
    return false;
  };

  const decode = async(value:string) => {
    return await jwt_decode(value);
  }

  const encode = async(value:string) => {
    return await jwt.sign(value, SECRET, algorithm)
  }

  const accronym = async(value: string) => {
    const matches = <Array<string>> value.match(/\b(\w)/g); 
    return matches.join('');
  }

  const paginationObj = async(result: Array<Record<string, undefined>>, count: number, indexStart: number, per_page: number) => {
    const indexEnd = indexStart + per_page
    return {
      data: result,
      total: count,
      from: indexStart + 1,
      end: indexEnd > 0 ? count : indexEnd,
      size: totalPagination(size(count, per_page))
    }
  }

  const size = (count: number, per_page: number) => {
    return count / per_page
  }

  const totalPagination = (size: string | number) => {
    return Number.isInteger(size) ? size : parseInt(size.toString()) + 1
  }

  const splitCase = (value: string) => {
    return value.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
  }

  const addSlug = (value: string) => {
    return value.replace(" ", "-")
  }

  const pages = async (req: Request) => {
    const page = req.query.page ? parseInt(req.query.page) : 1
    let per_page = 1
    if(req.query.per_page) per_page = req.body.per_page ? req.body.per_page : parseInt(req.query.per_page)
    const indexStart = (page - 1) * per_page

    return { per_page, indexStart }
  }

  const paginatedData = async(res: Response, Model: Collection & any, query: Queries, per_page: number, indexStart: number, populates: Array<string> = []) => {
    let result = Model.find(query)

    if(populates.length > 0) for(const populate of populates) result.populate(populate)

    result = await result.skip(indexStart)
    .limit(per_page)
    .exec()
    const count = await Model.find(query).countDocuments()

    // if (!result?.length) return res.status(200).json({ message: `No Item Found` })

    res.status(200).json({data: await paginationObj(result, count, indexStart, per_page)})
  }

  const updateName = async(res: Response, Model: Collection & any, id: string, updateField: Record<string, any>) => {
    const idExist = await Model.findById(id)
    if(!idExist) res.status(400).json({ message: 'Not found' })
    const nameExist = await Model.find({ _id: { $ne: id } }).byName(updateField.name.toLowerCase())
    if(nameExist.length > 0) return res.status(400).json({ message: 'Name was already taken' })

    await Model.findByIdAndUpdate(id, updateField)

    const data = await Model.findById(id)
    res.status(200).json({ data })
  }

  export {
    paginationObj,
    getBearerObject,
    bodyWithId,
    isEmpty,
    encode,
    decode,
    accronym,
    splitCase,
    pages,
    paginatedData,
    updateName,
    addSlug
  }