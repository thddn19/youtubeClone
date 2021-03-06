const express = require("express");
const router = express.Router();
const { Comments  } = require("../models/Comments.js");

// =======================
//        Comment
// =======================
router.post("/saveComment", (req, res)=> {
    const comments  = new Comments(req.body)

    comments.save((err, comment)=> {
        if(err) return res.json({success:false, err})

        Comments.find({'_id' : comment._id})
        
            .populate('writer')
            .exec( (err, result) => {
                if(err) return res.json({success: false, err})
                res.status(200).json({success: true, result})
            })
    })
})

router.post("/getComments", (req, res)=> {

    Comments.find({ "videoId" : req.body.videoId })
      .populate("writer")    
      .exec((err, comments) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, comments });
      }); 
})
module.exports = router;
