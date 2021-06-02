const router = require("express").Router();
const multer = require("multer");
const crypto = require("crypto");
const express = require("express");

const { insertNewVideo, getVideoInfoById } = require("../models/video");

const acceptedFileTypes = {
  "video/mp4": "mp4",
};

const upload = multer({
  storage: multer.diskStorage({
    destination: `${__dirname}/uploads`,
    filename: (req, file, callback) => {
      const filename = crypto.pseudoRandomBytes(16).toString("hex");
      const extension = acceptedFileTypes[file.mimetype];
      callback(null, `${filename}.${extension}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    callback(null, !!acceptedFileTypes[file.mimetype]);
  },
});

// router.use("/media/video", express.static(`${__dirname}/uploads`));

router.post("/", upload.single("videoFile"), async (req, res) => {
  console.log("== req.body:", req.body);
  console.log("== req.file:", req.file);
  console.log("__dirname ", process.cwd());
  if (
    req.file &&
    req.body &&
    req.body.videoId &&
    req.body.postId &&
    req.body.userId
  ) {
    const video = {
      contentType: req.file.mimetype,
      filename: req.file.filename,
      url: `/media/videos/${req.file.filename}`,
      videoId: parseInt(req.body.videoId),
      postId: parseInt(req.body.postId),
      userId: parseInt(req.body.userId),
      path: req.file.path,
    };
    try {
      // const id = await insertNewPhoto(req.body);
      const id = await insertNewVideo(video);
      console.log(id);
      res.status(200).send({
        id: id,
        videoURL: `/videos/${id}`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        error: "Error inserting photo into DB.  Please try again later.",
      });
    }
  } else {
    res.status(400).send({
      error: "Request body is not a valid video object",
    });
  }
});

module.exports = router;
