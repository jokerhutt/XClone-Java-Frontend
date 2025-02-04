function IndividualMessage ({message, currentUser}) {
    return (
        <>
        {currentUser && message ? (
            <div className="pt-4">
                {message.senderId === currentUser.id ? (
                    <div className="flex justify-end">
                        <div className="max-w-96 bg-twitterBlue rounded-tr-3xl rounded-tl-3xl text-white rounded-bl-3xl px-2 text-right mx-2">
                            <p className="px-4 py-2">{message.messageText}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-start">
                        <div className="max-w-96 bg-twitterBorder rounded-tr-3xl rounded-tl-3xl rounded-br-3xl text-white px-2 mx-2 text-left">
                            <p className="px-4 py-2">{message.messageText}</p>
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                <p>Loading Message...</p>
            </div>
        )}
        </>
    )
}

export default IndividualMessage;