const isProd = !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')

const config = {
    isProd,
    apiPrefix: isProd ? '/api' : 'http://localhost:8080/api',
    apiPrefixAuth: isProd ? '/auth' : 'http://localhost:8080/auth'
}


export default config