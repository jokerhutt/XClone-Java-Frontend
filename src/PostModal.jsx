import NewPost from "./MiddleSide/HomeFeed/NewPost";
import { useEffect } from "react";

function PostModal ({currentUser, setPosts, isPosting, setIsPosting}) {

    useEffect(() => {
        if (currentUser) {
            console.log("Current User is is: " + JSON.stringify(currentUser))
        }

    }, [currentUser])

    useEffect(() => {
        console.log("Is posting is: " + isPosting)
    }, [isPosting])

    return(
        <>
        {currentUser && setPosts && isPosting ? (
            <div className='fixed inset-0 h-full z-40 w-screen bg-opacity-55 bg-gray-700 flex flex-col justify-start pt-20 flex-grow items-center '>
            <div className='py-8 w-2/5 mb-0 rounded-3xl bg-black text-white flex flex-col px-4 gap-2 justify-center items-center'>
            <div className="w-full px-8 hover:cursor-pointer" onClick={() => setIsPosting(false)}>
                <p className="text-white text-xl">X</p>
            </div>
            <div className="w-full h-full px-8">
                <NewPost setPosts={setPosts} currentUser={currentUser} isPosting={isPosting}/>
            </div>
            </div>
        </div>
        ) : (
            null
        )}
        </>
    )
}

export default PostModal;