const Posts = require('../models/posts.model')


exports.getAllPosts = (req, res, next) => {
    Posts.find((err,posts)=>{
        if(err)console.log(err);
        res.render('admin/posts', {
            titlePage: `Posts - (${req.session.user.username})`,
            session:req.session.hasOwnProperty('user')?req.session:false,
            errMsg:'',
            posts:posts
        })
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
        date: new Date(),
        userId:req.session.user._id,
        username:req.session.user.username
    })
    await post.save()
    res.redirect("/admin/")
}

