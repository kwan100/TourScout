import React from "react";
import '../index.css';

export default function Item(props)
{
    return (
        <div>
            <div class="card">
                <img src={props.image} class="d-block w-100" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">{props.text}</h5>
                </div>
            </div>
        </div>
    )
}