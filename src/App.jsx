import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import viteLogo from '/vite.svg'
import { useMemo } from 'react';
import RightFeed from './RightFeed/RightFeed'
import { SocketProvider, useSocket } from './SocketContext';
import LeftFeed from './LeftSide/LeftFeed'
import MainFeed from './MiddleSide/MainFeed'
import LogOutPage from '../LogOutPage';
import ZoomedPost from './ZoomedPost';
import ProfileFeed from './MiddleSide/ProfileFeed';
import MediaPreviewModal from './MediaPreviewModal';
import MobileLeftFeedDrawer from './MobileLeftFeedDrawer';
import MobileNavigationFooter from './MobileNavigationFooter';
import { Link } from "react-router-dom";
import MobileComposePost from './MobileComposePost';
import TopMainFeed from './MiddleSide/HomeFeed/TopMainFeed';
import { useNavigate } from "react-router-dom";
import clsx from 'clsx';

import './App.css'

import MessageComponent from './MessageComponent';
import BookMarks from './BookMarks';
import NotificationFeed from './MiddleSide/NotificationFeed';
import { cache } from 'react';
import { button } from '@material-tailwind/react';

function App() {
  const [count, setCount] = useState(0)

  const [backGroundColor, setBackGroundColor] = useState('twitterBlack');
  const [buttonColor, setButtonColor] = useState('twitterBlue');
  const [mainFeedTab, setMainFeedTab] = useState("FORYOU");
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [cachedProfiles, setCachedProfiles] = useState({});

  const [mobileHeaderState, setMobileHeaderState] = useState("HOME");
  
  const [currentUserProfileData, setCurrentUserProfileData] = useState({})

  const socket = useSocket();

  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);


  const [notificationCache, setNotificationCache] = useState({});
  const [convoCache, setConvoCache] = useState({});
  const [messageNotificationCache, setMessageNotificationCache] = useState({});
  const [userNotifications, setUserNotifications] = useState([]);
  const [nonMessageNotifications, setNonMessageNotifications] = useState([]);
  const [messageNotifications, setMessageNotifications] = useState([]);
  const [hasMessages, setHasMessages] = useState(false);
  

  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const [forYouPage, setForYouPage] = useState(0);
  const [forYouFeedContent, setForYouFeedContent] = useState([]);
  const [followingFeedContent, setFollowingFeedContent] = useState([]);

  const [cachedMediaPosts, setCachedMediaPosts] = useState({});

  
  const [userLikedPosts, setUserLikedPosts] = useState([]);
  const [cachedLikedPosts, setCachedLikedPosts] = useState({})
  const [cachedFollows, setCachedFollows] = useState({})
  const [cachedBookMarks, setCachedBookMarks] = useState({})
  const [bookMarkContent, setBookMarkContent] = useState([])
  const [cachedReposts, setCachedReposts] = useState({})
  const [cachedAddedReplies, setCachedAddedReplies] = useState([]);

  const [sampleUsers, setSampleUsers] = useState(null);


  useEffect(() => {
    console.log("Current socket state:", socket);
}, [socket]);

  useEffect(() => {
    if (socket) {
        console.log("✅ Socket connected in App:", socket);
        socket.onmessage = (msg) => {
            console.log("App received message:", msg.data);
        };
    }
}, [socket]);

useEffect(() => {

  if (socket) {
    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log("New message received: " + JSON.stringify(receivedMessage));

      if (receivedMessage && currentUser) {
        if (receivedMessage.receiverId !== currentUser.id && receivedMessage.senderId !== currentUser.id) {
          console.warn("Message not relevant for this user, ignoring.");
          return;
       }
      }
      if (receivedMessage) {
        setConvoCache((prevCache) => {

          const conversationId = receivedMessage.conversationId;

          return {
            ...prevCache, [conversationId]: {
                ...prevCache[conversationId],

                messages: [...prevCache[conversationId].messages, receivedMessage],

                convo: {
                    ...prevCache[conversationId].convo,
                    lastMessageId: receivedMessage.messageId,
                    lastMessageText: receivedMessage.messageText,
                    lastMessageCreatedAt: receivedMessage.createdAt,
                },
            },
        };
      });

      if (currentUser && receivedMessage.receiverId === currentUser.id) {
        fetchMessageNotifications();
      }
      }

  };
  }
  return () => {
    if (socket) {
        socket.onmessage = null;
    }
};

}, [socket]);

useEffect(() => {
  getForYouFeed(forYouPage);
}, []) 

useEffect(() => {
  if (currentUser) {
    fetchUserConvos()
  }
}, [currentUser])

useEffect(() => {
  if (currentUser) {
    getUserProfile();
  }
}, [currentUser])

useEffect(() => {
  console.log("CURRENT USER IS " + JSON.stringify(currentUser))
}, [currentUser])

useEffect(() => {
  if (currentUser) {
    grabUserBookMarked()
  }
}, [currentUser])

useEffect(() => {
  if (currentUser) {
    getUserBookMarkedContent()
  }
}, [currentUser])

useEffect(() => {
  fetch('http://localhost:6790/api/sampleusers')
  .then(response => response.json())
  .then(data => setSampleUsers([...data]))
  .then(console.log("Sample users is " + sampleUsers))
  .catch(error => console.error(error));
}, []);

useEffect(() => {
  if (currentUser) {
    const profileUserId = currentUser.id;
    fetch(`http://localhost:6790/api/grabuserfollowers/${profileUserId}`)
    .then(response => response.json())
    .then(data => {
      console.log("Fetched followers data: " + data); 
      setUserFollowers([...data]);
  })
    .then(console.log("user userfollowers is " + userFollowers))
    .catch(error => console.error(error));
  }
}, [currentUser])

useEffect(() => {
  if (currentUser) {
    const profileUserId = currentUser.id;
    fetch(`http://localhost:6790/api/grabuserfollowing/${profileUserId}`)
    .then(response => response.json())
    .then(data => {
      console.log("Fetched following data:", data);
      setUserFollowing([...data]);
  })
    .then(console.log("user following is " + userFollowing))
    .catch(error => console.error(error));
  }
}, [currentUser]);

useEffect(() => {
  console.log("BADASS CACHE NOTIFICATIONS IS" + JSON.stringify(notificationCache))
}, [notificationCache])

useEffect(() => {
  grabUserLiked()
  grabUserReposts()
}, [currentUser])

useEffect(() => {
  if (currentUser) {
    getFollowingFeed()
  }
}, [userFollowing])



function sortMediaCachedPosts (passedPosts) {
  console.log("PASSED POSTS IS " + JSON.stringify(passedPosts) + " AND ITS LENGTH IS " + passedPosts.length);
  for (let i = 0; i < passedPosts.length; i++){
    const currPost = passedPosts[i];
    if (currPost.mediaList.length > 0 && !cachedMediaPosts[currPost.id]) {
      setCachedMediaPosts(prevCache => ({
        ...prevCache,
        [currPost.postId]: currPost
      }));
    }
  }
}

  function fetchUserConvos () {
    fetch(`http://localhost:6790/api/userconversations/${currentUser.id}`)
    .then(res => res.json())
        .then(data => {
            const formattedConvos = data.reduce((acc, convo) => { 
                acc[convo.id] = {
                    convo,
                    messages: [],
                    otherUser: null,
                };
                return acc;
            }, {});
            fetchUserConvoMessages(formattedConvos);
        });
  }



  function fetchUserConvoMessages (formattedConvos) {
    fetch(`http://localhost:6790/api/userconversationsmessages/${currentUser.id}`)
    .then(res => res.json())
    .then(messages => {
      const updatedConvos = { ...formattedConvos };
      messages.forEach(msg => {
          if (!updatedConvos[msg.conversationId]) {
              updatedConvos[msg.conversationId] = { convo: null, messages: [], otherUser: null };
          }
          updatedConvos[msg.conversationId].messages.push(msg);
      });
      fetchUserConvosUsers(updatedConvos);
  });

  }

  function fetchUserConvosUsers (updatedConvos) {
    fetch(`http://localhost:6790/api/userconversationsotherusers/${currentUser.id}`)
    .then(res => res.json())
    .then(otherUsers => {
      otherUsers.forEach(user => {
          const convoId = Object.keys(updatedConvos).find(convoId => {
              return updatedConvos[convoId].convo.user1Id === user.id || 
                     updatedConvos[convoId].convo.user2Id === user.id;
          });
          if (convoId) {
              updatedConvos[convoId].otherUser = user;
          }
      });

      setConvoCache(updatedConvos);
  });
  }


  function getUserProfile () {
    if (currentUser) {
      const profileUserId = currentUser.id
      if (cachedProfiles[profileUserId]) {
          console.log("Using cached data for user " + profileUserId);
          setCurrentUserProfileData(cachedProfiles[profileUserId]);
          return;
      }
  
      console.log("Fetching fresh data for user " + profileUserId);
  
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


  function changeForYouFeed () {
    console.log("For you feed stuff")
    const tempForYouPage = forYouPage + 1;
    getForYouFeed(tempForYouPage)
  }

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

  function getFollowingFeed () {
    console.log("Fetching following feed")
    if (currentUser) {
      const profileUserId = currentUser.id;
      fetch(`http://localhost:6790/api/followingfeed/${profileUserId}?page=0&size=10`)
      .then(response => response.json())
      .then(data => {
        const newFollowingPosts = data.content;
        setFollowingFeedContent([...newFollowingPosts]);
        sortMediaCachedPosts(newFollowingPosts)
      })
      .catch(error => console.error(error));
    }
    
  }

  function getUserBookMarkedContent () {
    console.log("Fetching bookmark feed")
    if (currentUser) {
      const profileUserId = currentUser.id;
      fetch(`http://localhost:6790/api/grabuserbookmarkedposts/${profileUserId}`)
      .then(response => response.json())
      .then(data => {
        console.log("BOOKMARKES DATA IS " + JSON.stringify(data))
        const newBookMarked = [...data];
        setBookMarkContent([...newBookMarked]);
      })
      .catch(error => console.error(error));
    }
  }

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

  function updateUserFollowing() {
    if (currentUser) {
      const profileUserId = currentUser.id;
      fetch(`http://localhost:6790/api/grabuserfollowing/${profileUserId}`)
      .then(response => response.json())
      .then((data) => {
        console.log("USER FOLLOWING LENGTH IS: " + data.length)
        setCurrentUserFollowing(data.length)
      })
    }
}

  function grabUserFollowing () {
    if (currentUser) {
      const profileUserId = currentUser.id;
      fetch(`http://localhost:6790/api/grabuserfollowing/${profileUserId}`)
      .then(response => response.json())
      .then((data) => {
        const followingUsersCache = data.reduce((acc, follow) => {
          if (!acc[follow.followedId]) {
            acc[follow.followedId] = [];
          }
          acc[follow.followedId].push(follow); 
          return acc;
        }, {});
        console.log("USER FOLLOWING LENGTH IS: " + data.length)
        setCurrentUserFollowing(data.length)
        setCachedFollows(followingUsersCache);
      })
      .catch(error => console.error(error));
    }
  }

  useEffect(() => {
    if (currentUser) {
      grabUserFollowing()
    }
  }, [currentUser])

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
    console.log("NEW FOLLOW DATA IS: " + JSON.stringify(data))
      if (data.followedId === followedId) {
        setCachedFollows((prev) => ({
          ...prev,
          [followedId]: data,
      }));
      getFollowingFeed();
      } else {
        setCachedFollows((prev) => {
          const updatedCache = { ...prev };
          delete updatedCache[followedId];
          return updatedCache;
      });
      const newFollowingFeed = followingFeedContent.filter((post) => post.creator.id !== newFollowInformation.followedId)
      console.log("FFC IS " + JSON.stringify(followingFeedContent))
      console.log("NFF IS " + JSON.stringify(newFollowingFeed))
      setFollowingFeedContent([...newFollowingFeed])
      }
      updateUserFollowing();
  });
  }


  const likedPostIdsSet = useMemo(() => {
    return new Set(userLikedPosts.map(post => post.postId));
  }, [userLikedPosts]);

  
  
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

  function fetchMessageNotifications() {
    if (currentUser) {

      const tempNotificationCache = {};

      fetch(`http://localhost:6790/api/messagenotifications/${currentUser.id}`)
      .then((response) => response.json())
      .then((notifications) => {
        console.log("FETCHED MESSAGE NOTIFICATIONS IS " + JSON.stringify(notifications));

        if (notifications.length > 0) {
          setHasMessages(true);
        }
        notifications.forEach((notification) => {
            const convoId = notification.notificationObject;

            if (!tempNotificationCache[convoId]) {
                tempNotificationCache[convoId] = [];
            }
            
            tempNotificationCache[convoId].push(notification);
        });
        setMessageNotificationCache(tempNotificationCache);
    });
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchMessageNotifications();
    }
  }, [currentUser])

  function fetchNotifications() {
    if (currentUser) {
      const tempNotificationCache = {};
  
      fetch(`http://localhost:6790/api/nonmessagenotifications/${currentUser.id}`)
        .then((response) => response.json())
        .then((notifications) => {
          notifications.forEach((notification) => {
            tempNotificationCache[notification.id] = {
              notification: notification,
              notificationPost: null,
              notificationSender: null,
            };
          });
          fetchAssociatedSender(notifications, tempNotificationCache);
        });
    }
  }

  function fetchAssociatedSender(notifications, tempNotificationCache) {

    const userIds = notifications.map((notification) => notification.senderId);
    console.log("USERIDS IS " + JSON.stringify(userIds))

    fetch("http://localhost:6790/api/getallusersbyuserids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userIds: userIds }),
    })
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        const matchingNotifications = Object.values(tempNotificationCache).filter(
          (n) => n.notification.senderId === user.id
        );
        matchingNotifications.forEach((notification) => {
          notification.notificationSender = user;
        });
      });
      fetchAssociatedPosts(notifications, tempNotificationCache);
    });
  }

  useEffect(() => {
    if (currentUser) {
      fetchNotifications();
    }
  }, [currentUser])

  function sendMessage (newMessagePayload) {

    if (!socket) {
      console.error("Socket is not connected!");
      return;
    }

    socket.send(JSON.stringify(newMessagePayload));

  }
  

  function fetchAssociatedPosts(notifications, tempNotificationCache) {
    const postIds = [];
    const replyIds = [];
  
    notifications.forEach((n) => {
      if (n.notificationType === "REPLY") {
        replyIds.push(n.notificationObject);
      } else {
        postIds.push(n.notificationObject);
      }
    });

    console.log("REPLY IDS IS " + JSON.stringify(replyIds))

    if (postIds.length > 0) {
      fetch("http://localhost:6790/api/getallpostsbypostids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postIds: postIds }),
      })
        .then((response) => response.json())
        .then((posts) => {
          posts.forEach((post) => {
            const notification = Object.values(tempNotificationCache).find(
              (n) => n.notification.notificationObject === post.postId
            );
            if (notification) {
              notification.notificationPost = post;
            }
          });
          if (replyIds.length > 0) {
            fetchReplies(replyIds, tempNotificationCache);
          } else {
            setNotificationCache(tempNotificationCache);
          }
        });
    } else if (replyIds.length > 0) {
      fetchReplies(replyIds, tempNotificationCache);
    }
  }

  function fetchReplies(replyIds, tempNotificationCache) {
    console.log("Fetching them replies")
    fetch("http://localhost:6790/api/getallreplypostsbyreplyids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ replyIds: replyIds }),
    })
      .then((response) => response.json())
      .then((posts) => {
        console.log("RESPONSE IS " + JSON.stringify(posts))
        posts.forEach((post) => {
          const notification = Object.values(tempNotificationCache).find(
            (n) => n.notification.notificationObject === post.replyList.find(r => replyIds.includes(r.id))?.id
          );
  
          if (notification) {
            notification.notificationPost = post;
          }
        });
        setNotificationCache(tempNotificationCache);
      });
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

      <div className={clsx('flex flex-col md:grid md:grid-cols-12 h-screen w-screen', {
          "bg-dimBackGround": backGroundColor === "dimBackGround",
          "bg-twitterBlack": backGroundColor === "twitterBlack",
        })}>
        <div className="hidden md:flex max-h-screen h-screen flex-col col-span-3">
          <LeftFeed setBackGroundColor={setBackGroundColor} setButtonColor={setButtonColor} buttonColor={buttonColor} backGroundColor={backGroundColor} hasMessages={hasMessages} setHasMessages={setHasMessages} setForYouFeedContent={setForYouFeedContent} forYouFeedContent={forYouFeedContent} currentUser={currentUser} setCurrentUser={setCurrentUser} nonMessageNotifications={nonMessageNotifications} setPosts={setPosts} setUserNotifications={setUserNotifications}/>
        </div>

        <div className='flex  h-full flex-col col-span-5 overflow-auto scrollable-none'>  
        <Routes>
            <Route 
              path="/" 
              element={
              <MainFeed
              setButtonColor={setButtonColor} setBackGroundColor={setBackGroundColor}
              mainFeedTab={mainFeedTab} setMainFeedTab={setMainFeedTab} backGroundColor={backGroundColor} buttonColor={buttonColor} bookMarkContent={bookMarkContent} setBookMarkContent={setBookMarkContent} setMessageNotificationCache={setMessageNotificationCache} currentUserFollowing={currentUserFollowing} handleNewFollow={handleNewFollow} cachedFollows={cachedFollows} cachedProfiles={cachedProfiles} setCachedProfiles={setCachedProfiles} followingFeedContent={followingFeedContent} cachedMediaPosts={cachedMediaPosts} setCachedMediaPosts={setCachedMediaPosts} setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} changeForYouFeed={changeForYouFeed} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} setUserLikedPosts={setUserLikedPosts} likedPostIdsSet={likedPostIdsSet} currentUser={currentUser} setCurrentUser={setCurrentUser} forYouFeedContent={forYouFeedContent} setForYouFeedContent={setForYouFeedContent}/>}
            />

            <Route 
              path="/:profileUserId" 
              element={
              <ProfileFeed buttonColor={buttonColor} backGroundColor={backGroundColor} bookMarkContent={bookMarkContent} setBookMarkContent={setBookMarkContent} currentUserFollowing={currentUserFollowing} cachedFollows={cachedFollows} setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} cachedProfiles={cachedProfiles} setCachedProfiles={setCachedProfiles} handleNewFollow={handleNewFollow} userFollowing={userFollowing} userFollowers={userFollowers} currentUser={currentUser} setCurrentUser={setCurrentUser} cachedMediaPosts={cachedMediaPosts} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts}/>}
            />

            <Route 
              path="/notifications/:profileUserId" 
              element={
              <NotificationFeed buttonColor={buttonColor} notificationCache={notificationCache} nonMessageNotifications={nonMessageNotifications} currentUser={currentUser}/>}
            />

            <Route
              path="/post/:postId"
              element={
              <ZoomedPost buttonColor={buttonColor} backGroundColor={backGroundColor} bookMarkContent={bookMarkContent} setBookMarkContent={setBookMarkContent} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} currentUser={currentUser} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts}/>
              }/>

            <Route
              path="/imagepreview/:postId/:position"
              element={
              <MediaPreviewModal backGroundColor={backGroundColor} bookMarkContent={bookMarkContent} setBookMarkContent={setBookMarkContent} cachedMediaPosts={cachedMediaPosts} currentUser={currentUser} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts}/>
              }/>

            <Route
              path="/bookmarks/:userId"
              element={
              <BookMarks buttonColor={buttonColor} bookMarkContent={bookMarkContent} setBookMarkContent={setBookMarkContent} setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} currentUser={currentUser} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts}/>
              }/>
            
            <Route 
              path="/messages/:userId"
              element={
                <MessageComponent buttonColor={buttonColor} hasMessages={hasMessages} setHasMessages={setHasMessages} setMessageNotificationCache={setMessageNotificationCache} messageNotificationCache={messageNotificationCache} sendMessage={sendMessage} socket={socket} convoCache={convoCache} setConvoCache={setConvoCache} currentUser={currentUser} messageNotifications={messageNotifications} refreshNotifications={refreshNotifications} userNotifications={userNotifications}/>
              }
            />

            <Route 
              path="/logout"
              element={
                <LogOutPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>
              }
            />

            <Route 
              path="/messages/:userId/:otherUserId"
              element={
                <MessageComponent backGroundColor={backGroundColor} buttonColor={buttonColor} hasMessages={hasMessages} setHasMessages={setHasMessages} setMessageNotificationCache={setMessageNotificationCache} messageNotificationCache={messageNotificationCache} sendMessage={sendMessage} socket={socket} currentUser={currentUser} convoCache={convoCache} setConvoCache={setConvoCache} messageNotifications={messageNotifications} refreshNotifications={refreshNotifications} userNotifications={userNotifications}/>
              }
            />

            <Route 
              path="/compose"
              element={
                <MobileComposePost 
                buttonColor={buttonColor} setCachedMediaPosts={setCachedMediaPosts} currentUserProfileData={currentUserProfileData} setCurrentUserProfileData={setCurrentUserProfileData} backGroundColor={backGroundColor} setForYouFeedContent={setForYouFeedContent} forYouFeedContent={forYouFeedContent} currentUser={currentUser}
                />
              }
            />

            {/* <Route 
              path="/explore" 
              element={
              <MainFeed currentUser={currentUser} setCurrentUser={setCurrentUser} posts={posts} setPosts={setPosts}/>}
            /> */}
        </Routes>
        </div>
        <div className='flex w-full md:hidden h-20 border-t border-t-twitterBorder'>
          <MobileNavigationFooter currentUser={currentUser} hasMessages={hasMessages}/>
        </div>
        <div className='hidden md:flex h-screen max-h-screen flex-col col-span-4'>
          <RightFeed  buttonColor={buttonColor} backGroundColor={backGroundColor} currentUserFollowing={currentUserFollowing} cachedFollows={cachedFollows} sampleUsers={sampleUsers} currentUser={currentUser} setCurrentUser={setCurrentUser} userFollowing={userFollowing} handleNewFollow={handleNewFollow}/>
        </div>
      </div>
      
      </div>
    </>
    </Router>
  )
}

export default App
