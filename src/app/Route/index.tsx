import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage";
import CreatePage from "../pages/createTaskPage/CreatePage";
import EditPage from "../pages/editTaskPage";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<LandingPage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="edit" element={<EditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
