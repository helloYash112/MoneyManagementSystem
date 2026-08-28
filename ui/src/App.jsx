
import './App.css'
import {RouterProvider} from 'react-router-dom'
import {routers} from './router.js'



function App() {
 

  return (
    <>
    <RouterProvider router={routers}></RouterProvider>
      
    </>
  )
}

export default App
