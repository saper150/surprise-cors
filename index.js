module.exports = (avalibleOrigins) => {
    const avalibleSet = new Set(avalibleOrigins)
    return (req, res, next) => {

        if (avalibleSet.has(req.headers.origin)) {
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
        }
        
        res.setHeader('Access-Control-Allow-Methods', '*')
        res.setHeader("Access-Control-Allow-Credentials", true)
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        if (req.method === 'OPTIONS')
            return res.send()

        next()
    }
}