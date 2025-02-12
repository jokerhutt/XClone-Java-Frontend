import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import "./App.css"
import clsx from 'clsx';

function ReplyingModal ({backGroundColor, buttonColor, tempPostReplies, setTempPostReplies, post, postUser, currentUser, setIsReplyingToggle, setCachedAddedReplies}) {

    const [replyText, setReplyText] = useState("");
    const [characterLength, setCharacterLength] = useState(1);

    useEffect(() => {
        const charsLeft = (replyText.length)
        setCharacterLength(charsLeft)
    },[replyText])

    function handleNewReply () {

        console.log("Reply text is: " + replyText);

        const newReplyPayload = {
            postId: post.postId,
            replyText: replyText,
            replySenderId: currentUser.id,
            replyReceiverId: postUser.id,
            notificationType: "REPLY",
            notificationObject: post.postId, //TODO
            receiverId: postUser.id,
            senderId: currentUser.id 
        };

        fetch('http://localhost:6790/api/newreply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReplyPayload),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to upload post');
            }
        })
        .then(data => {
            console.log("New reply is " + JSON.stringify(data));
            setCachedAddedReplies(prev => [...prev, data]);
            setIsReplyingToggle(false);
            if (tempPostReplies) {
                setTempPostReplies(prev => [...prev, data]);
            }
            alert("Reply Added!");
        })
        .catch(error => console.error(error));
    }

    return (
        <div className="fixed inset-0 h-full z-60 w-screen bg-opacity-55 bg-gray-700 flex flex-col justify-center flex-grow items-center">
            {post && postUser && currentUser ? (
            <div className={clsx ("h-2/3 w-2/5 mb-20 rounded-3xl text-white flex flex-col px-4 gap-6", {
                "bg-dimBackGround": backGroundColor === "dimBackGround",
                "bg-twitterBlack": backGroundColor === "twitterBlack",
            })}>
            <div className="h-10 w-full pt-4 pl-4">
                <p className="hover:cursor-pointer text-white text-xl" onClick={() => setIsReplyingToggle(false)}>X</p>
            </div>
            <div className="flex w-full">
                <div className="w-16 flex-col justify-center h-full mb-0 pb-0">
                    <img src={postUser.profilePic} className="h-12 w-12 rounded-full"/>
                    <div className="flex items-center justify-center h-full bg-none w-full">
                        <div className="bg-none border-r-0.5 border-l-0.5 border-twitterBorder w-0.5 mr-2 border h-4 max-h-20 mb-2 mt-0">
                        </div>
                    </div>
                </div>
                <div className="flex-col w-full gap-2 pl-1">
                    <div>
                        <p > <span className="font-bold">{postUser.displayName}</span> <span className="text-twitterBorder">@{postUser.username}</span></p>
                    </div>
                    <div>
                        <p>{post.postText}</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full">
                <div className="w-16 flex items-center justify-center h-6 bg-none">
                    <div className="bg-none border-r-0.5 border-l-0.5 border-twitterBorder w-0.5 mr-2 border h-full">
                    </div>
                </div>
                <div className="flex-col w-full gap-2 pl-1">
                    <div>
                        <p className="text-twitterBorder"> Replying to <span className={clsx ({
                            "text-twitterRed": buttonColor === "twitterRed",
                            "text-twitterBlue": buttonColor === "twitterBlue",
                            "text-twitterYellow": buttonColor === "twitterYellow",
                            "text-twitterPurple": buttonColor === "twitterPurple",
                        })}>@{postUser.username}</span> </p>
                    </div>
                </div>
            </div>
            <div className="flex w-full" >
                <div className="w-16 flex justify-start items-start">
                    <img src={currentUser.profilePic} className="h-12 w-12 rounded-full"/>
                </div>
                <div className="w-full min-h-14 pl-1">
                    <textarea onChange={(e) => setReplyText(e.target.value)} placeholder="Post your reply" className="resize-none text-xl py-3 w-full h-52 bg-transparent text-gray-100 border-none focus:outline-none"/>
                </div>
            </div>
            <div className="flex w-full h-12 items-end pb-6">
                <div className="w-3/4 h-full flex items-center gap-4 items-ceter pl-1">
                                <CiImageOn className={clsx ("text-xl hover:drop-shadow-[0_0_15px_#1C9BF0] transition duration-300 hover:cursor-pointer", {
                                                                "text-twitterRed": buttonColor === "twitterRed",
                                                                "text-twitterBlue": buttonColor === "twitterBlue",
                                                                "text-twitterYellow": buttonColor === "twitterYellow",
                                                                "text-twitterPurple": buttonColor === "twitterPurple",
                                                                "hover:text-twitterRed": buttonColor === "twitterRed",
                                                                "hover:text-twitterBlue": buttonColor === "twitterBlue",
                                                                "hover:text-twitterYellow": buttonColor === "twitterYellow",
                                                                "hover:text-twitterPurple": buttonColor === "twitterPurple",
                                })}/>
                                <MdOutlineGifBox className={clsx ("text-xl hover:drop-shadow-[0_0_15px_#1C9BF0] transition duration-300 hover:cursor-pointer", {
                                                                "text-twitterRed": buttonColor === "twitterRed",
                                                                "text-twitterBlue": buttonColor === "twitterBlue",
                                                                "text-twitterYellow": buttonColor === "twitterYellow",
                                                                "text-twitterPurple": buttonColor === "twitterPurple",
                                                                "hover:text-twitterRed": buttonColor === "twitterRed",
                                                                "hover:text-twitterBlue": buttonColor === "twitterBlue",
                                                                "hover:text-twitterYellow": buttonColor === "twitterYellow",
                                                                "hover:text-twitterPurple": buttonColor === "twitterPurple",
                                })}/>
                                <BsEmojiSmile className={clsx ("text-l hover:drop-shadow-[0_0_15px_#1C9BF0] transition duration-300 hover:cursor-pointer", {
                                                                "text-twitterRed": buttonColor === "twitterRed",
                                                                "text-twitterBlue": buttonColor === "twitterBlue",
                                                                "text-twitterYellow": buttonColor === "twitterYellow",
                                                                "text-twitterPurple": buttonColor === "twitterPurple",
                                                                "hover:text-twitterRed": buttonColor === "twitterRed",
                                                                "hover:text-twitterBlue": buttonColor === "twitterBlue",
                                                                "hover:text-twitterYellow": buttonColor === "twitterYellow",
                                                                "hover:text-twitterPurple": buttonColor === "twitterPurple",
                                })}/>
                </div>
                <div className="flex justify-end w-full gap-2">
                <div className="relative flex items-center justify-center">
                    <svg className="w-8 h-8 transform rotate-90" xmlns="http://www.w3.org/2000/svg">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="30%"
                            className="stroke-blue-500"
                            strokeWidth="3"
                            fill="transparent"
                            strokeDasharray="60.2" 
                            style={{ strokeDashoffset: `${60.2 - (60.2 * (characterLength / 180))}` }}
                        />
                    </svg>
                </div>
                    <div 
                    className='h-full hover:cursor-pointer bg-white flex justify-center items-center py-1 rounded-l-full rounded-r-full hover:bg-gray-200'
                    onClick={() => handleNewReply()}
                    >
                        <p className="text-black pl-6 pr-6 font-bold ">Reply</p>
                    </div>
                </div>
                </div>
            </div>

            ) : (
                <div className="h-2/3 w-2/5 mb-20 rounded-3xl bg-black">
                </div>
            )}

        </div>
    )
}

export default ReplyingModal;