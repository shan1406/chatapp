module.exports=function(Users,async){
    return{
        SetRouting: function(router){
            router.get('/group/:name',this.groupPage);
            router.post('/group/:name',this.groupPostPage);
        },

        groupPage: function(req,res){
            const name=req.params.name;
            res.render('groupChat/group',{title:'chatapp-group',user:req.user,groupName:name});
        },

        groupPostPage: function(req,res){
            async.parallel([
                function(callback){
                    if(req.body.receiverName){
                        Users.update({
                            'username':req.body.receiverName,
                            'request.userId':{$ne:req.user._id},
                            'friendsList.friendId':{$ne:req.user._id}
                        },
                        {
                            $push:{request:{
                                userId:req.user._id,
                                username:req.user.username
                            }},
                            $inc:{totalRequest:1}
                        },(err,count)=>{
                            callback(err,count);
                        })
                    }
                },

                function(callback){
                    if(req.body.receiverName){
                        Users.update({
                            'username':req.user.username,
                            'sentRequest.username':{$ne:req.body.receiverName}
                        },
                        {
                            $push:{sentRequest:{
                                username:req.body.receiverName
                            }}
                        },(err,count)=>{
                            callback(err,count);
                        })
                    }
                }
            ],(err,results)=>{
                res.redirect('/group/'+req.params.name);
            });
        }
    }
}