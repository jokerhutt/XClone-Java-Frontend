import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import FollowersFollowing from '../FollowersFollowing';
import ProfileHoverPopover from '../ProfileHoverPopover';
import '../App.css'

function YouMightLike ({cachedFollows, sampleuser, userFollowing, handleNewFollow, currentUser}) {

    const [toggleFollowing, setToggleFollowing] = useState(false);

    useEffect(() => {
        console.log("SAMPLE USER IS: " + JSON.stringify(sampleuser) + " AND CURRENTUSER IS: " + JSON.stringify(currentUser));
        console.log("Found ID Match Is " + userFollowing.find(follow => follow.followedID === sampleuser.id))
    }, [sampleuser, currentUser])

    return(

        <div className='px-4 py-3 flex w-full h-full hover:cursor-pointer'>
            <Link to={`/${sampleuser.id}`} className='flex-[1]'>
                <ProfileHoverPopover toggleFollowing={toggleFollowing} setToggleFollowing={setToggleFollowing} cachedFollows={cachedFollows} postCreator={sampleuser} currentUser={currentUser} />
            </Link>
            <div className='hidden'>
                    <FollowersFollowing toggleFollowing={toggleFollowing} setToggleFollowing={setToggleFollowing} mainUser={sampleuser} cachedFollows={cachedFollows} currentUser={currentUser}/>
            </div>
            <div className='flex flex-col text-white flex-[3] pl-3'>
                <p className="font-bold">{sampleuser.displayName}</p>
                <p className="text-twitterBorder">@{sampleuser.username}</p>
            </div>
            <div className='h-full w-full text-black flex-[3] flex justify-center items-center'>
                {sampleuser && toggleFollowing ? (
                    <>
                        {toggleFollowing ? (
                            <div 
                            onClick={() => handleNewFollow(sampleuser.id, currentUser.id)}
                            className='h-3/5 w-full bg-black border-white border text-white border-1 flex justify-center items-center rounded-l-full rounded-r-full hover:cursor-pointer hover:border-twitterBorder  hover:bg-white hover:text-black'>
                                <p>Following</p>
                            </div>
                        ) : (
                            <div 
                            onClick={() => handleNewFollow(sampleuser.id, currentUser.id)}
                            className='h-3/5 hover:cursor-pointer w-full bg-white flex justify-center items-center rounded-l-full rounded-r-full hover:bg-gray-200'>
                                <p>Follow</p>
                            </div>
                        )
                        }
                    </>
                ) : (
                    <div className='h-3/5 w-full hover:cursor-pointer bg-white flex justify-center items-center rounded-l-full rounded-r-full hover:bg-gray-200'>
                        <p>Follow</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default YouMightLike;