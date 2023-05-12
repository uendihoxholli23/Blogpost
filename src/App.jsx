import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//pages
import Home from "./pages/Home";
import CreateUpdate from "./pages/CreateUpdate";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <h1>Blogpost by Wendy</h1>
          <Link to="/">Home</Link>
          <Link to="/admin/blog">Create new blog</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/blog/:id?" element={<CreateUpdate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
