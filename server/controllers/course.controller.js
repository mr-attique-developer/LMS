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



export const getCreaterCoursesController = async (req, res) => {
    try {
      const userId = req.id
      console.log(userId)
      // if(!userId){
      //     return res.status(400).json({
      //         success: false,
      //         message: "User not found"
      //     })
      // }
      console.log({userId})
      const courses = await Course.find({creater: userId})
      console.log(courses)

      if(!courses){
          return res.status(404).json({
              success: false,
              message: "No courses found"
          })
      }

      return res.status(200).json({
        success:true,
        message: "Courses Fetched Successfully",
        courses
      })
    } catch (error) {
      console.log( "Error in get creater courses controller", error);
      res.status(500).json({
        success: false,
        message: "Error in get creater courses controller",
      });
    }
}