import { TiTick } from "react-icons/ti";
import clsx from 'clsx';


function StylingComponent ({setBackGroundColor, buttonColor, backGroundColor, setButtonColor}) {
    return (
        <>
            <div className="text-white font-bold flex flex-col gap-4 items-center h-full text-base">
                
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl text-center">Colors</h2>

                    <div className="w-full h-full flex justify-center gap-2">
                        <div
                        onClick={() => setButtonColor('twitterBlue')}
                        className="h-10 w-10 rounded-full hover:cursor-pointer flex justify-center items-center bg-twitterBlue">
                            {buttonColor === "twitterBlue" ? (
                                <TiTick className="text-4xl"/>
                            ) : (
                                null
                            )}
                        </div>
                        <div 
                        onClick={() => setButtonColor('twitterRed')}
                        className="h-10 w-10 rounded-full flex justify-center items-center hover:cursor-pointer bg-twitterRed">
                            {buttonColor === "twitterRed" ? (
                                <TiTick className="text-4xl"/>
                            ) : (
                                null
                            )}
                        </div>
                        <div 
                        onClick={() => setButtonColor('twitterYellow')}
                        className="h-10 w-10 rounded-full hover:cursor-pointer flex justify-center items-center bg-twitterYellow">
                        {buttonColor === "twitterYellow" ? (
                                <TiTick className="text-4xl"/>
                            ) : (
                                null
                        )}
                        </div>
                        <div 
                        onClick={() => setButtonColor('twitterPurple')}
                        className="h-10 w-10 rounded-full hover:cursor-pointer flex justify-center items-center bg-twitterPurple">
                        {buttonColor === "twitterPurple" ? (
                                <TiTick className="text-4xl"/>
                            ) : (
                                null
                        )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                    <h2 className="text-xl text-center">Background</h2>

                    <div className="w-full h-full flex hover:cursor-pointer justify-center gap-2">
                        <div 
                        onClick={() => setBackGroundColor("twitterBlack")}
                        className={clsx("w-full h-12 gap-4 bg-twitterBlack flex justify-center rounded-l-full rounded-r-full items-center border", {
                            "border-twitterRed": buttonColor === "twitterRed",
                            "border-twitterBlue": buttonColor === "twitterBlue",
                            "border-twitterYellow": buttonColor === "twitterYellow",
                            "border-twitterPurple": buttonColor === "twitterPurple",
                        })}>
                        <div className="w-4 h-4 border border-white rounded-full">
                        {backGroundColor === "twitterBlack" ? (
                                <TiTick className="text-sm"/>
                            ) : (
                                null
                        )}
                        </div>
                        <p>Dark</p>
                        </div>
                        <div 
                        onClick={() => setBackGroundColor("dimBackGround")}
                        className={clsx("w-full gap-4 hover:cursor-pointer h-12 bg-dimBackGround rounded-r-full rounded-l-full border flex justify-center items-center", {
                            "border-twitterRed": buttonColor === "twitterRed",
                            "border-twitterBlue": buttonColor === "twitterBlue",
                            "border-twitterYellow": buttonColor === "twitterYellow",
                            "border-twitterPurple": buttonColor === "twitterPurple",
                        })}>
                            <div className="w-4 h-4 border border-white rounded-full">
                            {backGroundColor === "dimBackGround" ? (
                                <TiTick className="text-sm"/>
                            ) : (
                                null
                        )}
                            </div>          
                            <p>Dim</p>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default StylingComponent