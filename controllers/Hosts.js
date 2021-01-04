exports.postHostPlace = (req,res,next)=>{
    const files = req.files;
    try {
        if (files.length == 0) {
            throw new Error("No file is selected");
        }
        files.forEach((file) => {
            if (file.mimetype != 'image/jpeg') {
                throw new Error("File isn't of the right type")
            }
        })
    } catch (error) {
        return next(error.message);
    }
    res.redirect('/');
}