import { useState, useEffect } from 'react';
import './App.css'
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import PostTemplate from './PostTemplate';

function BookMarks ({currentUser}) {

    const navigate = useNavigate();
    const [userBookMarkedPosts, setUserBookMarkedPosts] = useState([])

    useEffect(() => {
        if (currentUser) {
            const profileUserId = currentUser.id
            console.log("user ID is " + profileUserId)
            fetch(`http://localhost:6790/api/grabuserbookmarkedposts/${profileUserId}`)
            .then(response => response.json())
            .then((data) => setUserBookMarkedPosts(data))
            .catch(error => console.error(error));
        }
    }, [currentUser]);

    return (
            <div className="flex-[320] text-white flex flex-col-reverse justify-end h-full w-full border-l-2 border-r-2 border-twitterBorder">
                {userBookMarkedPosts ? (
                    <>
                    {userBookMarkedPosts.map((post) => 
                        <div className="w-full h-fit pb-2 border-b-2 border-twitterBorder">
                            <PostTemplate currentUser={currentUser} post={post}/>
                        </div>
                    )}
                    </>
                ) : (
                <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                    <p>Loading...</p>
                </div>
                )}

            </div>

    )
}

export default BookMarks;