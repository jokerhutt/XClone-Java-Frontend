import { useState } from "react";
import clsx from 'clsx';

function SignUpModal ({setSigningup, setCurrentUser, currentUser, buttonColor, backGroundColor}) {

    const [signupDisplayName, setSignupDisplayName] = useState("")
    const [signupProfilePic, setSignupProfilePic] = useState("/DEFAULTPFP.png");
    const [signupBackground, setSignupBackground] = useState("https://www.moissonmontreal.org/wp-content/uploads/2014/11/Rectangle-Gris-Fonce-700x230.jpg")
    const [signupUserName, setSignupUserName] = useState("");
    const [signupBio, setSignupBio] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupState, setSignupState] = useState(1);

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


    return (

        <div className={clsx ('fixed inset-0 h-full z-50 w-screen px-4 md:px-0 flex flex-col justify-center flex-grow items-center bg-opacity-60', {
            "bg-dimBackGround": backGroundColor === "dimBackGround",
            "bg-twitterBlack": backGroundColor === "twitterBlack",
        })}>
            <div className={clsx ('h-3/4 md:w-2/5 w-full flex flex-col border-2 rounded-md pb-10', {
                "bg-dimBackGround": backGroundColor === "dimBackGround",
                "bg-twitterBlack": backGroundColor === "twitterBlack",
                "border-twitterRed": buttonColor === "twitterRed",
                "border-twitterBlue": buttonColor === "twitterBlue",
                "border-twitterYellow": buttonColor === "twitterYellow",
                "border-twitterPurple": buttonColor === "twitterPurple",
            })}>
                <div className=' md:px-20 px-4 h-full w-full flex-[497] flex flex-col'>

                    <div className='flex-[15] h-full w-full:'>
                    </div>

                    <div className='h-full w-full flex-[30]'>
                        <h1 className='text-white font-bold text-3xl text-center md:text-left'>Create your account</h1>
                    </div>

                    <div className=' h-full w-full flex-[53] relative cursor-pointer'>
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


    )
}

export default SignUpModal;