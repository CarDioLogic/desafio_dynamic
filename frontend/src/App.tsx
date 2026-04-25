import './App.css'
import { Toaster } from "react-hot-toast";
import DevelopersPage from './pages/DevelopersPage'

function App() {

  return (
    <div className='p-4 bg-gradient-to-tl from-slate-200 to-slate-100 h-screen'>
      <DevelopersPage/>
      <Toaster />
    </div>
  )
}

export default App
