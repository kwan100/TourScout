import React from "react";
import '../index.css';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {useState, useEffect} from "react";

function ArtistHeader(props)
{
    const [isMobile, setIsMobile] = useState(false)
 
    const handleResize = () => {
    if (window.innerWidth <= 576) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
    }

    const useBeforeRender = (callback, deps) => {
        const [isRun, setIsRun] = useState(false);
    
        if (!isRun) {
            callback();
            setIsRun(true);
        }
    
        useEffect(() => () => setIsRun(false), deps);
    };

    useBeforeRender(() => handleResize(), []);

    useEffect(() => {
    window.addEventListener("resize", handleResize)
    })

    return (
        <div id="artist-background" class="container-fluid jumbotron bg-cover text-white" style={{backgroundImage: isMobile? `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url("${props.image}")` : `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url("${props.image}")`}}>
            <div id="text-contain" style={{background: isMobile ? 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))' : ''}}>
                <h1 id="artist-name" class="fw-bold">{props.name}</h1>
                <div class="rating">
                    <Rating
                        name="text-feedback"
                        value={props.rating}
                        size = "large"
                        readOnly
                        precision={0.1}
                        emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                    />
                </div>
                {/* <p style={{ marginLeft: 15}}>14 reviews</p> */}
            </div>
        </div> 
    )
}

export default ArtistHeader;
