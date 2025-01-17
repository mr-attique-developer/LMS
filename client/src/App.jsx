import './App.css';
import HeroSection from "./pages/student/HeroSection";
import Login from "./pages/Login";
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Courses from './pages/student/Courses';
import MyLearning from './pages/student/MyLearning';
import EditProfile from './pages/student/EditProfile';

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
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;