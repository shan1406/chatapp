class Users{
    constructor(){
        this.users=[];
    }

    AddUserData(id,name,room){
        var users={id,name,room};
        this.users.push(users);
        return users;
    }

    GetUserList(room){
        var users=this.users.filter((user)=>user.room===room);
        
        var namesArray=users.map((user)=>{
            return user.name;
        });
        return namesArray;
    }
}

module.exports={Users};