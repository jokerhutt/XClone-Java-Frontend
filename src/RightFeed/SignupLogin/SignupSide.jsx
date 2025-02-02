import '../../App.css'
import { FaGoogle, FaApple } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import YouMightLike from '../YouMightLike';




function SignupSide ({currentUserFollowing, cachedFollows, currentUser, setCurrentUser, sampleUsers, userFollowing, handleNewFollow}) {

    const [SigningUp, setSigningup] = useState(false);
    const [signupState, setSignupState] = useState(1);

    const [signupUserName, setSignupUserName] = useState("");
    const [signupBio, setSignupBio] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupProfilePic, setSignupProfilePic] = useState("/DEFAULTPFP.png");
    const [signupDisplayName, setSignupDisplayName] = useState("")
    const [signupBackground, setSignupBackground] = useState("https://www.moissonmontreal.org/wp-content/uploads/2014/11/Rectangle-Gris-Fonce-700x230.jpg")
    const [loginState, setLoginState] = useState(false);

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");


    const handleUserSignup = (e) => {
        e.preventDefault();

        const signupPayload = {
            username: signupUserName,
            password: signupPassword,
            email: signupEmail,
            profilePic: signupProfilePic,
            displayName: signupDisplayName,
            userBio: signupBio,
            userBackground: signupBackground
        };

        const decryptedPayload = JSON.stringify(signupPayload)

        console.log("Super Secret Payload is being sent..." + decryptedPayload)

        fetch('http://localhost:6790/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupPayload),
        })
          .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to sign up');
            }
        })
          .then((data) => {
              alert('Sign-up successful!');
              console.log("Response is " + JSON.stringify(data));
              setCurrentUser(data);
              setSigningup(false);
              console.log(signupState);
          });
      };


    function handleSignupForm () {

        if (signupState == 1) {

            if (signupUserName && signupPassword) {
                setSignupState(2)
            }
            else {
                alert("Username or Password Required")
            }

        } else if (signupState == 2 && currentUser) {
            setSigningup(false);
        }
    }

    const handleProfilePicUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSignupProfilePic(reader.result); // Convert image to base64 for preview
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleBackgroundUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSignupBackground(reader.result); // Convert image to base64 for preview
            };
            reader.readAsDataURL(file);
        }
    };

    function handleUserLogin (e) {

            e.preventDefault();
    
            const loginPayload = {
                username: loginUsername,
                password: loginPassword,
                email: loginEmail
            };
    
            const decryptedPayload = JSON.stringify(loginPayload)
    
            console.log("Super Secret Payload is being sent..." + decryptedPayload)
    
            fetch('http://localhost:6790/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(loginPayload),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to sign up');
                }
            })
            .then((data) => {
                  alert('Login successful!');
                  console.log("Response is " + JSON.stringify(data));
                  setCurrentUser(data);
                  setLoginState(false);
                  console.log(loginState)
                  console.log(data)
                  console.log("Current user is " + currentUser)
            });
        }

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
            <p>By signing up, you agree to the <span className='hover:cursor-pointer text-twitterBlue'>Terms of Service</span> and <span className='hover:cursor-pointer text-twitterBlue'>Privacy Policy</span>, including <span className='text-twitterBlue hover:cursor-pointer'>Cookie Use.</span></p>
        </div>
    </div>

    <div className=' text-white flex-[1] flex flex-col h-full border-2 border-twitterBorder rounded-lg'>
            <div className='h-full p-3 pb-1'>
            <h1 className='text-xl text-white font-bold'>Already have an account?</h1>
            </div>
            <div className='flex-[10] h-full flex flex-col my-4 mx-3 gap-4 pr-4'>
                <div onClick={() => setLoginState(true)} className='p2 bg-transparent border-twitterBorder border-2 font-bold rounded-r-xl rounded-l-xl w-full p-2 flex-[1] text-twitterBlue text-center flex justify-center items-center hover:cursor-pointer hover:bg-gray-900'  >
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
            {sampleUsers.map((user) => <YouMightLike currentUserFollowing={currentUserFollowing} cachedFollows={cachedFollows} sampleuser={user} userFollowing={userFollowing} handleNewFollow={handleNewFollow} currentUser={currentUser}/>)}
            </>
            ) : null}
            </div>
        </div>
    </div>
        
        <div>
                {SigningUp ? (
                    <div className='fixed inset-0 h-full z-40 w-screen bg-opacity-60 bg-black flex flex-col justify-center flex-grow items-center '>
                        <div className='h-3/4 bg-black w-2/5 flex flex-col border-2 rounded-md border-twitterBlue pb-10'>
                            <div className=' bg-black px-20 h-full w-full flex-[497] flex flex-col'>

                                <div className='flex-[15] h-full w-full:'>
                                </div>

                                <div className='h-full w-full flex-[30]'>
                                    <h1 className='text-white font-bold text-3xl'>Create your account</h1>
                                </div>

                                <div className='bg-black h-full w-full flex-[53] relative cursor-pointer'>
                                    <div className='w-full h-full'>
                                        <img 
                                            src={signupBackground}
                                            onClick={() => document.getElementById('backgroundUpload').click()} 
                                            alt="Background" 
                                            className='w-full h-4/5 object-cover'
                                        />
                                        <input
                                            type="file"
                                            id="backgroundUpload"
                                            style={{ display: "none" }}
                                            onChange={(e) => handleBackgroundUpload(e)}
                                        />
                                    </div>

                                    <div
                                        onClick={() => document.getElementById('profilePicUpload').click()}
                                        className='absolute left-1/2 bottom-1/4 transform -translate-x-1/2 translate-y-1/2 z-41 cursor-pointer'>
                                        <img 
                                            src={signupProfilePic}  
                                            className='w-20 h-20 rounded-full border-4 border-black object-cover'
                                        />
                                        <input
                                            type="file"
                                            id="profilePicUpload"
                                            style={{ display: "none" }}
                                            onChange={(e) => handleProfilePicUpload(e)}
                                        />
                                    </div>
                                </div>
                            
                                {signupState == 1 ? (
                                    <div className='flex-[100] flex-col w-full h-full flex justify-start items-center mb-5'>

                                    <div className='h-full w-full flex-[60] py-3'>
                                        <input onChange={(e) => setSignupUserName(e.target.value)} placeholder='Name' className='text-lg pl-3 bg-transparent h-full w-full border-2 border-twitterBorder text-twitterBorder rounded-md'/>
                                    </div>

                                    <div className='h-full w-full flex-[60] py-3'>
                                        <input onChange={(e) => setSignupEmail(e.target.value)} placeholder='Email' className='text-lg pl-3 bg-transparent h-full w-full border-2 border-twitterBorder text-twitterBorder rounded-md'/>
                                    </div>

                                    <div className='h-full w-full flex-[60] py-3'>
                                        <input onChange={(e) => setSignupPassword(e.target.value)} placeholder='Password' className='text-lg pl-3 bg-transparent h-full w-full border-2 border-twitterBorder text-twitterBorder rounded-md'/>
                                    </div>

                                    </div>
                                 ) : 
                                 
                                 <div className='flex-[100] flex-col w-full h-full flex justify-start items-center mb-5'>

                                <div className='h-full w-full flex-[60] py-3'>
                                     <input onChange={(e) => setSignupDisplayName(e.target.value)} placeholder='Display Name' className='text-lg pl-3 bg-transparent h-full w-full border-2 border-twitterBorder text-twitterBorder rounded-md'/>
                                 </div>

                                 <div className='h-full w-full flex-[140] py-3'>
                                     <textarea onChange={(e) => setSignupBio(e.target.value)} placeholder='Your Bio...' className='text-lg pl-3 pt-3 bg-transparent h-full w-full border-2 border-twitterBorder text-twitterBorder rounded-md'/>
                                 </div>

                                 </div>}

                                <div className='h-full w-full flex-[25]'>

                                {signupState == 1 ? (
                                    <div className='w-full h-full bg-white rounded-l-xl rounded-r-xl flex justify-center items-center hover:cursor-pointer'
                                        onClick={(e) => handleSignupForm(e)}>
                                        <p className='text-md font-bold'>Finish Setting up your Profile</p>
                                    </div>
                                        ) :
                                    <div className='w-full h-full bg-white rounded-l-xl rounded-r-xl flex justify-center items-center hover:cursor-pointer' onClick={(e) => handleUserSignup(e)}>
                                        <p className='text-md font-bold'>Create Account</p>
                                    </div>}

                                </div>
                            </div>
                        </div>
                        
                    </div>
                ) : (
                    <></>
                )
                }

                {loginState ? (
                    
                    
                    <div className='fixed inset-0 h-full z-40 w-screen bg-opacity-60 bg-black flex flex-col justify-center flex-grow items-center '>
                    <div className='h-3/4 bg-black w-2/5 flex flex-col border-2 rounded-md border-twitterBlue pb-10'>
                        <div className=' bg-black px-20 h-full w-full flex-[497] flex flex-col'>

                            <div className='flex-[15] h-full w-full:'>
                            </div>

                            <div className='h-full w-full flex-[30]'>
                                <h1 className='text-white font-bold text-3xl'>Sign In</h1>
                            </div>
                        
                                <div className='flex-[100] flex-col w-full h-full flex justify-start items-center mb-5'>
                                    <div className='h-full w-full flex-[60] py-3'>
                                        <input 
                                        placeholder='Name' 
                                        onChange={(e) => setLoginUsername(e.target.value)} 
                                        className='text-lg pl-3 bg-transparent h-full w-full border-2 border-twitterBorder text-twitterBorder rounded-md'
                                        />
                                    </div>

                                    <div className='h-full w-full flex-[60] py-3'>
                                        <input 
                                        placeholder='Email' 
                                        onChange={(e) => setLoginEmail(e.target.value)} 
                                        className='text-lg pl-3 bg-transparent h-full w-full border-2 border-twitterBorder text-twitterBorder rounded-md'
                                        />
                                    </div>

                                    <div className='h-full w-full flex-[60] py-3'>
                                        <input 
                                        placeholder='Password' 
                                        onChange={(e) => setLoginPassword(e.target.value)} 
                                        className='text-lg pl-3 bg-transparent h-full w-full border-2 border-twitterBorder text-twitterBorder rounded-md'
                                        />
                                    </div>
                                </div>

                                <div className='h-full w-full flex-[25]'>
                                    <div className='w-full h-full bg-white rounded-l-xl rounded-r-xl flex justify-center items-center hover:cursor-pointer'
                                        onClick={(e) => handleUserLogin(e)}>
                                        <p className='text-md font-bold'>Sign In</p>
                                    </div>                  
                                </div>
                            </div>
                        </div>
                    </div>







//eeeeeee
                ) : (
                    <></>
                )}
            </div>

    </div>

    )}

export default SignupSide;