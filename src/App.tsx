import { Login } from './components/login'
import { SignUp } from './components/signUp'

import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="*"
          element={
            <main>
              <p>Ops! Rota não existe :(</p>
            </main>
          }
        />
      </Routes>
    </div>
  )
}

export default App
