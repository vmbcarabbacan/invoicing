export type AllowedOrigins = Array<string>;
export type Origin = string;
export type Callback = <T extends unknown[], R = unknown>(...args?: T): R;
export type DefaultTypes = {
    value: number,
    label: string
}
export type Bearer = {
    id: string,
    email: string,
    owner: string,
    role: number,
    iat: number,
    exp: number
}

export type Queries = {
    name: Fitlers,
    category?: string
    variable?: string
}

export type Fitlers = {
    $regex: string,
    $options: string
}

export type DefData = {
    [key: string]: string | boolean | number | Array<string> | null | unknown
}
