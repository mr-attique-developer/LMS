import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";


export const createLectureController = async (req, res) => {
    try {
        
        const courseId= req.params.courseId;
        const { title } = req.body;
        const course = await Course.findById(courseId);

        if (!courseId|| !title) {
            return res.status(404).json({
                success: false,
                message: "Lecture Title is required",
            });
        }
        const lecture = new Lecture({title})
        if(course){
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(201).json({
            success: true,
            message: "Lecture created successfully",
            lecture
        });

    } catch (error) {
        console.log("Error in create lecture controller", error);
        res.status(500).json({
            success: false,
            message: "Error in lecture controller",
        });
        
    }
}