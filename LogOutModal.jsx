import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
  } from "@material-tailwind/react";
  import { useNavigate } from "react-router-dom";


function LogOutModal ({currentUser, isLoggingOut, setIsLoggingOut}) {

    const navigate = useNavigate();

    function handleLogOutNavigate() {
        navigate("/logout")
        setIsLoggingOut(false);
    }

    return (
    <div onClick={() => setIsLoggingOut(!isLoggingOut)}>
    <Popover placement="top" open={isLoggingOut}>
        <PopoverHandler>
            <div
            
            className="bg-transparent h-full relative w-full flex-col">
                <div className="p-2 relative flex h-12 w-full justify-center items-center rounded-l-full rounded-r-full hover:bg-twitterHover hover:cursor-pointer">
                <div className="flex-[1] flex justify-start items-center pl-2">
                    <img src={currentUser.profilePic} className="h-2/3 w-2/3 rounded-full"/>
                </div>
                <div className="flex-[2] flex flex-col justify-center text-white w-full h-full pl-4">
                    <div>
                    <p>{currentUser.displayName}</p>
                    </div>
                    <div >
                        <p className="text-sm text-twitterBorder">@{currentUser.username}</p>
                    </div>
                </div>
                <div className="text-white text-2xl">
                    <HiOutlineDotsHorizontal />
                </div>
                </div>
            </div>
        </PopoverHandler>
        <PopoverContent onClick={() => handleLogOutNavigate()} className="h-10 bg-transparent w-60 px-4 hover:bg-twitterBorder hover:cursor-pointer">
            <div className="text-white font-bold flex items-center justify-center h-full text-base">
                <p>Log out @{currentUser.username}</p>
            </div>
        </PopoverContent>
    </Popover>
    </div>
    )
}

export default LogOutModal