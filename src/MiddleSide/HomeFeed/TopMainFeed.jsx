
import { useState } from "react";
import '../../App.css'
import clsx from 'clsx';
import MobileLeftFeedDrawer from "../../MobileLeftFeedDrawer";
import NewPost from "./NewPost";
import { Drawer } from "@material-tailwind/react";
import { Link } from "react-router-dom";
function TopMainFeed ({cachedMediaPosts, backGroundColor, scrollUp, setCachedMediaPosts, buttonColor, setCurrentUserProfileData, currentUserProfileData, currentUserFollowing, setButtonColor, setBackGroundColor, cachedFollows,  mainFeedTab, setMainFeedTab, forYouFeedContent, setForYouFeedContent, currentUser, setCurrentUser}) {

    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    function handleTabChange(tabType) {
        setMainFeedTab(tabType)

    }

    return(
            <div className="flex flex-col flex-grow h-full relative">
                <div className='md:hidden z-50'>
                        <MobileLeftFeedDrawer cachedFollows={cachedFollows} currentUserFollowing={currentUserFollowing} setButtonColor={setButtonColor} setBackGroundColor={setBackGroundColor} buttonColor={buttonColor} backGroundColor={backGroundColor} open={open} currentUser={currentUser} openDrawer={openDrawer} closeDrawer={closeDrawer}/>
                </div>
            <div className={clsx ("fixed z-40 top-0 w-full md:relative md backdrop-blur-md bg-opacity-7 border-b border-b-twitterBorder md:border-none")}>

                <div className={clsx ('w-full h-16 flex flex-col border-b sticky md:hidden border-b-twitterBorder transition-transform duration-300')}>
                    <div className={clsx ('h-full z-20 w-full flex items-center relative')}>
                        <div className='w-full h-full flex items-center pl-4'>
                        {currentUser ? (
                        <img onClick={openDrawer} className='h-8 rounded-full' src={currentUser.profilePic}/>
                        ) : (
                        <img onClick={openDrawer} className='h-8 rounded-full' src="/DEFAULTPFP.png"/>
                        )}
                        </div>
                        <div className='flex absolute pointer-events: none h-12 w-1/2 left-1/2 and -translate-x-1/2 items-center z-10 justify-center'>
                        <Link className='pointer-events-auto' to="/">
                        <img className='h-7' src="/X.png"/>
                        </Link>
                    </div>
                    </div>
                </div>

                <div className="md:flex-[1] md:h-full">
                    <div className="flex flex-row justify-center h-full border-s-twitterBorder">
                        <div
                        className="px-4 flex flex-row justify-center items-end h-full w-full" >
                            {mainFeedTab === "FORYOU" ? (
                                <p 
                                onClick={() => handleTabChange("FORYOU")}
                                // hover:cursor-pointer  text-white py-4 font-bold border-b-4 border-b-twitterBlue text-sm
                                className={clsx ("hover:cursor-pointer  text-white py-1 md:py-4 font-bold border-b-4 border-b-twitterBlue text-sm", {
                                    "border-b-twitterRed": buttonColor === "twitterRed",
                                    "border-b-twitterBlue": buttonColor === "twitterBlue",
                                    "border-b-twitterYellow": buttonColor === "twitterYellow",
                                    "border-b-twitterPurple": buttonColor === "twitterPurple",
                                })}>For You</p>
                            ) : (
                                <p 
                                onClick={() => handleTabChange("FORYOU")}
                                className="hover:cursor-pointer text-white py-1 md:py-4 font-bold text-sm">For You</p>
                            )}

                        </div>
                        <div className="px-4 flex flex-row justify-center items-end h-full w-full border-l-twitterBorder border-l md:border-none">
                            {mainFeedTab === "FOLLOWING" ? (
                            <p 
                            onClick={() => handleTabChange("FOLLOWING")}
                            className={clsx ("hover:cursor-pointer  text-white py-1 md:py-4 font-bold border-b-4 border-b-twitterBlue text-sm", {
                                "border-b-twitterRed": buttonColor === "twitterRed",
                                "border-b-twitterBlue": buttonColor === "twitterBlue",
                                "border-b-twitterYellow": buttonColor === "twitterYellow",
                                "border-b-twitterPurple": buttonColor === "twitterPurple",
                            })}>Following</p>
                            ) : currentUser ?(
                            <p 
                            onClick={() => handleTabChange("FOLLOWING")}
                            className="hover:cursor-pointer text-white py-1 md:py-4 font-bold text-sm">Following</p>
                            ) : (
                                <p 
                            className="hover:cursor-not-allowed text-white py-1 md:py-4 font-bold text-sm">Following</p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:block flex-[6] h-full px-4 border border-twitterBorder" >
                <NewPost buttonColor={buttonColor} cachedMediaPosts={cachedMediaPosts} setCachedMediaPosts={setCachedMediaPosts} setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} forYouFeedContent={forYouFeedContent} setForYouFeedContent={setForYouFeedContent} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            </div>
        </div>
    )
}

export default TopMainFeed;