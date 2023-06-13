

// 404 not found handler

function notFoundHandler(req,res,next){
    
}


//default error handler
function defaultErrorHandler(req,res){
    res.status(404).json({ error: 'Route not found' });
}

module.exports = defaultErrorHandler;