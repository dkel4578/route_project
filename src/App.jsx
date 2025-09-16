import './App.css'
import {Routes, Route} from 'react-router-dom'
import ProductPage from "./pages/ProductPage.jsx";
import SalesPage from "./pages/SalesPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import LocationPage from "./pages/LocationPage.jsx";
import PromotionPage from "./pages/PromotionPage.jsx";
import ProductClassificationPage from "./pages/ProductClassificationPage.jsx";
import DatePage from "./pages/DatePage.jsx";
import ChannelPage from "./pages/ChannelPage.jsx";
import UserPage from "./pages/UserPage.jsx";


function App() {

  return (
    <>
        <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/product' element={<ProductPage/>} />
            <Route path='/sales' element={<SalesPage/>} />
            <Route path='/category' element={<CategoryPage/>} />
            <Route path='/location' element={<LocationPage/>} />
            <Route path='/promotion' element={<PromotionPage/>} />
            <Route path='/productClassification' element={<ProductClassificationPage/>} />
            <Route path='/date' element={<DatePage/>} />
            <Route path='/channel' element={<ChannelPage/>} />
            <Route path='/user' element={<UserPage/>} />
        </Routes>

    </>
  )
}

export default App
