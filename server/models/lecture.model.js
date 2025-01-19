import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
//   course: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Course",
//   },
//   creater: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   isPublished: {
//     type: Boolean,
//     default: false,
//   },
  isPreviewFree: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;