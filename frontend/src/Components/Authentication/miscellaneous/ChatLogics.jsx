export const getSender = (loggedUser, users) => {
    if (!users[0]?._id || !users[1]?._id) return "deletedUser";
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}

export const getSenderPic = (loggedUser, users) => {
    // Check if users[0] or users[1] is undefined
    if (!users[0] || !users[1]) return "deletedUser";
    // Check if _id property exists on users[0] and users[1]
    if (!users[0]._id || !users[1]._id) return "deletedUser";
    return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
}

export const getSenderFull = (loggedUser, users) => {
    if (!users[0]?._id || !users[1]?._id) return null; // or return a default user object if needed
    return users[0]._id === loggedUser._id ? users[1] : users[0];
}

export const setMsgMargin = (messages,m,i,userId)=>{
       if(
        i<messages.length-1 && messages[i+1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
       ) return 15;
       else if(
        (i<messages.length-1 && messages[i+1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) || 
            (i === messages.length-1 && messages[i].sender._id!==userId)
       ) return 15;
       else return "auto";
}