$(document).ready(function(){
    var socket=io();

    var room=$('#groupName').val();
    var sender=$('#sender').val();
    

    socket.on('connect',function(){
        console.log("User Connected");
        var params={
            room:room,
            name:sender
        }
        socket.emit('join',params,function(){
            console.log('User has joined this channel');
        });
    });

    socket.on('userList',function(users){
        //console.log(users);
        var ol=$('<ol></ol>');

        for(var i=0;i<users.length;i++){
            ol.append('<p>'+users[i]+'</p>');
        }
        $('#users').html(ol);
    });

    socket.on('newMessage',function(data){
        var template=$('#message-template').html();
        var message=Mustache.render(template,{
            text:data.text,
            sender:data.from
        });

        $('#messages').append(message);
    });

    $('#message-form').on('submit',function(e){
        e.preventDefault();
        var msg=$('#msg').val();

        socket.emit('createMessage',{
            text:msg,
            room:room,
            sender:sender
        },function(){
            $('#msg').val('');
        });
    });
});