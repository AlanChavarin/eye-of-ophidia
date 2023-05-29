const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new multer.memoryStorage()
const upload = multer({
    storage,
    limits: {fileSize: 1000000}
})

const handleUpload = async (file) => {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "image",
    })
    return res
}

const postImage = asyncHandler(async (req, res) => {
    const b64 = Buffer.from(req.file.buffer).toString("base64")
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64
    const cldRes = await handleUpload(dataURI)
    res.status(200).json(cldRes)
})

router.post('/upload', upload.single("image"), postImage)

module.exports = router
