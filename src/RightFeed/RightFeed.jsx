import '../App.css'
import SignupSide from './SignupLogin/SignupSide';

function RightFeed ({backGroundColor,  buttonColor, currentUserFollowing, cachedFollows, currentUser, setCurrentUser, sampleUsers, userFollowing, handleNewFollow}) {
    return (
        <div className='flex flex-col flex-grow'>
            <div className='flex-[4] h-full'>
                <SignupSide  buttonColor={buttonColor} backGroundColor={backGroundColor} currentUserFollowing={currentUserFollowing} cachedFollows={cachedFollows} sampleUsers={sampleUsers} currentUser={currentUser} setCurrentUser={setCurrentUser} userFollowing={userFollowing} handleNewFollow={handleNewFollow}/>
            </div>
            <div className='flex-[6] h-full'>
                
                </div>
        </div>
    )
}

export default RightFeed;