import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import viteLogo from '/vite.svg'
import RightFeed from './RightFeed/RightFeed'
import LeftFeed from './LeftSide/LeftFeed'
import MainFeed from './MiddleSide/MainFeed'
import ProfileFeed from './MiddleSide/ProfileFeed';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [currentUser, setCurrentUser] = useState(null);

  const [sampleUsers, setSampleUsers] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6790/api/sampleusers')
    .then(response => response.json())
    .then(data => setSampleUsers([...data]))
    .then(console.log("Sample users is " + sampleUsers))
    .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    console.log("Updated sampleUsers state:", sampleUsers); // Logs whenever sampleUsers changes
  }, [sampleUsers]);

  useEffect(() => {
    fetch('http://localhost:6790/api/sampleposts')
    .then(response => response.json())
    .then(data => setPosts([...data]))
    .catch(error => console.error(error));
  }, [currentUser]);

  useEffect(() => {
    console.log("Updated posts state:", posts); // Logs whenever sampleUsers changes
  }, [posts]);

  
  return (
    <Router>
    <>
      <div>

      <div className='grid grid-cols-12 h-screen w-screen'>
        <div className='flex bg-black h-screen flex-col col-span-3'>
          <LeftFeed currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </div>
        <div className='flex bg-black h-screen flex-col col-span-5'>
          <Routes>

            <Route 
              path="/" 
              element={
              <MainFeed currentUser={currentUser} setCurrentUser={setCurrentUser} posts={posts} setPosts={setPosts}/>}
            />

            <Route 
              path="/:profileUserId" 
              element={
              <ProfileFeed currentUser={currentUser} setCurrentUser={setCurrentUser} posts={posts} setPosts={setPosts}/>}
            />
            

            {/* <Route 
              path="/explore" 
              element={
              <MainFeed currentUser={currentUser} setCurrentUser={setCurrentUser} posts={posts} setPosts={setPosts}/>}
            /> */}

          </Routes>
        </div>
        <div className='flex bg-black h-screen flex-col col-span-4'>
          <RightFeed sampleUsers={sampleUsers} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </div>
      </div>
      </div>
    </>
    </Router>
  )
}

export default App
