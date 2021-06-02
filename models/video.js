const mysqlPool = require("../lib/mysqlPool");
const { extractValidFields } = require("../lib/validation");

const videoSchema = {
  videoId: { required: true },
  postId: { required: true },
  userId: { required: true },
  filename: { required: true },
  url: { required: true },
  contentType: { required: true },
};
exports.videoSchema = videoSchema;

async function getVideoInfoById(id) {
  const [results] = await mysqlPool.query(
    "SELECT * FROM users WHERE videoId = ?",
    [id]
  );
  return results[0];
}
exports.getVideoInfoById = getVideoInfoById;

async function insertNewVideo(video) {
  video = extractValidFields(video, videoSchema);
  const [result] = await mysqlPool.query("INSERT INTO videos SET ?", video);
  return result.insertId;
}
exports.insertNewVideo = insertNewVideo;
