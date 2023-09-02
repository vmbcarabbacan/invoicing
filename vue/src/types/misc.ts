export interface MISC {
    data: Array<value>,
    end: number,
    from: number,
    size: number,
    total: number
}

export interface value {
    _id: string,
    deleted_at: string,
    name: string,
    category? : string
}

export interface TABLEHEADER {
    title: string,
    align: string,
    sortable: boolean,
    key: string
}

export interface KEYOFSTRING {
    [key: string]: string | boolean | number | Array<string> | null | unknown
}