import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { TiTick } from "react-icons/ti";

import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
  } from "@material-tailwind/react";
  import clsx from 'clsx';
  import { useNavigate } from "react-router-dom";
  import { PiDotsThreeCircle } from "react-icons/pi";
import { useEffect, useState } from "react";
import StylingComponent from "./StylingComponent";

function MoreModal ({setBackGroundColor, buttonColor, backGroundColor, setButtonColor}) {

    const [isViewingMore, setIsViewingMore] = useState(false)

    useEffect(() => {
        console.log(isViewingMore)
    }, [isViewingMore])

    return (
        <div>
        <Popover placement="bottom-start" open={isViewingMore}>
            <PopoverHandler onClick={() => setIsViewingMore(!isViewingMore)}>
            <div className="flex gap-4 items-center text-2xl hover:cursor-pointer">
                <PiDotsThreeCircle />
                <p>More</p>
            </div>
            </PopoverHandler> 
            <PopoverContent className={clsx ("w-1/6 z-100 h-72 bg-transparent", {
                "bg-dimBackGround": backGroundColor === "dimBackGround",
                "bg-twitterBlack": backGroundColor === "twitterBlack",
            })}>
                <StylingComponent setBackGroundColor={setBackGroundColor} buttonColor={buttonColor} setButtonColor={setButtonColor} backGroundColor={backGroundColor}/>
            </PopoverContent>
        </Popover>




        </div>
    )
}

export default MoreModal;