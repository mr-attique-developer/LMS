
import { usePurchasedCoursesDetailsWithStatusQuery } from "@/features/api/coursePurchaseApi";
import { useParams, Navigate } from "react-router-dom";

const PurchaseCourseProtectedRoute = ({children}) => {
    const {courseId} = useParams();
    console.log(courseId)
    const {data, isLoading} = usePurchasedCoursesDetailsWithStatusQuery(courseId);

    if(isLoading) return <p>Loading...</p>
    console.log(data)

    return data?.purchase ? children : <Navigate to={`/course-detail/${courseId}`}/>
}
export default PurchaseCourseProtectedRoute;