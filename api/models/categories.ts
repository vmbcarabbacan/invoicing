import { Document, model, Schema, Query } from "mongoose"

export interface ICategory extends Document {
    name: string,
}

export interface CategoryQueryHelpers {
    [x: string]: any;
    byName(name: string, user_id: string): Query<any, Document<ICategory>> & CategoryQueryHelpers;
}

export const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
}, { versionKey: false })

CategorySchema.query = {
     async byName(name: string) {
        return await this.where({ name })
      }
}


// CategorySchema.statics.withData = function (name, column, value) {
//     return this.aggregate([
//         {
//             $lookup: {
//               from: 'users', // The collection to join with
//               localField: 'user_id',
//               foreignField: '_id',
//               as: `${name}` // The populated user data
//             }
//         },
//         {
//             $unwind: `$${name}`,
//         },
//         {
//             $match: {
//                  $and: [
//                     {[column] : value},
//                     { is_deleted: false }
//                  ]
//               }
//         },
        
//     ])
// }

export const Category = model<ICategory, CategoryQueryHelpers>('Category', CategorySchema)