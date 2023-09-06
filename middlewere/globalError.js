 
const globarError = (res , message)=>{
        res.status(400).json({
            success : false,
            messaage : message || "Something went wrong"
        })
}

module.exports = globarError