import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import viteLogo from '/vite.svg'
import { useMemo } from 'react';
import RightFeed from './RightFeed/RightFeed'
import LeftFeed from './LeftSide/LeftFeed'
import MainFeed from './MiddleSide/MainFeed'
import ZoomedPost from './ZoomedPost';
import ProfileFeed from './MiddleSide/ProfileFeed';
import MediaPreviewModal from './MediaPreviewModal';
import './App.css'
import MessageComponent from './MessageComponent';
import BookMarks from './BookMarks';
import NotificationFeed from './MiddleSide/NotificationFeed';
import { cache } from 'react';

function App() {
  const [count, setCount] = useState(0)

  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);


  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowingPosts, setUserFollowingPosts] = useState([]);

  const [forYouPage, setForYouPage] = useState(0);
  const [forYouFeedContent, setForYouFeedContent] = useState([]);
  const [forYouMedia, setForYouMedia] = useState([]);
  const [userLikedPosts, setUserLikedPosts] = useState([]);

  const [cachedLikedPosts, setCachedLikedPosts] = useState({})
  const [cachedBookMarks, setCachedBookMarks] = useState({})
  const [cachedReposts, setCachedReposts] = useState({})
  const [cachedAddedReplies, setCachedAddedReplies] = useState([]);

  const [userNotifications, setUserNotifications] = useState([]);
  const [nonMessageNotifications, setNonMessageNotifications] = useState([]);
  const [messageNotifications, setMessageNotifications] = useState([]);

  const [sampleUsers, setSampleUsers] = useState(null);


  function getForYouFeed () {
    console.log("Fetching!!")
    // fetch(`http://localhost:6790/api/foryoufeed?page=${forYouPage}&size=20`)
    fetch(`http://localhost:6790/api/foryoufeed?page=0&size=10`)
    .then(response => response.json())

    .then(data => {
      const newPosts = data.content;
      setForYouFeedContent([...newPosts]);
    })
    .catch(error => console.error(error));
  }

  useEffect(() => {
    console.log("Usercached is: " + JSON.stringify(cachedLikedPosts))
  }, [cachedLikedPosts])

  useEffect(() => {
    getForYouFeed();
  }, []) 

  useEffect(() => {
    console.log("Important is: " + JSON.stringify(forYouFeedContent))
  }, [forYouFeedContent])

  function grabUserLiked () {
    if (currentUser) {
      const profileUserId = currentUser.id;
      fetch(`http://localhost:6790/api/grabuserlikedpostslist/${profileUserId}`)
      .then(response => response.json())
      .then((data) => {
        const likedPostsCache = data.reduce((acc, like) => {
          if (!acc[like.postId]) {
            acc[like.postId] = [];
          }
          acc[like.postId].push(like); 
          return acc;
        }, {});

        setCachedLikedPosts(likedPostsCache);
      })
      .catch(error => console.error(error));
    }
  }

  function grabUserReposts () {
    if (currentUser) {
      const profileUserId = currentUser.id;
      fetch(`http://localhost:6790/api/userreposts/${profileUserId}`)
      .then(response => response.json())
      .then((data) => {
        const repostsCache = data.reduce((acc, repost) => {
          if (!acc[repost.postId]) {
            acc[repost.postId] = [];
          }
          acc[repost.postId].push(repost); 
          return acc;
        }, {});

        setCachedReposts(repostsCache);
      })
      .catch(error => console.error(error));
    }
  }

  function grabUserBookMarked () {
    if (currentUser) {
      const profileUserId = currentUser.id;
      fetch(`http://localhost:6790/api/grabuserbookmarked/${profileUserId}`)
      .then(response => response.json())
      .then((data) => {
        const bookmarkedPostsCache = data.reduce((acc, bookmark) => {
          if (!acc[bookmark.postId]) {
            acc[bookmark.postId] = [];
          }
          acc[bookmark.postId].push(bookmark); 
          return acc;
        }, {});
        setCachedBookMarks(bookmarkedPostsCache);
      })
      .catch(error => console.error(error));
    }
  }

  useEffect(() => {
    if (currentUser) {
      grabUserBookMarked()
    }
  }, [currentUser])

  useEffect(() => {
    console.log("user bookmarked is " + JSON.stringify(cachedBookMarks))
  }, [cachedBookMarks])






  // SAMPLEPOSTS
  useEffect(() => {
    fetch('http://localhost:6790/api/sampleusers')
    .then(response => response.json())
    .then(data => setSampleUsers([...data]))
    .then(console.log("Sample users is " + sampleUsers))
    .catch(error => console.error(error));
  }, []);


// //FOLLOW SECTION

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
    grabUserLiked()
  }, [currentUser])

  const likedPostIdsSet = useMemo(() => {
    return new Set(userLikedPosts.map(post => post.postId));
  }, [userLikedPosts]);

  // useEffect(() => {
  //   fetchUserFollowingPosts()
  // }, [userFollowing])
  
  
//   //NOTIFICATIONS SECTION
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
    const tempMessageNotifications = userNotifications.filter(notification => notification.notificationType === "MESSAGE");
    setNonMessageNotifications([...tempNonMessageNotifications]);
    setMessageNotifications([...tempMessageNotifications]);
  }, [userNotifications])

  
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
              <MainFeed cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} setUserLikedPosts={setUserLikedPosts} likedPostIdsSet={likedPostIdsSet} currentUser={currentUser} setCurrentUser={setCurrentUser} forYouFeedContent={forYouFeedContent} setForYouFeedContent={forYouFeedContent}/>}
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
              <ZoomedPost cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} currentUser={currentUser} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts}/>
              }/>

            <Route
              path="/imagepreview/:postId/:position"
              element={
              <MediaPreviewModal currentUser={currentUser}/>
              }/>

            <Route
              path="/bookmarks/:userId"
              element={
              <BookMarks cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} currentUser={currentUser} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts}/>
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
