import '../../App.css'
import { FaGoogle, FaApple } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import YouMightLike from '../YouMightLike';
import clsx from 'clsx';
import LoginModal from '../../LogInModal';
import SignUpModal from '../../SignUpModal';


function SignupSide ({currentUserFollowing, buttonColor, backGroundColor, cachedFollows, currentUser, setCurrentUser, sampleUsers, userFollowing, handleNewFollow}) {

    const [SigningUp, setSigningup] = useState(false);
    const [loginState, setLoginState] = useState(false);

    return (
    <div className='py-3 px-14 h-full'>

    <div className='flex flex-col flex-grow h-full w-full gap-4'>
    {currentUser ? (
                <div className='flex-[1] flex flex-col h-full border-2 border-twitterBorder rounded-lg'> 
                <div className='flex-[2] h-full p-3'>
                    <h1 className='text-xl text-white font-bold'>What's Happening?</h1>
                </div>
        
                <div className='flex flex-col max-h-13'>
                    <div className='px-4 py-3 flex w-full h-full'>
                        <div className='flex flex-col text-white flex-[3]'>
                            <p className='text-sm'>Trending in Netherlands</p>
                            <p className='font-bold'>Nadia Bouras</p>
                        </div>
                        <div>
                            <HiOutlineDotsHorizontal className='text-white'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col max-h-13'>
                    <div className='px-4 py-3 flex w-full h-full'>
                        <div className='flex flex-col text-white flex-[3]'>
                            <p className='text-sm'>Trending in Netherlands</p>
                            <p className='font-bold'>Rutte</p>
                        </div>
                        <div>
                            <HiOutlineDotsHorizontal className='text-white'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col max-h-13'>
                    <div className='px-4 py-3 flex w-full h-full'>
                        <div className='flex flex-col text-white flex-[3]'>
                            <p className='text-sm'>Trending in Netherlands</p>
                            <p className='font-bold'>Texel</p>
                        </div>
                        <div>
                            <HiOutlineDotsHorizontal className='text-white'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col max-h-13'>
                    <div className='px-4 py-3 flex w-full h-full'>
                        <div className='flex flex-col text-white flex-[3]'>
                            <p className='text-sm'>Trending in Netherlands</p>
                            <p className='font-bold'>Taylor Swift</p>
                        </div>
                        <div>
                            <HiOutlineDotsHorizontal className='text-white'/>
                        </div>
                    </div>
                </div>
            </div>
    ) : (
    <>
    <div className='flex-[1] flex flex-col h-full border-2 border-twitterBorder rounded-lg'> 
        <div className='flex-[2] h-full p-3'>
            <h1 className='text-xl text-white font-bold'>New to X?</h1>
        </div>
        <div className='flex-[1] h-full pl-3'>
            <p className='text-xs text-twitterBorder'>Sign up now to get your own personalised timeline!</p>
        </div>
        <div className='flex-[10] h-full flex flex-col my-4 mx-3 gap-4 pr-4'>
            <div className='bg-white font-bold rounded-r-xl rounded-l-xl w-full p-2 flex-[1] text-center flex justify-center items-center gap-3 hover:cursor-pointer' >
                <FaGoogle className='h-4 w-auto'/>
                <p>Sign up with Google</p>
            </div>
            <div className='bg-white font-bold rounded-r-xl rounded-l-xl w-full p-2 flex-[1] text-center flex justify-center items-center gap-3 hover:cursor-pointer'  >
                <FaApple className='h-6 w-auto'/>
                <p>Sign up with Apple</p>
            </div>
            <div 
            onClick={() => setSigningup(true)}
            className='bg-white font-bold rounded-r-xl rounded-l-xl w-full p-2 flex-[1] text-center flex justify-center items-center gap-3 hover:cursor-pointer' >
                <p>Create New Account</p>
            </div>
        </div>
        <div className='flex-[2] h-full text-twitterBorder text-xs pl-3 pb-3'>
            <p>By signing up, you agree to the <span className={clsx ("hover:cursor-pointer", {
            "text-twitterRed": buttonColor === "twitterRed",
            "text-twitterBlue": buttonColor === "twitterBlue",
            "text-twitterYellow": buttonColor === "twitterYellow",
            "text-twitterPurple": buttonColor === "twitterPurple",
        })}>Terms of Service</span> and <span  className={clsx ("hover:cursor-pointer", {
            "text-twitterRed": buttonColor === "twitterRed",
            "text-twitterBlue": buttonColor === "twitterBlue",
            "text-twitterYellow": buttonColor === "twitterYellow",
            "text-twitterPurple": buttonColor === "twitterPurple",
        })}>Privacy Policy</span>, including <span className={clsx ("hover:cursor-pointer", {
            "text-twitterRed": buttonColor === "twitterRed",
            "text-twitterBlue": buttonColor === "twitterBlue",
            "text-twitterYellow": buttonColor === "twitterYellow",
            "text-twitterPurple": buttonColor === "twitterPurple",
        })}>Cookie Use.</span></p>
        </div>
    </div>

    <div className=' text-white flex-[1] flex flex-col h-full border-2 border-twitterBorder rounded-lg'>
            <div className='h-full p-3 pb-1'>
            <h1 className='text-xl text-white font-bold'>Already have an account?</h1>
            </div>
            <div className='flex-[10] h-full flex flex-col my-4 mx-3 gap-4 pr-4'>
            
                <div onClick={() => setLoginState(true)}  className={clsx ("p2 bg-transparent border-twitterBorder border-2 font-bold rounded-r-xl rounded-l-xl w-full p-2 flex-[1] text-center flex justify-center items-center hover:cursor-pointer hover:bg-gray-900", {
            "text-twitterRed": buttonColor === "twitterRed",
            "text-twitterBlue": buttonColor === "twitterBlue",
            "text-twitterYellow": buttonColor === "twitterYellow",
            "text-twitterPurple": buttonColor === "twitterPurple",
        })}  >
                <p>Sign in here</p>
            </div>
            </div>
    </div>
    </>
    )
    }





        <div className='flex-[1] flex flex-col h-full border-2 border-twitterBorder rounded-lg'> 
            <div className='flex-[2] h-full p-3'>
                <h1 className='text-xl text-white font-bold'>You might like</h1>
            </div>
            <div className='flex flex-col max-h-13'>
            {sampleUsers ? (
            <>
            {sampleUsers.map((user) => <YouMightLike backGroundColor={backGroundColor} currentUserFollowing={currentUserFollowing} cachedFollows={cachedFollows} sampleuser={user} userFollowing={userFollowing} handleNewFollow={handleNewFollow} currentUser={currentUser}/>)}
            </>
            ) : null}
            </div>
        </div>
    </div>
        
        <div>
                {SigningUp ? (
                    <SignUpModal buttonColor={buttonColor} backGroundColor={backGroundColor} setCurrentUser={setCurrentUser} currentUser={currentUser} setSigningup={setSigningup}/>
                ) : (
                    <></>
                )
                }

                {loginState ? (
                    <LoginModal buttonColor={buttonColor} backGroundColor={backGroundColor} setCurrentUser={setCurrentUser} currentUser={currentUser} loginState={loginState} setLoginState={setLoginState}/>
                ) : (
                    <></>
                )}
            </div>

    </div>

    )}

export default SignupSide;