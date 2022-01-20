const Posts = require('../models/posts.model')


const getById = (postId) => {
    return Posts.findById(postId, (err, post) => {
        if(err) console.log(err)
        return post
    }).clone()
}

exports.getAllPosts = (req, res, next) => {
    Posts.find((err, posts) => {
        if (err) console.log(err);
        res.render('admin/posts', {
            titlePage: `Posts - (${req.session.user.username})`,
            session: req.session.hasOwnProperty('user') ? req.session : false,
            errMsg: '',
            posts: posts
        })
    })


}

//AddEdit Post (get)

exports.getAddEditPost = (req, res, next) => {
    res.render('admin/add-edit-post', {
        titlePage: 'Add Post',
        session: req.session.hasOwnProperty('user') ? req.session : false,
        editing: false
    })
}

//AddEdit Post (post)
exports.postAddEditPost = async (req, res, next) => {
    const { title, imageUrl, description } = req.body
    const post = new Posts({
        title: title,
        imageUrl: imageUrl,
        description: description,
        date: new Date(),
        likes:0,
        userId: req.session.user._id,
        username: req.session.user.username
    })
    await post.save()
    res.redirect("/admin/")
}

//Edit Post (get)
exports.getEditPost = async (req, res, next) => {
    const edit = req.query.edit
    if (!edit) res.redirect('/')

    const { postId } = req.params
    const post = await getById(postId)
    res.render('admin/add-edit-post', {
        titlePage: 'Add Post',
        session: req.session.hasOwnProperty('user') ? req.session : false,
        editing: edit,
        post: post
    })

}

//Edit Post (post)
exports.postEditPost = async (req, res, next) => {
    const { title, imageUrl, description, postId } = req.body
    const post = await getById(postId)

    post.title = title
    post.imageUrl = imageUrl
    post.description = description
    post.date = new Date()

    await post.save()
    res.redirect('/')
}

//Delete Post (post)
exports.postDeletePost = async (req, res, next) => {
    const { postId } = req.body
    await Posts.findByIdAndDelete(postId)
    res.redirect('/')
}

//Like Post
exports.postLikePost = async(req, res, next)=>{
    const { postId} = req.body
    const post = await getById(postId)

    post.likes = post.likes+1
    await post.save()

    res.redirect('/')

}

//Add comment Post
exports.postAddComentPost = async(req, res, next)=>{
    const {postId, comment} = req.body
    const post = await getById(postId)
    console.log(post.comments);
    post.comments.push({
        comment:comment,
        date: new Date()
    })
    await post.save()
    res.redirect('/')
}