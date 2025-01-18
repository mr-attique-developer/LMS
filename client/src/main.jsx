import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import { useGetUserProfileQuery } from "./features/api/authApi";
import Spinner from "./components/Spinner";


const CustomLoader = ({ children }) => {
  const { isLoading } = useGetUserProfileQuery();
  return isLoading ? (
    <div >
      <Spinner/>
    </div>
  ) : (
     children 
  );
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <CustomLoader>
          <App />
          <Toaster />
        </CustomLoader>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
