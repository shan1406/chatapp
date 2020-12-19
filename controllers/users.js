'use strict';

module.exports=function(_,passport,User){
    return{
        SetRouting: function(router){
            router.get('/',this.indexPage);
            router.post('/',User.LoginValidation,this.postLogin);
            router.get('/signup',this.getSignUp);
            router.get('/auth/facebook',this.getFacebookLogin);
            router.get('/auth/facebook/callback',this.facebookLogin);
            router.get('/auth/google',this.getgoogleLogin);
            router.get('/auth/google/callback',this.googleLogin);
            
            router.post('/signup',User.SignUpValidation,this.postSignUp);
        },

        indexPage: function(req,res){
            const errors=req.flash('error');
            return res.render('index',{title:'Chatapp | Login',messages:errors,hashErrors:errors.length>0});
        },

        getSignUp: function(req,res){
            const errors=req.flash('error');
            return res.render('signup',{title:'Chatapp | SignUp',messages:errors,hashErrors:errors.length>0});
        },

        postSignUp: passport.authenticate('local.signup',{
            successRedirect:'/home',
            failureRedirect:'/signup',
            failureFlash:true
        }),

        postLogin: passport.authenticate('local.login',{
            successRedirect:'/home',
            failureRedirect:'/',
            failureFlash:true
        }),

        getFacebookLogin: passport.authenticate('facebook',{
            scope:'email'
        }),

        facebookLogin: passport.authenticate('facebook',{
            successRedirect:'/home',
            failureRedirect:'/signup',
            failureFlash:true
        }),

        getgoogleLogin: passport.authenticate('google',{
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }),

        googleLogin: passport.authenticate('google',{
            successRedirect:'/home',
            failureRedirect:'/signup',
            failureFlash:true
        }),
    }
}