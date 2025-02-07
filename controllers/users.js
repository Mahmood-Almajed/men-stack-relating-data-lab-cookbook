const User = require('../models/user');

const community =async(req,res)=>{
try{
    const allUsers =await User.find({});
    console.log(allUsers)
    res.render('users/index.ejs',{
        title:'community',
        allUsers,
    })


}
catch(error){
    console.log(error);
    res.redirect('/')
}


}

const show= async(req,res)=>{
    try {
        const currentUser = await User.findById(req.params.userId);
        res.render('users/show.ejs', {
            title: `${currentUser.username} pantry`,
            currentUser,
        })

    } catch (error) {
        console.log(error);
    }

}

module.exports={
    community,
    show
}