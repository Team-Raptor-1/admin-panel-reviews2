const express = require("express");
const multer = require("multer");

const {
  createreview,
  getReview,
  deleteReview,
} = require("../Controller/Reviews");

const router = express.Router();
//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

//rpost
router.post(
  "/rcreate",
  upload.fields([{ name: "p_img" }, { name: "sec_img" }]),
  createreview
);
//getall
router.get("/rretrieve", getReview);

//delete
router.delete("/rdelete/:id", deleteReview);

module.exports = router;
