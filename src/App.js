import { DragAndDrop } from "./components/dragAndDrop.tsx";
import Login from "./views/login";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Boton } from "./components/testmodal.tsx";
import { UserProvider } from "./hooks/userContext.js";

// <div classNameName="App">
//   <DragAndDrop/>

//   {/* <Login/> */}
// </div>
function App() {


  return (
    <UserProvider>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/boton" element={<Boton />} />
          <Route path="/tareas" element={<DragAndDrop />} />
        </Routes>
      </HashRouter>
    </UserProvider>
  );
}

export default App;
