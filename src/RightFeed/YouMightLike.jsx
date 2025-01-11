import '../App.css'

function YouMightLike ({sampleuser}) {
    return(

        <div className='px-4 py-3 flex w-full h-full hover:cursor-pointer'>
            <div className='flex-[1]'>
            <img src={sampleuser.profilePic} className='rounded-full h-full w-full'/>
            </div>
            <div className='flex flex-col text-white flex-[3] pl-3'>
                <p className="font-bold">{sampleuser.displayName}</p>
                <p className="text-twitterBorder">@{sampleuser.username}</p>
            </div>
            <div className='h-full w-full text-black flex-[3] flex justify-center items-center'>
                <div className='h-3/5 w-full bg-white flex justify-center items-center rounded-l-full rounded-r-full hover:bg-gray-200'>
                    <p>Follow</p>
                </div>

            </div>
        </div>
    )
}

export default YouMightLike;