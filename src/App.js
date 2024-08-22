import axios from 'axios';
import FormData from 'form-data'
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Timeline from './pages/Timeline';
import NewPost from './pages/NewPost';
import SinglePost from './components/SinglePost';
import DeletePost from './components/DeletePost';
import DeleteUser from './components/DeleteUser';
import UpdateUser from './components/UpdateUser';
import AllUsers from './components/AllUsers';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import SingleUser from './components/SingleUser';
import Logout from './components/Logout';
import GetFollowing from './components/GetFollowing';
import GetFollowers from './components/GetFollowers';
import PostContextProvider from './contexts/PostContext';
import Settings from './pages/Settings';
import Chat from './pages/Chat';
import Messages from './pages/Messages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>

      <Route path='/home' element={<Navbar />} >
      <Route path='timeline' element={<Timeline />}/>
      <Route path='newpost' element={<NewPost />} />
      <Route path=':postId' element={<SinglePost />} />
      <Route path='posts/:postId' element={<DeletePost />} />
      <Route path='users' element={<AllUsers />} />
      <Route path='deleteuser' element={<DeleteUser />} />
      <Route path='updateuser' element = {<UpdateUser />} />
      <Route path='users/:userId' element={<SingleUser />} />
      <Route path='users/:userId/following' element={<GetFollowing />} />
      <Route path='users/:userId/followers' element={<GetFollowers />} />
      <Route path='settings' element={<Settings />} />
      <Route path='messages' element={<Messages />} />
      <Route path='users/:userId/chats' element={<Chat />} />
      <Route path='logout' element={<Logout />} />
      </Route>

    </Route>
  )
)

function App() {

  return (
    <PostContextProvider>
      <RouterProvider router={router}>
      </RouterProvider>
      </PostContextProvider>
  );
}

export default App;
