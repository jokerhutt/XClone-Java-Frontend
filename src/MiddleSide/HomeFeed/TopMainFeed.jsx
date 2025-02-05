
import { useState } from "react";
import '../../App.css'
import clsx from 'clsx';
import NewPost from "./NewPost";
function TopMainFeed ({cachedMediaPosts, setCachedMediaPosts, buttonColor, setCurrentUserProfileData, currentUserProfileData, mainFeedTab, setMainFeedTab, forYouFeedContent, setForYouFeedContent, currentUser, setCurrentUser}) {

    function handleTabChange(tabType) {

        // fetchUserFollowingPosts();
        setMainFeedTab(tabType)

    }

    return(
        <div className="flex flex-col flex-grow h-full">
            
            <div className="flex-[1] h-full">
                <div className="flex flex-row justify-center h-full border-s-twitterBorder">
                    <div
                    className="px-4 flex flex-row justify-center items-end h-full w-full" >
                        {mainFeedTab === "FORYOU" ? (
                            <p 
                            onClick={() => handleTabChange("FORYOU")}
                            // hover:cursor-pointer  text-white py-4 font-bold border-b-4 border-b-twitterBlue text-sm
                            className={clsx ("hover:cursor-pointer  text-white py-4 font-bold border-b-4 border-b-twitterBlue text-sm", {
                                "border-b-twitterRed": buttonColor === "twitterRed",
                                "border-b-twitterBlue": buttonColor === "twitterBlue",
                                "border-b-twitterYellow": buttonColor === "twitterYellow",
                                "border-b-twitterPurple": buttonColor === "twitterPurple",
                            })}>For You</p>
                        ) : (
                            <p 
                            onClick={() => handleTabChange("FORYOU")}
                            className="hover:cursor-pointer text-white py-4 font-bold text-sm">For You</p>
                        )}

                    </div>
                    <div className="px-4 flex flex-row justify-center items-end h-full w-full">
                        {mainFeedTab === "FOLLOWING" ? (
                        <p 
                        onClick={() => handleTabChange("FOLLOWING")}
                        className={clsx ("hover:cursor-pointer  text-white py-4 font-bold border-b-4 border-b-twitterBlue text-sm", {
                            "border-b-twitterRed": buttonColor === "twitterRed",
                            "border-b-twitterBlue": buttonColor === "twitterBlue",
                            "border-b-twitterYellow": buttonColor === "twitterYellow",
                            "border-b-twitterPurple": buttonColor === "twitterPurple",
                        })}>Following</p>
                        ) : currentUser ?(
                        <p 
                        onClick={() => handleTabChange("FOLLOWING")}
                        className="hover:cursor-pointer text-white py-4 font-bold text-sm">Following</p>
                        ) : (
                            <p 
                        className="hover:cursor-not-allowed text-white py-4 font-bold text-sm">Following</p>
                        )}

                    </div>
                </div>
            </div>
            <div className="flex-[6] h-full px-4 border border-twitterBorder" >
                <NewPost buttonColor={buttonColor} cachedMediaPosts={cachedMediaPosts} setCachedMediaPosts={setCachedMediaPosts} setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} forYouFeedContent={forYouFeedContent} setForYouFeedContent={setForYouFeedContent} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            </div>
        </div>
    )
}

export default TopMainFeed;