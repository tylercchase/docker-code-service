module.exports = {
    ensureAuth: function(req,res,next) {
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect('http://localhost:41309/login');
        }
    },
    ensureGuest: function (req,res,next) {
        if(req.isAuthenticated()){
            res.redirect('http://localhost:41309/dashboard');
        }else{
            return next();
        }
    }
}