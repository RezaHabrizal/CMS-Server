module.exports = ((err, req, res, next) => {
    switch (err.name) {
        case "invalid username/password":
            res.status(400).json({message: err.name})
            break
        case "unauthorized":
            res.status(401).json({message: err.name})
            break
        case "SequelizeDatabaseError":
            res.status(400).json({message: "bad request"})
            break
        case "SequelizeValidationError":
            res.status(400).json({message: err.message})
            break
        case "not found": 
            res.status(404).json({message: err.name})
            break
        default:
            res.status(500).json({message: "internal server error"})
    }
})
