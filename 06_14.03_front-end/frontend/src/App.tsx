//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import ManageProducts from './Pages/ManageProducts'
import Arrayd from './Pages/Arrayd'
import Menu from './components/Menu'
import ManageCategories from './Pages/ManageCategories'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Orders from './Pages/Orders'
import SingleProduct from './Pages/SingleProduct'
import EditProduct from './Pages/EditProduct'

function App() {
  
  return (
    <>
    
    
{/* localhost:5173/ --> <div>MainPage</div> */}

    <Menu />
    
    <Routes>
      <Route path="/" element={ <MainPage /> }/>
      <Route path="/admin/products" element={ <ManageProducts /> }/>
      <Route path="/admin/categories" element={ <ManageCategories /> }/>
      <Route path="/admin/editproduct/:productId" element={ <EditProduct /> }/>

      <Route path="/arrays" element={ <Arrayd /> }/>
      <Route path="/cart" element={ <Cart /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route path="/signup" element={ <Signup /> }/>
      <Route path="/orders" element={ <Orders /> }/>
      <Route path="/product/:productId" element={ <SingleProduct /> }/>

      <Route path="/*" element={ <div>Page not found</div> }/>

    </Routes>

    </>   
  )
}

// key={}
// react soovib mällu jätta kui toimuvad re renderdused, siis ta jätab kõik mällu
//vä tsukli sisud, sest pole mingit aimu mille järgi seda meelde jätta
//selle jaoks et ta saaks array meelde jätta lisame key={}

export default App
