import { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [myState, setMyState] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [categoryCurrent, setCategoryCurrent] = useState("");

  const [task, setTask] = useState({
    title: "",
    url: "",
    description: "",
    category: "",
  });

  console.log(myState);

  return (
    <StateContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        myState,
        setMyState,
        task,
        setTask,
        categoryCurrent,
        setCategoryCurrent,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
