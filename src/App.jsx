import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import viteLogo from '/vite.svg'
import RightFeed from './RightFeed/RightFeed'
import LeftFeed from './LeftSide/LeftFeed'
import MainFeed from './MiddleSide/MainFeed'
import ZoomedPost from './ZoomedPost';
import ProfileFeed from './MiddleSide/ProfileFeed';
import './App.css'
import MessageComponent from './MessageComponent';
import BookMarks from './BookMarks';
import NotificationFeed from './MiddleSide/NotificationFeed';

function App() {
  const [count, setCount] = useState(0)

  const [currentUser, setCurrentUser] = useState(null);
  const [sampleUsers, setSampleUsers] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [doubleParamMessage, setDoubleParamMessage] = useState(true);
  const [userFollowingPosts, setUserFollowingPosts] = useState([]);
  const [nonMessageNotifications, setNonMessageNotifications] = useState([]);
  const [messageNotifications, setMessageNotifications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6790/api/sampleusers')
    .then(response => response.json())
    .then(data => setSampleUsers([...data]))
    .then(console.log("Sample users is " + sampleUsers))
    .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    console.log("User notifs is really: " + JSON.stringify(userNotifications));
  }, [userNotifications])

  function fetchUserFollowingPosts() {

    if (userFollowing) {
      const userFollowingIds = userFollowing.map((following) => following.followedId);
      
      fetch('http://localhost:6790/api/grabuserfollowingposts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userFollowingIds: userFollowingIds })  // Send the array in the request body
    })
      .then(response => response.json())
      .then(data => {
        console.log("Fetched following users posts data:", JSON.stringify(data)); // Check the response here
        setUserFollowingPosts([...data]);
    })
      .then(console.log("user following posts is " + JSON.stringify(userFollowingPosts)))
      .catch(error => console.error(error));

    }
  }

  useEffect(() => {
    fetchUserFollowingPosts()
  }, [userFollowing])

  useEffect(() => {
    if (currentUser) {
      const profileUserId = currentUser.id;
      fetch(`http://localhost:6790/api/grabuserfollowing/${profileUserId}`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched following data:", data); // Check the response here
        setUserFollowing([...data]);
    })
      .then(console.log("user following is " + userFollowing))
      .catch(error => console.error(error));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const profileUserId = currentUser.id;
      fetch(`http://localhost:6790/api/grabuserfollowers/${profileUserId}`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched followers data:", data); // Check the response here
        setUserFollowers([...data]);
    })
      .then(console.log("user userfollowers is " + userFollowers))
      .catch(error => console.error(error));
    }
  }, [currentUser])



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

  function handleNewFollow(followedId, followingId) {
    const newFollowInformation = {
      followedId: followedId,
      followingId: followingId,
      notificationType: "FOLLOW",
      notificationObject: followedId,
      receiverId: followedId,
      senderId: followingId 
  };
  const decryptedPayload = JSON.stringify(newFollowInformation)
  console.log("Super Secret Repost Information is being sent..." + newFollowInformation)

  fetch('http://localhost:6790/api/newfollow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFollowInformation),
    })
    .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Failed to Follow');
      }
  })
  .then((data) => {
        alert('Follow added successfully!');
        console.log("Response is " + JSON.stringify(data));
        setUserFollowing([...data]);  
        console.log(JSON.stringify(data));
  });
  }

  function refreshNotifications () {
    if (currentUser) {
      const profileUserId = currentUser.id;
      fetch(`http://localhost:6790/api/notifications/${profileUserId}`)
      .then(response => response.json())
      .then(data => setUserNotifications([...data]))
      .catch(error => console.error(error));  
    }
  }

  useEffect(() => {
    if (currentUser) {
      refreshNotifications();
    }
  }, [currentUser])



  useEffect(() => {
    const tempNonMessageNotifications = userNotifications.filter(notification => notification.notificationType !== "MESSAGE");
    setNonMessageNotifications([...tempNonMessageNotifications]);
  }, [userNotifications])

  useEffect(() => {
    const tempMessageNotifications = userNotifications.filter(notification => notification.notificationType === "MESSAGE");
    setMessageNotifications([...tempMessageNotifications]);
  }, [userNotifications])


  useEffect(() => {
    console.log("Updated notifications state:", userNotifications); // Logs whenever sampleUsers changes
  }, [userNotifications]);

  
  return (
    <Router>
    <>
      <div>

      <div className='grid grid-cols-12 h-screen w-screen'>
        <div className='flex bg-black h-screen flex-col col-span-3'>
          <LeftFeed currentUser={currentUser} setCurrentUser={setCurrentUser} nonMessageNotifications={nonMessageNotifications} setPosts={setPosts} setUserNotifications={setUserNotifications}/>
        </div>
        <div className='flex bg-black h-full flex-col col-span-5 overflow-y-auto scrollbar-none pb-10'>
        <Routes>
            <Route 
              path="/" 
              element={
              <MainFeed fetchUserFollowingPosts={fetchUserFollowingPosts} userFollowingPosts={userFollowingPosts} currentUser={currentUser} setCurrentUser={setCurrentUser} posts={posts} setPosts={setPosts}/>}
            />

            <Route 
              path="/:profileUserId" 
              element={
              <ProfileFeed handleNewFollow={handleNewFollow} userFollowing={userFollowing} userFollowers={userFollowers} currentUser={currentUser} setCurrentUser={setCurrentUser} posts={posts} setPosts={setPosts}/>}
            />

            <Route 
              path="/notifications/:profileUserId" 
              element={
              <NotificationFeed nonMessageNotifications={nonMessageNotifications} currentUser={currentUser}/>}
            />

            <Route
              path="/post/:postId"
              element={
              <ZoomedPost currentUser={currentUser}/>
              }/>

            <Route
              path="/bookmarks/:userId"
              element={
              <BookMarks currentUser={currentUser}/>
              }/>
            
            <Route 
              path="/messages/:userId"
              element={
                <MessageComponent currentUser={currentUser} messageNotifications={messageNotifications} refreshNotifications={refreshNotifications} userNotifications={userNotifications}/>
              }
            />

            <Route 
              path="/messages/:userId/:otherUserId"
              element={
                <MessageComponent currentUser={currentUser} messageNotifications={messageNotifications} refreshNotifications={refreshNotifications} userNotifications={userNotifications}/>
              }
            />

            {/* <Route 
              path="/explore" 
              element={
              <MainFeed currentUser={currentUser} setCurrentUser={setCurrentUser} posts={posts} setPosts={setPosts}/>}
            /> */}
        </Routes>
        </div>
        <div className='flex bg-black h-screen flex-col col-span-4'>
          <RightFeed sampleUsers={sampleUsers} currentUser={currentUser} setCurrentUser={setCurrentUser} userFollowing={userFollowing} handleNewFollow={handleNewFollow}/>
        </div>
      </div>
      
      </div>
    </>
    </Router>
  )
}

export default App
