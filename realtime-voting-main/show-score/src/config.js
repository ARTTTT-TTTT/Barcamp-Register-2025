const isProd = !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')

const config = {
    isProd,
    // apiUrlPrefix: isProd ? '/api' : 'http://54.255.209.71:3001/api',
    apiUrlPrefix: isProd ? '/api' : 'http://localhost:8080/api',
}

export default config