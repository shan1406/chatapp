$(document).ready(function(){
    var socket=io();
    socket.on('connect',function(){

        var room='GlobalRoom';
        var name=$('#name-user').val();
        var img=$('#name-image').val();
        console.log(img);

        socket.emit('global room',{
            room:room,
            name:name,
            img:img
        })
    });

    socket.on('loggedInUser', function(users){
        var friends=$('.friend').text();
        var friend=friends.split('@');
        for(var i=0;i<friend.length;i++)
        friend[i]=friend[i].trim();
        console.log(friend);

        var name=$('name-user').val();
        var ol=$('<div></div>');
        var arr=[];

        for(var i=0;i<users.length;i++){
            if(friend.indexOf(users[i].name)>-1){
                arr.push(users[i]);
                var list='<img src="https://placehold.it/300x300" class="pull-left img-circle" style="width:50px;margin-right:10px;" /><p>'+
                '<a id="val" href="/chat"><h3 style="padding-top:15px;color:gray; font-size:14px;">'+'@'+ users[i].name+'<span class="fa fa-circle online_friend"></h3></a></p>'
                ol.append(list);
            }
        }
        console.log(arr);
        console.log(ol);
        $('#numberOfFriends').text('('+arr.length+')');
        $('.onlineFriends').html(ol);
    })
})