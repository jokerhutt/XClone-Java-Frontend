import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostTemplate from "./PostTemplate";
import ReplyPostTemplate from "./ReplyPostTemplate";
import "./App.css"

function ReplyTemplate ({currentUser, replyObject, profileUser, isAReplyParent, isZoomedInMode}) {

    const [replyPost, setReplyPost] = useState(null);
    const [replyPostUser, setReplyPostUser] = useState(null);

    useEffect(() => {
        if (replyObject) {
            const postId = replyObject.replyObjectId
            fetch(`http://localhost:6790/api/posts/${postId}`)
            .then(response => response.json())
            .then(data => setReplyPost(data))
            .catch(error => console.error(error))
        } else {
            console.log("Epic fail")
        }
    }, [replyObject])

    useEffect(() => {
        console.log("Reply Object is: " + JSON.stringify(replyObject))
        console.log("Reply object is: " + replyObject)
    }, [replyObject])

    useEffect(() => {
        console.log("Reply Post is: " + JSON.stringify(replyPost))
        console.log("Reply Post is: " + replyPost)
    }, [replyPost])


    return (
        <div>
            {replyObject && replyPost && isAReplyParent ? (
                <div className="flex-col w-full h-full">
                    <PostTemplate currentUser={currentUser} replyObject={replyObject} post={replyPost} isAReplyParent={isAReplyParent}/>
                </div>

            ) : (
                <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                    <p>REPLYTEMPLATE LOADING...</p>
                </div>
            )}

        </div>
    )
}

export default ReplyTemplate;