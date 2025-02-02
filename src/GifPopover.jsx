import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
  } from "@material-tailwind/react";

  import { MdOutlineGifBox } from "react-icons/md";

  import GifPicker from 'gif-picker-react';
import { useEffect, useState } from "react";

function GifPopover ({addGifToPost}) {

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
        <Popover open={openGifs} placement="bottom" className="z-50" theme="DARK">
            <PopoverHandler onClick={() => setOpenGifs(!openGifs)}>
                <div>
                    <MdOutlineGifBox className="text-xl hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/>
                </div>
            </PopoverHandler>
            <PopoverContent>
                <div>
                <GifPicker onGifClick={(selectedGif) => handleGifSelect(selectedGif)} tenorApiKey={TENOR_API_KEY}/>
                </div>
            </PopoverContent>
        </Popover>
        </>
    )
}

export default GifPopover;