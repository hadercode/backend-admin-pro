const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const { uploadFileHelper, updateImage } = require('../helpers/upload');
const { successResponse, handleError } = require("../util/response");

const uploadFile = async (req, res) => {

    const { type, id } = req.params;
    const validTypes = ['doctors','users','hospitals'];

    if(!validTypes.includes(type)){
        handleError(res, { message: 'El tipo debe ser doctors, users o hospitals' });
    }

    const file = req.files.image;
    const split = file.name.split('.');
    const extension = split[1];
    const fileName = `${ uuidv4() }.${ extension }`;
    const uploadPath = `./uploads/${ type }/${ fileName }`;

    try {
        
        await uploadFileHelper(req, file, uploadPath);
        await updateImage(id, type, fileName);

        successResponse(res, { message: "File uploaded!" });
    } catch (error) {
        handleError(res, { message: error.message });
    }
}

const getFile = (req, res) => {

    const { type, image } = req.params;
    let imagePath =  path.join(__dirname, `../uploads/${type}/${image}`); 
    
    if( !fs.existsSync(imagePath) ){
        imagePath =  path.join(__dirname, `../uploads/no-img.JPG`); 
    } 

    res.sendFile(imagePath);
}

module.exports = {
    uploadFile,
    getFile
}