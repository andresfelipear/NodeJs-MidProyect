
exports.getPosts = (req, res, next) => {
    res.render('admin/posts', {
        titlePage: 'Posts',
    })
}

