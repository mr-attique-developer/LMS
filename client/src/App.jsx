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
        path: "/my-learning",
        element: <MyLearning />,
      },
      {
        path: "/profile",
        element: <EditProfile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/course-detail/:courseId",
        element: <CourseDetails />,
      },

      // Admin routing

      {
        path: "/admin",
        element:<Sidebar/>,
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