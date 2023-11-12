
import './App.css'
import { AuthProvider, useAuth } from './authContext'
import Board from './components/Board'
import Login from './components/Login'

function App() {

  const { token } = useAuth();


  return (
    <AuthProvider>
      {token ? (
        <Board />
      ) : (
        <Login />
      )}
    </AuthProvider>

  )

}

export default App
