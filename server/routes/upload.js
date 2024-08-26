const express = require('express');
const router = express.Router();
const multer = require('multer');
// const { Upload } = require('../models/Upload');


//=================================
//             audio
//=================================

const storage = multer.diskStorage({
    //어디에 파일이 저장이 되는지 - uploads 파일 안 이미지
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`)
    }
  })

const upload = multer({
  storage: storage
}).single("file")

router.post('/audio', (req, res) => {
    //가져온 음성 파일을 저장한다.
    upload(req, res, err => {
        console.log('res', res)
        if(err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file})
    })

})

module.exports = router