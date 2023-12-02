import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import MainLayout from "../component/MainLayout/MainLayout";

import Home from "../page/Home";

function Router(){
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default Router;