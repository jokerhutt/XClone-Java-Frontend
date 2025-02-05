import "./App.css"
import clsx from 'clsx';
import { useState, useEffect } from "react";
import { FaRegComment, FaRegHeart, FaRegChartBar, FaRegBookmark } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { Link } from "react-router-dom";




function ReplyPostTemplate ({tempReplies, buttonColor, tempPostReplies, cachedAddedReplies, post, ogPostUser}) {

    const [postLikes, setPostLikes] = useState([]);
    const [postReposts, setPostReposts] = useState([]);
    const [replyPostUser, setReplyPostUser] = useState(null);

    useEffect(() => {
        if (post) {
            const profileUserId = post.replySenderId
            fetch(`http://localhost:6790/api/grabusers/${profileUserId}`)
            .then(response => response.json())
            .then(data => setReplyPostUser(data))
            .catch(error => console.error(error))
        }
        else {
            console.log("Epic fail")
        }
    }, [post, cachedAddedReplies])

    useEffect(() => {
        console.log("post is: " + JSON.stringify(post));
        console.log("OG POST USER IS: " + JSON.stringify(ogPostUser));
        console.log("Reply post user is: " + JSON.stringify(replyPostUser));
    }, [])

    return(
        <>
        {replyPostUser && post && ogPostUser ? (
            <div className="w-full h-full flex pl-4 pr-4 pt-3 flex-grow">
            
            <div className="flex-[1] flex flex-col w-full h-full mr-4 ">
                <Link to={`/${replyPostUser.id}`} className="">
                    <img src={replyPostUser.profilePic} className="rounded-full"/>
                </Link>
            </div>


            <div className="flex flex-col text-white flex-[12]">
                    <div>
                    <div className="flex gap-2">
                        <p className="font-bold">{replyPostUser.displayName}</p>
                        <p className="text-twitterBorder">@{replyPostUser.username}</p>
                    </div>
                    <div>
                        <p className="text-twitterBorder"> Replying to <span className={clsx({
                            "text-twitterRed": buttonColor === "twitterRed",
                            "text-twitterBlue": buttonColor === "twitterBlue",
                            "text-twitterYellow": buttonColor === "twitterYellow",
                            "text-twitterPurple": buttonColor === "twitterPurple",
                        })}>@{ogPostUser.username}</span> </p>
                    </div>
                    </div>


                <div className="text-white pt-1 pb-2">
                    <p>{post.replyText}</p>
                </div>

                <div className="flex-[1] max-h-5 py-2 text-gray-300 flex justify-between pb-2">
                        <div className="flex items-center gap-2">
                        <FaRegComment className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                        </div>
                    <div className="flex items-center gap-2">
                    <FaRetweet 
                    className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{postReposts.length}</p>
                    </div>
                        <div className="flex items-center gap-2">
                        <FaRegHeart 
                        className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{postLikes.length}</p>
                        </div>
                    
                    <div className="flex items-center gap-2">
                    <FaRegChartBar className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <FaRegBookmark className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                    </div>
                
                </div>
            </div>

        </div>
        ) : (
            <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                <p>REPLYTEMPLATE LOADING...</p>
             </div>
        )}
</>
    )
}

export default ReplyPostTemplate;