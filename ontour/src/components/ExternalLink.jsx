import React from "react";
import '../index.css';
export default function ExternalLink(props)
{
    return (
        <div class="col-12 col-md-2 col-sm-4 mb-4 m-sm-0 p-0">
            <a href={props.mediaLink} class = "social-media-icon" target="_blank" rel="noopener noreferrer">
                <img src= {props.iconLink} alt="link"/>
            </a>
        </div>
    )
}
