import {Document, model, Schema, Query} from "mongoose"

export interface ITag extends Document {
    name: string,
}

export interface TagQueryHelpers {
    [x: string]: any;
    byName(name: string, user_id: string): Query<any, Document<ITag>> & TagQueryHelpers;
}

export const TagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
}, { versionKey: false })

TagSchema.query = {
    async byName(name: string) {
       return await this.where({ name })
     }
}


export const Tag = model<ITag, TagQueryHelpers>('Tag', TagSchema)