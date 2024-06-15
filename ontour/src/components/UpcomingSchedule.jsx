import React from "react";
import '../index.css';
import Show from "./Show";
import {useState, useEffect} from "react";

export default function UpcomingSchedule(props)
{
    const [eventArray, setEventArray] = useState([{name: "Loading...", date: "Loading...", eventId: "Loading...", eventURL: "Loading...", timezone: "Loading...", eventTime: "Loading..."},
    {name: "Loading...", date: "Loading...", eventId: "Loading...", eventURL: "Loading...", timezone: "Loading...", eventTime: "Loading..."},
    {name: "Loading...", date: "Loading...", eventId: "Loading...", eventURL: "Loading...", timezone: "Loading...", eventTime: "Loading..."},
    {name: "Loading...", date: "Loading...", eventId: "Loading...", eventURL: "Loading...", timezone: "Loading...", eventTime: "Loading..."},
    {name: "Loading...", date: "Loading...", eventId: "Loading...", eventURL: "Loading...", timezone: "Loading...", eventTime: "Loading..."}]);
    const [dates, setDates] = useState([]);
    const [show, setShow] = useState(true);
    const performSearch = async () => {
        var tmEvents;
        var tmEventData;
        if(props.name)
        {
            var name = props.name;
            var newname = name.replace(" ", "%20");
            var url =  `https://app.ticketmaster.com/discovery/v2/events.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&keyword=${newname}&sort=date,asc&size=5&classificationName=music`;
            url.replace(" ", "%20");
            tmEvents = await fetch(url);
            tmEventData = await tmEvents.json();
            var events = [];
            if(tmEventData.page.totalElements > 0) {
                for(let i = 0; i < tmEventData._embedded.events.length; i++){
                    if(events.length < 5){
                        var name = tmEventData._embedded.events[i].name;
                        var date = tmEventData._embedded.events[i].dates.start.localDate;
                        var timezone = tmEventData._embedded.events[i].dates.timezone;
                        
                        // Parse event name
                        var nameParse = name.split(" ");
                        for (let j = 0; j < nameParse.length; j++) {
                            nameParse[j] = nameParse[j].charAt(0) + nameParse[j].slice(1).toLowerCase();
                        }
                        var eventName = nameParse.join(" ");

                        // Parse time
                        if(!timezone)
                        {
                            timezone = " ";
                        }
                        else {
                            timezone = timezone.split('/')[1];
                            timezone = timezone.replace('_', ' ');
                        }
                        var eventId = tmEventData._embedded.events[i].id;
                        var eventURL = tmEventData._embedded.events[i].url;
                        var eventTime = tmEventData._embedded.events[i].dates.start.localTime;
                        var hours;
                        var minutes
                        var time;
                        if(eventTime)
                        {
                            eventTime = eventTime.split(':');
                            hours = eventTime[0];
                            minutes = eventTime[1];
                            time = (hours > 12) ? hours-12 : hours;
                            time += ':' + minutes;
                            time += (hours >= 12) ? " pm" : " am";
                        }
                        else{
                            time = " ";
                        }
                        const event = {
                        name: eventName,
                        date: date,
                        timezone: timezone,
                        eventId: eventId,
                        eventURL: eventURL,
                        eventTime: time
                        }
                        events.push(event);
                    }
                }
                for(let i = 0; i < events.length; i++){
                    eventArray[i] = events[i];
                    const[year, month, day] = events[i].date.split("-");
                    const newData = new Date(+year, month - 1, +day);
                    var weekday = newData.toString().split(" ")[0];
                    var monthStr = newData.toString().split(" ")[1];
                    var dayStr = newData.toString().split(" ")[2];
                    
                    if(dayStr.charAt(0) == '0') {
                        dayStr = dayStr.slice(1);
                    }

                    var fullDate = weekday + ", " + monthStr + " " + dayStr;
                    dates[i] = fullDate;
                }
            }
            else{
                setShow(false);
            }
        }
    
    }
    useEffect(() => {
        performSearch();
      }, [props.name]);
    

    return (
        <div class="container shows">
            <div class="row justify-content-center show">
                <h4 id="upcoming" class="fw-bold d-none d-sm-block">Upcoming Shows</h4>
                <h4 id="upcoming-shows" class="fw-bold d-block d-sm-none">Shows</h4>
            </div>

            {show
            ?
            <div id="upcoming-list">
                <a href={eventArray[0].eventURL} target="_blank" rel="noopener noreferrer">
                    <Show time = {eventArray[0].eventTime} date={dates[0]} event={eventArray[0].name} location={eventArray[0].timezone}/>
                </a>
                <a href={eventArray[1].eventURL} target="_blank" rel="noopener noreferrer">
                    <Show time = {eventArray[1].eventTime} date={dates[1]} event={eventArray[1].name} location={eventArray[1].timezone}/>  
                </a>
                <a href={eventArray[2].eventURL} target="_blank" rel="noopener noreferrer">
                    <Show time = {eventArray[2].eventTime} date={dates[2]} event={eventArray[2].name} location={eventArray[2].timezone}/>
                </a>
                <a href={eventArray[3].eventURL} target="_blank" rel="noopener noreferrer">
                    <Show time = {eventArray[3].eventTime} date={dates[3]} event={eventArray[3].name} location={eventArray[3].timezone}/>
                </a>
                <a href={eventArray[4].eventURL} target="_blank" rel="noopener noreferrer">
                    <Show time = {eventArray[4].eventTime} date={dates[4]} event={eventArray[4].name} location={eventArray[4].timezone}/>
                </a>
            </div>
            :<p>No Upcoming Shows</p>}
           
            {/* <div class="row justify-content-center pt-3">
                <button id="upcoming-btn">See more</button>
            </div> */}
        </div>
    );
}
