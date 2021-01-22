module.exports=function(async,Users){
    return{
        SetRouting:function(router){
            router.get('/chat/:name',this.getchatPage);
        },

        getchatPage: function(req,res){
            async.parallel([
                function(callback){
                    Users.findOne({'username':req.user.username})
                    .populate('request.userId')
                    .exec((err,result)=>{
                        callback(err,result);
                    })
                }
            ],(err,result)=>{
                const result1=result[0];
                console.log(result1);
                res.render('private/privatechat',{title:'chatapp-private',user:req.user,data:result1});
            });
        }
    }
}
