module.exports = {
    ensureAuth: function(req,res,next) {
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect(`${process.env.BASEURL}/login`);
        }
    },
    ensureGuest: function (req,res,next) {
        if(req.isAuthenticated()){
            res.redirect(`${process.env.BASEURL}/dashboard`);
        }else{
            return next();
        }
    }
}