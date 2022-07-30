import { Login } from './components/login'
import { SignUp } from './components/signUp'

import { Route, Routes } from 'react-router-dom'
import { RouteNotFound } from './components/routeNotFound'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<RouteNotFound />} />
      </Routes>
    </div>
  )
}

export default App
