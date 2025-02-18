export default asyncHandler =(requestHandler) => {
    return async () =>{
        try {
            await requestHandler(req, res, next)
        } catch (error) {
            res.status(error.code || 500).json({
                error: error.message,
                sucess: false
            })        
        
        }
    }    
}

