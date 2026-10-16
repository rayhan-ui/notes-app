import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Notes from "./pages/Notes"
import HomePage from "./pages/HomePage"



function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<HomePage/>} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/login" element = {<Login />}/>
        <Route path = "/notes" element = {<Notes />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App