const Posts = require('../models/posts.model')


exports.getAllPosts = (req, res, next) => {

    res.render('admin/posts', {
        titlePage: `Posts - (${req.session.user.username})`,
        session:req.session.hasOwnProperty('user')?req.session:false,
        errMsg:''
    })
}

//AddEdit Post (get)

exports.getAddEditPost = (req,res, next)=>{
    res.render('admin/add-edit-post',{
        titlePage: 'Add Post',
        session:req.session.hasOwnProperty('user')?req.session:false,
        editing:false
    })
}

//AddEdit Post (post)
exports.postAddEditPost = async(req,res, next)=>{
    const {title,imageUrl, description} = req.body
    const post = new Posts({
        title:title,
        imageUrl:imageUrl, 
        description:description,
        userId:req.session.user._id
    })
    await post.save()
    res.redirect("/admin/")
}
