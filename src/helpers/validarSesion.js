const helper = {};

helper.isAuthenticated = (req, res,next) => {

    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/user/login')


};


module.exports=helper;