import { AllowedOrigins, Origin, Callback } from '../types'

const allowedOrigins:AllowedOrigins = [
    'http://localhost:3000/',
    'http://localhost:3000',
    'http://127.0.0.1:3000/',
    'http://127.0.0.1:3000',
]

const corsOption = {
    origin: (origin: Origin, callback: Callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
    maxAge: 3600
}

export default corsOption
