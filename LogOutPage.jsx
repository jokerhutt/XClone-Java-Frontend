import { useNavigate } from "react-router-dom";

function LogOutPage ({currentUser, setCurrentUser}) {

    const navigate = useNavigate();

    function handleNavigate ( ) {
        setCurrentUser(null);
        navigate("/")
        window.location.reload();
    }

    return (
        <>
            <div className="fixed inset-0 h-screen z-70 w-screen bg-twitterBorder bg-opacity-50 backdrop-blur-lg backdrop-brightness-75 flex justify-center items-center">
                <div className="py-8 w-1/5 mb-0 rounded-3xl bg-black text-white flex flex-col px-4 gap-8 justify-center items-center">
                <div>
                    <img src="/X.png" className="h-8 w-8"/>
                </div>
                <div>
                    {currentUser ? (
                        <p className="font-bold">Log out of @{currentUser.username}?</p> 
                    ) : (
                        <p className="font-bold">Logging out...</p>
                    )}

                </div>
                <div onClick={() => handleNavigate()} className="bg-white w-3/5 h-12 flex justify-center items-center rounded-l-full rounded-r-full hover:bg-opacity-60 hover:cursor-pointer">
                    <p className="text-black font-bold">Log out</p>
                </div>
                </div>
            </div>
            
        </>
    )

}

export default LogOutPage;