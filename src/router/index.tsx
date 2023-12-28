import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import MainLayout from "../component/MainLayout/MainLayout";

import Home from "../page/Home";
import PlayList from "../page/PlayList";

function Router(){
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playList" element={<PlayList />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default Router;