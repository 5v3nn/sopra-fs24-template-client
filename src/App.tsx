import React, { useState, createContext } from "react";
import Header from "./components/views/Header";
import AppRouter from "./components/routing/routers/AppRouter";

export const NameContext = createContext();

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 * Updated by Marco Leder
 */
const App = () => {
  const [showName, setShowName] = useState();

  return (
    <div>
      <Header height="100" />
      <NameContext.Provider value={{ showName, setShowName }}>
        <AppRouter />
      </NameContext.Provider>
    </div>
  );
};

export default App;
