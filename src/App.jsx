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
  const [cachedProfiles, setCachedProfiles] = useState({});


  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);



  const [forYouPage, setForYouPage] = useState(0);
  const [forYouFeedContent, setForYouFeedContent] = useState([]);

  const [currentUserProfileData, setCurrentUserProfileData] = useState({})

  const [followingFeedContent, setFollowingFeedContent] = useState([]);
  const [userLikedPosts, setUserLikedPosts] = useState([]);

  const [cachedMediaPosts, setCachedMediaPosts] = useState({});

  

  const [cachedLikedPosts, setCachedLikedPosts] = useState({})
  const [cachedBookMarks, setCachedBookMarks] = useState({})
  const [cachedReposts, setCachedReposts] = useState({})
  const [cachedAddedReplies, setCachedAddedReplies] = useState([]);

  const [userNotifications, setUserNotifications] = useState([]);
  const [nonMessageNotifications, setNonMessageNotifications] = useState([]);
  const [messageNotifications, setMessageNotifications] = useState([]);

  const [sampleUsers, setSampleUsers] = useState(null);


  function sortMediaCachedPosts (passedPosts) {
    console.log("PASSED POSTS IS " + JSON.stringify(passedPosts) + " AND ITS LENGTH IS " + passedPosts.length);
    for (let i = 0; i < passedPosts.length; i++){
      const currPost = passedPosts[i];
      console.log("ITERATING POST IS " + JSON.stringify(currPost));
      if (currPost.mediaList.length > 0 && !cachedMediaPosts[currPost.id]) {
        setCachedMediaPosts(prevCache => ({
          ...prevCache,
          [currPost.postId]: currPost
        }));
      }
    }
  }

  useEffect(() => {
    console.log("CURRENT USER DATA POSTS IS: " + JSON.stringify(currentUserProfileData.userPostsAndReposts))
  }, [currentUserProfileData])

  function getUserProfile () {
    if (currentUser) {
      const profileUserId = currentUser.id
      if (cachedProfiles[profileUserId]) {
          console.log("Using cached data for user", profileUserId);
          setCurrentUserProfileData(cachedProfiles[profileUserId]);
          return;
      }
  
      console.log("Fetching fresh data for user", profileUserId);
  
      Promise.all([
          fetch(`http://localhost:6790/api/grabuserrepliedPosts/${profileUserId}`).then(res => res.json()),
          fetch(`http://localhost:6790/api/grabposts/${profileUserId}`).then(res => res.json()),
          fetch(`http://localhost:6790/api/grabpostsandreposts/${profileUserId}`).then(res => res.json()),
          fetch(`http://localhost:6790/api/grabuserlikes/${profileUserId}`).then(res => res.json()),
          fetch(`http://localhost:6790/api/grabusers/${profileUserId}`).then(res => res.json()),
          fetch(`http://localhost:6790/api/grabuserfollowing/${profileUserId}`).then(res => res.json()),
          fetch(`http://localhost:6790/api/grabuserfollowers/${profileUserId}`).then(res => res.json())
      ])
      .then(([replies, posts, postsAndReposts, likes, user, following, followers]) => {
          const userData = {
              userReplies: replies,
              userPosts: posts,
              userPostsAndReposts: postsAndReposts,
              userProfile: user,
              userLiked: likes,
              userFollowing: following,
              userFollowers: followers
      };

      cachedProfiles[profileUserId] = userData;

      setCurrentUserProfileData(userData);
  })
  .catch(error => {
      console.error("Error fetching profile data:", error);
  });

  }
  }

  useEffect(() => {
    if (currentUser) {
      getUserProfile();
    }
  }, [currentUser])




  function changeForYouFeed () {
    console.log("For you feed stuff")
    const tempForYouPage = forYouPage + 1;
    getForYouFeed(tempForYouPage)
  }

  useEffect(() => {
    getForYouFeed(forYouPage);
  }, []) 


  function getForYouFeed (tempForYouPage) {
    console.log("Fetching!!")
    fetch(`http://localhost:6790/api/foryoufeed?page=${tempForYouPage}&size=10`)
    .then(response => response.json())
    .then(data => {
      const newPosts = data.content;
      console.log("FRESHLY SERVED DATA FEED IS " + JSON.stringify(newPosts))
      if (tempForYouPage > 0) {
        console.log("OVER ZERO")
        setForYouFeedContent((prevPosts) => [...prevPosts, ...newPosts]);
      } else {
        console.log("UNDER ZERO")
        setForYouFeedContent([...newPosts]);
      }

      console.log("NEWPOSTS IS " + JSON.stringify(newPosts));
      sortMediaCachedPosts(newPosts);
      setForYouPage(prev => prev + 1);
    })
    .catch(error => console.error(error));
  }


  useEffect(() => {
    console.log("FORYOUFEEDCONTENT UPDATED IS: " + JSON.stringify(forYouFeedContent))
  }, [forYouFeedContent])






















  function getFollowingFeed () {
    console.log("Fetching following feed")
    if (currentUser) {
      const profileUserId = currentUser.id;
      fetch(`http://localhost:6790/api/followingfeed/${profileUserId}/?page=0&size=10`)
      .then(response => response.json())
      .then(data => {
        const newFollowingPosts = data.content;
        setFollowingFeedContent([...newFollowingPosts]);
      })
      .catch(error => console.error(error));
    }
    
  }


  useEffect(() => {
    console.log("Usercached is: " + JSON.stringify(cachedLikedPosts))
  }, [cachedLikedPosts])

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
    grabUserReposts()
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
        <div className='flex bg-black max-h-screen h-screen flex-col col-span-3'>
          <LeftFeed setForYouFeedContent={setForYouFeedContent} forYouFeedContent={forYouFeedContent} currentUser={currentUser} setCurrentUser={setCurrentUser} nonMessageNotifications={nonMessageNotifications} setPosts={setPosts} setUserNotifications={setUserNotifications}/>
        </div>
        <div className='flex bg-black h-full flex-col col-span-5 pb-10 overflow-auto scrollable-none'>
        <Routes>
            <Route 
              path="/" 
              element={
              <MainFeed cachedMediaPosts={cachedMediaPosts} setCachedMediaPosts={setCachedMediaPosts} setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} changeForYouFeed={changeForYouFeed} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} setUserLikedPosts={setUserLikedPosts} likedPostIdsSet={likedPostIdsSet} currentUser={currentUser} setCurrentUser={setCurrentUser} forYouFeedContent={forYouFeedContent} setForYouFeedContent={setForYouFeedContent}/>}
            />

            <Route 
              path="/:profileUserId" 
              element={
              <ProfileFeed setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} cachedProfiles={cachedProfiles} setCachedProfiles={setCachedProfiles} handleNewFollow={handleNewFollow} userFollowing={userFollowing} userFollowers={userFollowers} currentUser={currentUser} setCurrentUser={setCurrentUser} cachedMediaPosts={cachedMediaPosts} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts}/>}
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
              <MediaPreviewModal cachedMediaPosts={cachedMediaPosts} currentUser={currentUser} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts}/>
              }/>

            <Route
              path="/bookmarks/:userId"
              element={
              <BookMarks setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} currentUser={currentUser} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts}/>
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
        <div className='flex bg-black h-screen max-h-screen flex-col col-span-4'>
          <RightFeed sampleUsers={sampleUsers} currentUser={currentUser} setCurrentUser={setCurrentUser} userFollowing={userFollowing} handleNewFollow={handleNewFollow}/>
        </div>
      </div>
      
      </div>
    </>
    </Router>
  )
}

export default App
