import { Route, Routes } from "react-router-dom";
import { HOME, AUTH, DASHBOARD, FORGOT_PASSWORD } from "@/routes/paths";
import { Privates, Publics } from "@/routes/PrivatizationRouts";
import { Login, ForgotPassword } from "@/features/auth/pages";
import { Dashboard } from "@/components";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { UserProvider } from "@/features/user/context/UserContext";
import { CategoryProvider } from "@/features/administrar/context/CategoryContext";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <ToastContainer hideProgressBar theme="colored" />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path={HOME}
              element={
                <Publics>
                  <Login />
                </Publics>
              }
            />
            <Route
              path={AUTH}
              element={
                <Publics>
                  <Login />
                </Publics>
              }
            />
            <Route
              path={FORGOT_PASSWORD}
              element={
                <Publics>
                  <ForgotPassword />
                </Publics>
              }
            />
            <Route
              path={DASHBOARD}
              element={
                <Privates>
                  <UserProvider>
                    <CategoryProvider>
                      <Dashboard />
                    </CategoryProvider>
                  </UserProvider>
                </Privates>
              }
            />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
