const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports = (req,res) => {
    let image = req.files.image
    let imgName = new Date().getTime() + "_" + image.name.replace(/\W/g,'') + "." + image.name.split('.')[1]
    image.mv(path.resolve(__dirname,'public/img',imgName),
        async (error) => {
            console.log(error)
            await BlogPost.create(
                {
                    ...req.body,
                    image:'/img/' + imgName
                }
            )
            res.redirect('/')
        }
    )
}