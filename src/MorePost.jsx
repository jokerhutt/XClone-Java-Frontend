import { FaRegTrashAlt } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { FaRegComment } from "react-icons/fa6";

function handleDeletePost () {
    
}

function MorePost () {
    return (
        <>
            <div className="flex items-center pl-4 text-red-500 hover:bg-gray-700 cursor-pointer">
                <FaRegTrashAlt />
                <p className="px-4 py-2">Delete</p>
            </div>
            <div className="flex items-center  hover:bg-gray-700 cursor-pointer pl-4">  
                <TiPin />
                <p className="px-4 py-2">Pin to profile</p>
            </div>
            <div className="flex items-center pl-4 hover:bg-gray-700 cursor-pointer">
                <FaRegComment />
                <p className="px-4 py-2">Change who can reply</p>
            </div>
        </>
    )
}

export default MorePost;