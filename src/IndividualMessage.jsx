function IndividualMessage ({message, currentUser}) {
    return (
        <>
            {message.senderId === currentUser.id ? (
                <div className="flex justify-end">

                    <div className="w-1/2 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl">
                        <p>{message.messageText}</p>
                    </div>

                </div>
            ) : (
                <div className="flex justify-start">

                    <div className="w-1/2 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl">
                        <p>{message.messageText}</p>
                    </div>

                </div>
            )}


        </>
    )
}

export default IndividualMessage;