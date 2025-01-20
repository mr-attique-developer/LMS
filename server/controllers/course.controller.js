import Course from "../models/course.model.js";
import {
  deleteFromCloudinary,
  uploadMediaToCloudinary,
} from "../utils/cloudinary.js";

export const createCourseController = async (req, res) => {
  try {
    const { title,category } = req.body;
    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and Category are required",
      });
    }
    const creater = req.id;
    const course = new Course({
      title,
    category, 
    creater
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.log("Error in create course controller", error);
    res.status(500).json({
      success: false,
      message: "Error in course controller",
    });
  }
};

export const getCreaterCoursesController = async (req, res) => {
  try {
    const userId = req.id;
    // console.log(userId);
    const courses = await Course.find({ creater: userId });
    if (!courses) {
      return res.status(404).json({
        success: false,
        message: "No courses found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Courses Fetched Successfully",
      courses,
    });
  } catch (error) {
    console.log("Error in get creater courses controller", error);
    res.status(500).json({
      success: false,
      message: "Error in get creater courses controller",
    });
  }
};

export const updateCreaterCourseController = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, subTitle, level, category, description, price } = req.body;
    const courseThumbnail = req.file;
  
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    let thumbnail;
    if (courseThumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        deleteFromCloudinary(publicId);
      }
      const result = await uploadMediaToCloudinary(courseThumbnail?.path);
      thumbnail = result?.secure_url;
    }

    const updatedData = {
      title,
      subTitle,
      level,
      category,
      description,
      price,
      courseThumbnail: thumbnail,
    };

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updatedData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      updatedCourse,
    });
  } catch (error) {
    console.log("Error in update creater courses controller", error);
    res.status(500).json({
      success: false,
      message: "Error in update creater  courses controller",
    });
  }
};

export const getCourseById = async(req, res) => {
try {
  
  const courseId = req.params.courseId
  const course = await Course.findById(courseId)
  if(!course){
    return res.status(404).json({
      success: false,
      message: "Course not found"
    })
  }
  return res.status(200).json({
    success: true,
    message: "Course fetched successfully",
    course
  })
} catch (error) {
  console.log("Error in getting creater courses controller", error);
  res.status(500).json({
    success: false,
    message: "Error in getting  creater  courses controller",
  });
}
}
