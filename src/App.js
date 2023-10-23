import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserContextProvider } from "./context/UserContext";
import CreatePost from "./components/CreatePost";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
