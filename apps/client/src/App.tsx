import { Route, Routes } from "react-router-dom";
import { HOME, AUTH, DASHBOARD } from "@/routes/paths";
import { Privates, Publics } from "@/routes/PrivatizationRouts";
import { Login } from "@/features/auth/pages";
import { Dashboard } from "@/components";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import { AuthProvider } from "@/features/auth/context/AuthContext";
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
              path={DASHBOARD}
              element={
                <Privates>
                  <Dashboard />
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
