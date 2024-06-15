import React from "react";
import "../index.css";
import "react-multi-carousel/lib/styles.css";
import ArtistHeader from "../components/ArtistHeader";
import Carousel from "../components/Carousel";
import Review from "../components/Review";
import WriteReview from "../components/WriteReview";
import Sidebar from "../components/Sidebar";
import { useSearchParams } from "react-router-dom";
import {useState, useEffect} from "react";
import ArtistNavigation from "../ArtistNavigation"
import Footer from "../components/Footer"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Form from 'react-bootstrap/Form';
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Artist() {

  //gets the name from the artist that was searched for on the home page
  const [searchParams] = useSearchParams();
  const artistName = searchParams.get("artist");

  //set var names here
  const [artistData, setArtistData] = useState({
    fullName: "",
    allReviews: [],
    artistIdNumber: 0,
  });

  const [fullName, setFullName] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [artistIdNumber, setArtistIdNumber] = useState(0);
  const [aggregateRating, setAggregateRating] = useState(0);
  const [artistImage, setArtistImage] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [ticketLink, setTicketLink] = useState("");
  const [imageArray, setImageArray] = useState([]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //gets the artist and review data from the database
  const performSearch = async () => {
    console.log('IN EHREHREHREH');
    console.log(artistName);
    const artistResponse = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/search_artist/${artistName}`, {mode: 'cors'});

    // const artistResponse = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/search_artist/${artistName}`, {mode: 'cors'});
    const artistData = await artistResponse.json();
    console.log(artistData);
    setFullName(artistData[0].fname + " " + artistData[0].lname);
    const artistId = artistData[0].artist_id;
    const imageUrls = artistData[0].image_url;
    setArtistImage(imageUrls);
    setArtistIdNumber(artistId);
    const imageGallery = artistData[0].images;
    setImageArray(imageGallery);

    // const getReviews = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/reviews/${artistId}`, {mode: 'cors'});
    const getReviews = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/reviews/${artistId}`, {mode: 'cors'});
    const reviewData = await getReviews.json();
    console.log(reviewData);
    setAllReviews(parseReviewData(reviewData));

    //gets the tickemaster artist details 
    const tmArtist = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&keyword=${artistName}`, {mode: 'cors'});
    const tmData = await tmArtist.json();
    var spotify = tmData._embedded.attractions[0].externalLinks.spotify[0].url;
    var tickets = tmData._embedded.attractions[0].url;
    setTicketLink(tickets);
    setSpotifyLink(spotify);
  }

  //performs the search when the page loads
  useEffect(() => {
    performSearch();
  }, [artistName]);
  
  //parses the review data from the database
  function parseReviewData(reviewData) {
    var reviewsArray = [];
    var cumulativeRating = 0;
    for(var i = 0; i < reviewData.length; i++) {
      var review = [];
      var rDescription = reviewData[i].description;
      var rRating = reviewData[i].rating;
      var reviewFname = reviewData[i].fname;
      var reviewLname = reviewData[i].lname;
      var reviewFullName = reviewFname + " " + reviewLname[0] + ".";
      var reviewEvent = reviewData[i].eventname;
      var date = reviewData[i].date;
      review.push(rDescription);
      review.push(rRating);
      review.push(reviewFullName);
      review.push(reviewEvent);
      review.push(date);
      reviewsArray.push(review);
      cumulativeRating += rRating;
    }
    cumulativeRating = cumulativeRating / reviewData.length;
    setAggregateRating(cumulativeRating);
    return reviewsArray;
  }

  const formChange = (event) => {
    //sort all reviews array by rating highest to lowest
    console.log("in here");
    console.log(event.target.value);
    var tempArray = allReviews;
    if(event.target.value == 3) {
      tempArray.sort(function(a, b) {
        return b[1] > a[1] ? 1 : -1;
      });
    }
    //lowest to highest
    else if(event.target.value == 4) {
      console.log("in lowest to highest");
      tempArray.sort(function(a, b) {
        return a[1] > b[1] ? 1 : -1;
      });
    }
    //oldest to newest
    else if(event.target.value == 2) {
      tempArray.sort(function(a, b) {
        return new Date(b[4]) < new Date(a[4]) ? 1 : -1;
      });
    }
    //newest to oldest
    else if(event.target.value == 1) {
      tempArray.sort(function(a, b) {
        return new Date(a[4]) < new Date(b[4]) ? 1 : -1;
      });
    }

    //print all reviews array
    for(var i = 0; i < allReviews.length; i++) {
      console.log(allReviews[i]);
    }
    setAllReviews(tempArray);
    forceUpdate();
  }

  function Items({currentItems})
  {
    return(
      <>
        {currentItems && currentItems.map(function(review, index) {
            return <Review user={review[2]} date={review[4]} key={index} rating={review[1]} venue = {review[3]} text={review[0]}/>
          })}
      </>
    )
  }


  function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = allReviews.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allReviews.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % allReviews.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
      }}>
        <Items currentItems={currentItems} />
        <ReactPaginate
          activeClassName={'item active '}
          breakClassName={'item break-me '}
          containerClassName={'pagination'}
          disabledClassName={'disabled-page'}
          marginPagesDisplayed={2}
          nextClassName={"item next "}
          nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18, width: 50, color: "black" }} />}
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageClassName={'item pagination-page '}
          pageCount={pageCount}
          previousClassName={"item previous"}
          previousLabel={<ArrowBackIosIcon style={{ fontSize: 18, width: 50, color: "black" }} />}
          renderOnZeroPageCount={null}
        />
        </div>
      </>
    );
  }


  return (
    <>
      <div id="mobile-wrapper">
        <ArtistNavigation/>
        <div className="artist" >
          <aside>
            <ArtistHeader name={fullName} rating={aggregateRating} image={artistImage}/>
            <Sidebar name={fullName} spotify={spotifyLink} tickets={ticketLink}/>

            <div id="no-sidebar-sm" class="no-sidebar">
              <div class="d-block d-sm-none">
                <div class="row">
                  <div id="icon-sm" class="col-4">
                      <a href={spotifyLink} class = "social-media-icon" target="_blank" rel="noopener noreferrer">
                          <img src= "../../images/spotify_icon.png" alt="link"/>
                      </a>
                  </div>
                  <div id="icon-sm" class="col-4">
                      <a href={ticketLink} class = "social-media-icon" target="_blank" rel="noopener noreferrer">
                          <img src= "../../images/ticketmaster_icon.png" alt="link"/>
                      </a>
                  </div>
                  <div class="col-4">
                    <a href="#review">
                      <button id="write-sm" type="button" class="btn btn-dark fw-bold">
                        <img id="review-icon" src="../../images/review.png" alt=""></img>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              {imageArray.length > 0 && <Carousel images={imageArray}/>}
              
              <div class="container">
                <hr></hr>
                <h4 id="reviews" class="fw-bold">Reviews</h4>
                {allReviews.length > 0 &&
                <div id="clear">
                  <div id="reviews-margin" class="row">
                    <div class="col-12 col-sm-9 align-self-center">
                      <div class="rating fw-bold">
                        Overall Rating: {aggregateRating.toFixed(1)} out of 5
                      </div>
                      <div class="rating">
                        <Rating
                              name="text-feedback"
                              value={aggregateRating}
                              size = "large"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                        />
                      </div>
                    </div>

                    <div class="col-12 col-sm-3 align-self-center">
                      <div class="dropdown">
                        <Form.Select onChange={formChange} aria-label="Default select example">
                            <option>Recommended</option>
                            <option value="1">Newest First</option>
                            <option value="2">Oldest First</option>
                            <option value="3">Highest Rated</option>
                            <option value="4">Lowest Rated</option>
                        </Form.Select>
                      </div>
                    </div>
                  </div>

                  <div id="page" class="list-group">
                    {/* {allReviews && allReviews.map(function(review, index) {
                      return <Review user={review[2]} date={review[4]} key={index} rating={review[1]} venue = {review[3]} text={review[0]}/>
                    })} */}
                    <PaginatedItems itemsPerPage={10} />
                  </div>
                </div>
                }
              </div>
              {fullName !== "" && <WriteReview artistId={artistIdNumber} name = {fullName}/> }
            </div>
          </aside>

          <hr id="artist-footer"></hr>
          <Footer/>
        </div>
      </div>
    </>
  );
}
export default Artist;