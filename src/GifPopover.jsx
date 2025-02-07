import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
  } from "@material-tailwind/react";

  import clsx from 'clsx';

  import { MdOutlineGifBox } from "react-icons/md";

  import GifPicker from 'gif-picker-react';
import { useEffect, useState } from "react";

function GifPopover ({addGifToPost, buttonColor}) {

    const handleGifSelect = (selectedGif) => {
        addGifToPost(selectedGif.url);
        setOpenGifs(false);
    };

        const [openGifs, setOpenGifs] = useState(false);

        useEffect(() => {
            console.log(openGifs)
        }, [])

        const TENOR_API_KEY = "AIzaSyCH6r67pkpQFXG3Pc2qGJIYRANESEEjEWo"

    return (
        <>
        <Popover open={openGifs} placement="bottom" className="" theme="DARK">
            <PopoverHandler onClick={() => setOpenGifs(!openGifs)}>
                <div>
                    <MdOutlineGifBox className={clsx ("text-xl hover:drop-shadow-[0_0_15px_#1C9BF0] transition duration-300 hover:cursor-pointer", {
            "hover:text-twitterRed": buttonColor === "twitterRed",
            "hover:text-twitterBlue": buttonColor === "twitterBlue",
        })}/>
                </div>
            </PopoverHandler>
            <PopoverContent>
                <div className="px-4 w-full z-50">
                <GifPicker onGifClick={(selectedGif) => handleGifSelect(selectedGif)} width={180} height={240} tenorApiKey={TENOR_API_KEY}/>
                </div>
            </PopoverContent>
        </Popover>
        </>
    )
}

export default GifPopover;