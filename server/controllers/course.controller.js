import Course from "../models/course.model.js";

export const createCourseController = async (req, res) => {
  try {

    const {title, category}= req.body;
if(!title || !category){
    return res.status(400).json({
        success: false,
        message: "Title and Category are required",
    });
}
const creater = req.id
const course = new Course({
    title,
    category,
    creater
})

await course.save()

res.status(201).json({
    success: true,
    message: "Course created successfully",
    course
})

  } catch (error) {
    console.log("Error in create course controller", error);
    res.status(500).json({
      success: false,
      message: "Error in course controller",
    });
  }
};
