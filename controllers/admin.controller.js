
exports.getPosts = (req, res, next) => {

    res.render('admin/posts', {
        titlePage: 'Posts',
        session:req.session.hasOwnProperty('user')?req.session:false
    })
}

