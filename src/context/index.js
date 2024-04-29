import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [blogList, setBlogList] = useState([]);
  const [pending, setPending] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  let BASE_URL = "https://blogmernbackend-fcc.onrender.com";

  return (
    <GlobalContext.Provider
      value={{
        blogList,
        setBlogList,
        pending,
        setPending,
        formData,
        setFormData,
        isEdit,
        setIsEdit,
        BASE_URL,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
