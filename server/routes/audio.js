const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Audio } = require('../models/Audio')

//=================================
//             audio
//=================================

const storage = multer.diskStorage({
    //어디에 파일이 저장이 되는지 - uploads 파일 안 이미지
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      // console.log(req.query.user)
      cb(null, `${file.originalname}_${req.query.user}.wav`)
    }
  })

const upload = multer({
  storage: storage
}).single("file")

router.post('/audio', (req, res) => {
    //가져온 음성 파일을 저장한다.
    upload(req, res, err => {
        // console.log('res', res)
        if(err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, userId: res.req.query.user, filePath: res.req.file.path, fileName: res.req.file.filename, fileSize: res.req.file.size, fileData: res.req.file})
    })
})

router.post("/", (req, res) => {
  //받아온 정보들을 DB에 넣어준다
  // console.log('req', req);
  const audio = new Audio(req.body);
  audio.save((err) => {
    // console.log('err', err)
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router