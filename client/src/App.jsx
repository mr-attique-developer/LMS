import './App.css';
import HeroSection from "./pages/student/HeroSection";
import Login from "./pages/Login";
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Courses from './pages/student/Courses';
import MyLearning from './pages/student/MyLearning';
import EditProfile from './pages/student/EditProfile';
import Sidebar from './pages/admin/Sidebar';
import CreateCourse from './pages/admin/Courses/CreateCourse';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import AdminCoursePage from './pages/admin/Courses/AdminCoursePage';
import UpdateCoursePage from './pages/admin/Courses/UpdateCoursePage';
import AddLecturePage from './pages/admin/Lectures/AddLecturePage';
import UpdateLecturePage from './pages/admin/Lectures/UpdateLecturePage';
import CourseDetails from './pages/student/CourseDetails';
import CourseProgress from './pages/student/CourseProgress';
import SearchPage from './pages/student/SearchPage';
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoutes';
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProtectedRoutes';

const AppLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element:
        <>
        
        <HeroSection />
        <Courses />
        </>
      },
      {
        path: "my-learning",
        element:<ProtectedRoute><MyLearning /></ProtectedRoute>,
      },
      {
        path: "profile",
        element: <ProtectedRoute><EditProfile /></ProtectedRoute>,
      },
      {
        path: "course/search",
        element: <ProtectedRoute><SearchPage /></ProtectedRoute>,
      },
      {
        path: "login",
        element:<AuthenticatedUser><Login /></AuthenticatedUser> ,
      },
      {
        path: "course-progress/:courseId",
        element:  <ProtectedRoute>
          <PurchaseCourseProtectedRoute>
          <CourseProgress />
          </PurchaseCourseProtectedRoute>
          </ProtectedRoute>,
      },
      {
        path: "course-detail/:courseId",
        element: <ProtectedRoute><CourseDetails /></ProtectedRoute>,
      },

      // Admin routing

      {
        path: "/admin",
        element:<AdminRoute><Sidebar/></AdminRoute>,
        children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
          {
            path:"courses",
            element:<AdminCoursePage/>
          },
          {
            path:"courses/create",
            element:<CreateCourse/>
          },
          {
            path:"courses/:courseId",
            element:<UpdateCoursePage/>
          },
          {
            path:"courses/:courseId/lecture",
            element:<AddLecturePage/>
          },
          {
            path:"courses/:courseId/lecture/:lectureId",
            element:<UpdateLecturePage/>
          },
        ]

      }
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;