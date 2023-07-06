module.exports.admin= function blog(req, res) {
    console.log("blog loaded");


  


    return res.render('blog', {
        Title: "blog page",
        
        
    });

   


}