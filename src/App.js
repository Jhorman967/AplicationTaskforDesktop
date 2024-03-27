import {DragAndDrop} from "./components/dragAndDrop.tsx";
import Login from "./views/login";
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import {Boton}  from "./components/testmodal.tsx";


 // <div classNameName="App">
    //   <DragAndDrop/>

    //   {/* <Login/> */}
    // </div>
function App() {



  return (
    <BrowserRouter>
    <Routes >
    <Route path='/' element={<Login/>}/>
    <Route path="/boton" element={<Boton/>}/>
    <Route path='/tareas' element={<DragAndDrop/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
 