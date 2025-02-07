import { useState } from "react";
import clsx from 'clsx';

function LoginModal ({loginState, setLoginState, currentUser, setCurrentUser, buttonColor, backGroundColor}) {

    const [loginUsername, setLoginUsername] = useState("")
    const [loginPassword, setLoginPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");

    function handleUserLogin (e, quickusername, quickemail, quickpassword) {

        e.preventDefault();

        let loginPayload = {};

        if (quickusername && quickemail && quickpassword) {
            loginPayload = {
                username: quickusername,
                password: quickpassword,
                email: quickemail
            };
        } else {
            loginPayload = {
                username: loginUsername,
                password: loginPassword,
                email: loginEmail
            };
        }


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
        <div className={clsx ('fixed inset-0 h-full z-50 w-screen px-4 md:px-0 bg-opacity-60 flex flex-col justify-center flex-grow items-center', {
            "bg-dimBackGround": backGroundColor === "dimBackGround",
            "bg-twitterBlack": backGroundColor === "twitterBlack",
        })}>
        <div className={clsx ('h-3/4  md:w-2/5 w-full flex flex-col border-2 rounded-md pb-10 ', {
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

                <div className='h-full w-full flex gap-2 flex-[30]'>
                    <div className='w-32'>
                        <h1 className='text-white font-bold text-3xl'>Sign In</h1>
                    </div>
                    <div className='flex h-full w-80 justify-between text-white text-xl'>
                        <div onClick={(e) => handleUserLogin(e, "billgates", "admin1@twitterclone.com", "admin")} className='border border-twitterBlue w-10 h-10 flex justify-center items-center hover:cursor-pointer'>
                            <p>1</p>
                        </div>
                        <div onClick={(e) => handleUserLogin(e, "jokerhut", "admin2@twitterclone.com", "admin")} className='border border-twitterBlue w-10 h-10 flex justify-center items-center hover:cursor-pointer'>
                            <p>2</p>
                        </div>
                        <div onClick={(e) => handleUserLogin(e, "zuck", "admin3@twitterclone.com", "admin")} className='border border-twitterBlue w-10 h-10 flex justify-center items-center hover:cursor-pointer'>
                            <p>3</p>
                        </div>
                        <div onClick={(e) => handleUserLogin(e, "stevejobs", "admin4@twitterclone.com", "admin")} className='border border-twitterBlue w-10 h-10 flex justify-center items-center hover:cursor-pointer'>
                            <p>4</p>
                        </div>
                    </div>
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
    )
}

export default LoginModal;