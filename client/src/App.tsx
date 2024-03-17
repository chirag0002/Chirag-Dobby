import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import SignUp from "./Pages/SignUp"
import SignIn from "./Pages/SignIn"
import { ProtectedRoutes } from "./components/ProtectedRoutes"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>

      <Route element={<ProtectedRoutes />}>
        <Route path="*" element={<Home />} />
      </Route>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App