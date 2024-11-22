import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PostForm from './components/PostForm'
import Header from './components/Header'
import ShowPost from './components/ShowPost'

function App() {

  return (
    <>
      <BrowserRouter>
      <Header />  
        <Routes>
          <Route path='/addpost' element={<PostForm />} />
          <Route path='/showpost' element={<ShowPost />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
