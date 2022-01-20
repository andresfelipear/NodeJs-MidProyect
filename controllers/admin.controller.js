
exports.getAllPosts = (req, res, next) => {

    res.render('admin/posts', {
        titlePage: `Posts - (${req.session.user.username})`,
        session:req.session.hasOwnProperty('user')?req.session:false,
        errMsg:''
    })
}

//AddEdit Post

exports.getAddEditPost = (req,res, next)=>{
    res.render('admin/add-edit-post',{
        titlePage: 'Add Post',
        session:req.session.hasOwnProperty('user')?req.session:false,
        editing:false
    })
}