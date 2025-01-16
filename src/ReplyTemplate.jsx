import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostTemplate from "./PostTemplate";
import ReplyPostTemplate from "./ReplyPostTemplate";
import "./App.css"

function ReplyTemplate ({currentUser, replyObject, profileUser, posts}) {

    const [replyPost, setReplyPost] = useState(null);
    const [replyPostUser, setReplyPostUser] = useState(null);
    const [isAReplyParent, setIsAReplyParent] = useState(true);

    useEffect(() => {
        if (replyObject) {
            const postID = replyObject.replyObjectId
            fetch(`http://localhost:6790/api/grabpostbyrepostid/${postID}`)
            .then(response => response.json())
            .then(data => setReplyPost(data))
            .catch(error => console.error(error))
        } else {
            console.log("Epic fail")
        }
    }, [replyObject])

    useEffect(() => {
        if (replyObject) {
            const postID = replyObject.replySenderId
            fetch(`http://localhost:6790/api/users/${postID}`)
            .then(response => response.json())
            .then(data => setReplyPostUser(data))
            .catch(error => console.error(error))
        }
        else {
            console.log("Epic fail")
        }
    }, [replyPost])

    useEffect(() => {
        console.log("Reply Object is: " + JSON.stringify(replyObject))
        console.log("Reply object is: " + replyObject)
    }, [replyObject])

    useEffect(() => {
        console.log("Reply Post is: " + JSON.stringify(replyPost))
        console.log("Reply Post is: " + replyPost)
    }, [replyPost])

    useEffect(() => {
        console.log("Reply Post User is: " + JSON.stringify(replyPostUser))
        console.log("Reply Post User is: " + replyPostUser)
    }, [replyPostUser])

    return (
        <div>
            {replyObject && replyPost && replyPostUser ? (
                <div className="flex-col w-full h-full">
                    <PostTemplate currentUser={currentUser} replyObject={replyObject} replyPostUser={replyPostUser} post={replyPost} posts={posts} isAReplyParent={isAReplyParent}/>
                </div>

            ) : (
                <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                    <p>Loading...</p>
                </div>
            )}

        </div>
    )
}

export default ReplyTemplate;