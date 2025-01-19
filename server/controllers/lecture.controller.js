import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
// import { uploadMediaToCloudinary } from "../utils/cloudinary.js";

export const createLectureController = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title} = req.body;
    // const video = req.file;

    if (!courseId || !title) {
      return res.status(400).json({
        success: false,
        message: "Course ID and Lecture Title are required",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // let videoUrl;
    // if (video) {
    //   const result = await uploadMediaToCloudinary(video.path);
    //   videoUrl = result.secure_url;
    // }

    const lecture = new Lecture({
      title,
    //   description,
    //   videoUrl,
    //   course: courseId,
    //   instructor: req.id,
    //   duration,
    });

    await lecture.save();

    course.lectures.push(lecture._id);
    await course.save();

    res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      lecture,
    });
  } catch (error) {
    console.log("Error in create lecture controller", error);
    res.status(500).json({
      success: false,
      message: "Error in create lecture controller",
    });
  }
};