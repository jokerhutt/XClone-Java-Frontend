import "./App.css"

import { useState, useEffect } from "react";
import { FaRegComment, FaRegHeart, FaRegChartBar, FaRegBookmark } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";




function PostTemplate ({post, posts}) {

    const [postUser, setPostUser] = useState(null);

    useEffect(() => {
        if (post) {
            const postID = post.creatorId
            fetch(`http://localhost:6790/api/users/${postID}`)
            .then(response => response.json())
            .then(data => setPostUser(data))
            .catch(error => console.error(error))
        }
        else (
            alert("Broooo")
        )

    }, [posts, post])

    useEffect(() => {
        console.log("Post user template user is + " + JSON.stringify(postUser))
    }, [postUser])

    return(
        <>
        {postUser ? (
            <div className="w-full h-full flex pl-4 pr-4 pt-3 flex-grow">

            <div className="flex-[1] flex flex-col w-full h-full mr-4 ">
                <img src={postUser.profilePic} className="rounded-full"/>
            </div>

            <div className="flex flex-col text-white flex-[12]">
                <div className="flex gap-2">
                    <p className="font-bold">{postUser.displayName}</p>
                    <p className="text-twitterBorder">@{postUser.username}</p>
                </div>
                <div className="text-white pt-1 pb-2">
                    <p>{post.postText}</p>
                </div>

                <div className="flex-[1] max-h-5 py-2 text-gray-300 flex justify-between pb-2">
                    <div className="flex items-center gap-2">
                    <FaRegComment className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <FaRetweet className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <FaRegHeart className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
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
            <div>
            <p>Waiting</p>    
            </div>
        )}
</>
    )
}

export default PostTemplate;