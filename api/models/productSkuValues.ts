import { Schema, Types, model, Document, Query } from 'mongoose'
import { Product } from './products'
import { Variable } from './variables'
import { VariableOption } from './variableOptions'
import { ProductSku } from './productSkus'

export interface IProductSkuValue extends Document {
    product_id: Types.ObjectId,
    variation_id: Types.ObjectId,
    variation_option_id: Types.ObjectId,
    product_sku_id: Types.ObjectId
}

export interface ProductSkuValueQueryHelpers {
    [x: string]: any;
}

export const ProductSkuValueSchema = new Schema(
    {
        product_id: {
            type: Types.ObjectId,
            ref: Product
        },
        variation_id: {
            type: Types.ObjectId,
            ref: Variable
        },
        variation_option_id: {
            type: Types.ObjectId,
            ref: VariableOption
        },
        product_sku_id: {
            type: Types.ObjectId,
            ref: ProductSku
        },
    }
)

export const ProductSkueValue = model<IProductSkuValue, ProductSkuValueQueryHelpers>('ProductSkuValue', ProductSkuValueSchema)