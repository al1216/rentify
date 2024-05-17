const { createContext, useState } = require("react");

const StoryContext = createContext();

const Provider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [propertyId, setPropertyId] = useState();
  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    email: "",
    phone: "",
    password: "",
  });

  const valueToShare = {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    propertyId,
    setPropertyId,
    formData,
    setFormData,
  };

  return (
    <StoryContext.Provider value={valueToShare}>
      {children}
    </StoryContext.Provider>
  );
};

export { Provider };

export default StoryContext;
