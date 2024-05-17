import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Provider } from "./context/StoryContext";
import Main from "./Main";
import Login from "./Login";
import SignUp from "./SignUp";
import AddProperty from "./FiterAndAddPost/AddPropertyForm";
import PropertyDetail from "./ShowAvailablePosts/PropertyDisplay";

function App() {
  return (
    <Provider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
