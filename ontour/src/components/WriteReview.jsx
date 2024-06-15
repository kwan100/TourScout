import React from "react";
import '../index.css';
import {useState, useEffect} from 'react';
import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';

export default function WriteReview(props)
{
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [eventName, setEvent] = useState("");
  const [description, setDescription] = useState("");
  const [rawMedia, setRawMedia] = useState([]);
  const [media, setMedia] = useState("");
  const [rating, setRating] = useState("");
  const [date, setDate] = useState("");
  const [artistId, setArtistId] = useState(0);
  const [reviews, setPastReviews] = useState([]);
  const [reviewsSet, setReviewsSet] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  const handleWriteReview = event => {
    event.preventDefault();
    if(!rating)
    {
      setCanSubmit(false);
      return false;
    }
    else
    {
      setRating(rating);
    }
    setArtistId(props.artistId);
    
    // f.log(rawMedia.files[0].name);
    // var fReader = new FileReader();
    // fReader.readAsDataURL(rawMedia.files[0]);
    // fReader.onloadend = function(event){
    //   var img = event.target.result;
    //   console.log(img);
    //   setMedia(img);
    // }
    // setDescription(description);
    setCanSubmit(true);
    postData();
    window.location.reload();
  }

  useEffect(() => {
    GetPastReviews();
  }, []);

  const GetPastReviews = async () => {
    var adele = " ";
    var url = " ";
    if(props.name.includes("Adele"))
    {
      adele = "Adele";
      url = `https://rest.bandsintown.com/artists/Adele/events?app_id=dce6df6b60d8613b98183dd0b3ac36a3&date=past`;
    }
    else{
      var name = props.name.replace(" ", "%20");
      url =  `https://rest.bandsintown.com/artists/${name}/events?app_id=dce6df6b60d8613b98183dd0b3ac36a3&date=past`;
    }

    const pastReviews = await fetch(url);
    const pastData = await pastReviews.json();
    pastData.reverse();
    for(var i = 0; i < 10; i++)
    {
      if(reviews.length < 10)
      {
        var date = pastData[i].datetime.split("T")[0];
        date = date.split("-");
        var year = date[0];
        var month = date[1];
        var day = date[2];
        var mmddyyyy = month + "/" + day + "/" + year;
        pastData[i].datetime = mmddyyyy;
        reviews.push(pastData[i]);
      }
    }
    if(reviews.length > 0)
    {
      setReviewsSet(true);
      setEvent(`${reviews[0].datetime.split("T")[0]} • ${reviews[0].venue.name}`);
    }
  }

  const postData = async () => {
    var eventDate = eventName.split(" • ")[0];
    var event = eventName.split(" • ")[1];
    var first = fname.charAt(0).toUpperCase() + fname.slice(1).toLowerCase();
    var last = lname.charAt(0).toUpperCase() + lname.slice(1).toLowerCase();
    var encodedDescription = encodeURIComponent(description);
    await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/reviews/?artist_id=${props.artistId}&event_id=1&rating=${rating}&description=${encodedDescription}&fname=${first}&lname=${last}&eventname=${event}&date=${eventDate}`, {method: 'POST', mode: 'cors'});
  }

  const HandleDescription = event => {
    var word = event.target.value;
    word.replace(/\n\r?/g, '<br />');
    setDescription(word);
  }

    return (
      
        <div class="container" id="review">
          {/* {media && <img src={media} class="d-block w-100" alt="..."/>} */}
          {/* // <img src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/concert-photography/thumbnail.jpeg" class="d-block w-100" alt="..."/> */}
          <hr></hr>
          <h4 id="write-review" class="fw-bold">Rate Your Experience</h4>
          <div class="rating row">
            <div id="stars" class="col-3">
              <Rating name="rating" size="large"required defaultValue={0} precision={1} onChange={(event, newValue) => {setRating(newValue);}} />
            </div>
            <div class="col-9 no-text-align file">
                <input type="file" id="myFile" class="hidden" name="filename" onChange={event => setRawMedia(event.target)}/>
                <label for="myFile" id="photobutton" class="btn btn-outline-light fw-bold align-self-center">
                  <div class="row">
                      <div class="col-lg-3">
                          <img id="camera-icon" src="../../images/camera.png" alt=""></img>
                      </div>
                      <div id="add-photo" class="d-none d-lg-block col-lg-9">
                          Add Media
                      </div>
                  </div>
                </label>
            </div>
          </div>
          <form id="clear" onSubmit={handleWriteReview}>
            <div class="row top">
              <div class="col">
                <input type="text" class="form-control shadow-none" onChange={event => setFname(event.target.value)} value ={fname} placeholder="First name" required/>
              </div>
              <div class="col">
                <input type="text" class="form-control shadow-none" onChange={event => setLname(event.target.value)} value ={lname} placeholder="Last name" required/>
              </div>
            </div>
            <div class="row bottom">
              <div class="col">
                {/* <input type="text" class="form-control shadow-none" onChange={event => setEvent(event.target.value)} value ={eventName} placeholder="Event Name" required/> */}
                {reviews.length > 0 &&  
                <>
                <Form.Select aria-label="Default select example" required onChange={event => setEvent(event.target.value)}>
                  <option value="" disabled selected hidden>Select an event</option>
                  <option value={`${reviews[0].datetime.split("T")[0]} • ${reviews[0].venue.name} `}>
                    {reviews[0].datetime} • {reviews[0].venue.name}
                    </option>
                  <option value={`${reviews[1].datetime.split("T")[0]} • ${reviews[1].venue.name} `}>
                    {reviews[1].datetime} • {reviews[1].venue.name}
                    </option>
                  <option value={`${reviews[2].datetime.split("T")[0]} • ${reviews[2].venue.name}`}>
                    {reviews[2].datetime} • {reviews[2].venue.name} 
                    </option>
                  <option value={`${reviews[3].datetime.split("T")[0]} • ${reviews[3].venue.name}`}>
                    {reviews[3].datetime} • {reviews[3].venue.name}
                  </option>
                  <option value={`${reviews[4].datetime.split("T")[0]} • ${reviews[4].venue.name}`}>
                    {reviews[4].datetime} • {reviews[4].venue.name} 
                    </option>
                  <option value={`${reviews[5].datetime.split("T")[0]} • ${reviews[5].venue.name}`}>
                    {reviews[5].datetime} • {reviews[5].venue.name}
                  </option>
                  <option value={` ${reviews[6].datetime.split("T")[0]} • ${reviews[6].venue.name}`}>
                    {reviews[6].datetime} • {reviews[6].venue.name}
                  </option>
                  <option value={`${reviews[7].datetime.split("T")[0]} • ${reviews[7].venue.name}`}>
                    {reviews[7].datetime} • {reviews[7].venue.name} 
                  </option>
                  <option value={`${reviews[8].datetime.split("T")[0]} • ${reviews[8].venue.name}`}>
                    {reviews[8].datetime} • {reviews[8].venue.name}
                  </option>
                  <option value={`${reviews[9].datetime.split("T")[0]} • ${reviews[9].venue.name}`}>
                    {reviews[9].datetime} • {reviews[9].venue.name} 
                  </option>
                </Form.Select> </>}
              </div>
            </div>
            <div class="row bottom">
              <div class="col">
                {/* <textarea class="form-control shadow-none" style={{whiteSpace: "pre-wrap"}}  rows="5" cols="100" id="description" maxLength={5000} onChange={event => setDescription(event.target.value)} value ={description} placeholder="How was your experience?" required></textarea> */}
                <textarea class="form-control shadow-none" style={{whiteSpace: "pre-wrap"}}  rows="5" cols="100" id="description" maxLength={5000} onChange={HandleDescription} value ={description} placeholder="How was your experience?" required></textarea>
              </div>
            </div>
            <div>
              <button id="reviewbutton" class="btn btn-dark fw-bold" type="submit" >Submit</button>
            </div>
          </form>
          {!canSubmit && <div className="alert alert-danger fw-bold" role="alert" style={{marginTop: "25px"}}>Please leave a rating.</div>}
        </div>
    )
}
