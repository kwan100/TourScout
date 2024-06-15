import React from "react";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import Navigation from "../Navigation";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function Home() {
  const [artist_name, setName] = useState('')
  const [billie_eilish, setBillie] = useState(0);
  const [adele, setAdele] = useState(0);
  const [the_chainsmokers, setChainsmokers] = useState(0);
  const [andrea_bocelli, setAndrea] = useState(0);
  const [yung_gravy, setYung] = useState(0);
  const [billy_joel, setBilly] = useState(0);
  const [old_dominion, setOld] = useState(0);
  const [post_malone, setPost] = useState(0);
  const [jack_harlow, setJack] = useState(0);
  const [elton_john, setElton] = useState(0);
  const [harry_styles, setHarry] = useState(0);
  const [dominic_fike, setDominic] = useState(0);

  const navigate = useNavigate(); 
  const routeChange = (artist) =>{ 
    navigate({
      pathname: '/artist', 
      search: createSearchParams({
      artist: artist_name,
      }).toString()
    });
  };

  //gets the artist rating data from the database
  const performSearch = async () => {
    var artists = ["billie_eilish", "adele", "the_chainsmokers",
      "andrea_bocelli", "yung_gravy", "billy_joel",
      "old_dominion", "post_malone", "jack_harlow", 
      "elton_john", "harry_styles", "dominic_fike"];
    for (var i = 0; i < 12; i++) {
      try {
        var artistResponse = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/search_artist/${artists[i]}`, {mode: 'cors'});
        var artistData = await artistResponse.json();
        console.log(artistData);
        var artistId = artistData[0].artist_id;
        var getReviews = await fetch(`http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:8000/reviews/${artistId}`, {mode: 'cors'});
        var reviewData = await getReviews.json();
      }
      catch (error){
        reviewData = 0;
      }

      switch (i) {
        case 0: 
          setBillie(parseReviewData(reviewData));
          break;
        case 1: 
          setAdele(parseReviewData(reviewData));
          break;
        case 2: 
          setChainsmokers(parseReviewData(reviewData));
          break;
        case 3: 
          setAndrea(parseReviewData(reviewData));
          break;
        case 4: 
          setYung(parseReviewData(reviewData));
          break;
        case 5: 
          setBilly(parseReviewData(reviewData));
          break;
        case 6: 
          setOld(parseReviewData(reviewData));
          break;
        case 7: 
          setPost(parseReviewData(reviewData));
          break;
        case 8: 
          setJack(parseReviewData(reviewData));
          break;
        case 9: 
          setElton(parseReviewData(reviewData));
          break;
        case 10: 
          setHarry(parseReviewData(reviewData));
          break;
        case 11: 
          setDominic(parseReviewData(reviewData));
          break;
      }
    }
  }

  function parseReviewData(reviewData) {
    var cumulativeRating = 0;
    for(var i = 0; i < reviewData.length; i++) {
      var rRating = reviewData[i].rating;
      cumulativeRating += rRating;
    }
    cumulativeRating = cumulativeRating / reviewData.length;
    return cumulativeRating;
  }

  //performs the search when the page loads
  useEffect(() => {
    performSearch();
  });

  // const handleSearch = event => {
  //   console.log("in clicked search");
  //   console.log(artist_name);
  // }

  return (
    <>
      <Navigation />
      <div id="homepage">
        <div id="homeheader">
          <img id="home-logo" src= "images/logo.png" alt=""/>
          <div class="home-title">
            Own your next live experience.
          </div>
          <div class="search row">
            <input id="input" type="text" class="form-control shadow-none" onChange={event => setName(event.target.value)} value={artist_name} placeholder="Search for an artist or venue"/>
            <button class="btn btn-dark" onClick={() => {alert('Feature coming soon! (see artists below)')}}>
              <img src="../../images/search_icon.png" alt="..."/>
            </button>
          </div>

          {/* Mobile */}
          <div class="d-block d-sm-none">
            <div id="gallery" class="row">
                <div class="col-12 col-sm-9 align-self-center">
                    <h4 class="fw-bold ">Recently Added Artists</h4>
                </div>
            </div>
            <div class="row mb-4">
              <a href="/artist?artist=adele">
                <div class="card bg-dark">
                    <img src="https://nypost.com/wp-content/uploads/sites/2/2022/11/adele-089.jpg" class="d-block w-100" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Adele</h5>
                        <Rating
                          name="text-feedback"
                          value={adele}
                          size = "small"
                          readOnly
                          precision={0.1}
                          emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                        />
                    </div>
                </div>
              </a>
            </div>
            <div class="row mb-4">
              <a href="/artist?artist=andrea_bocelli">
                <div class="card bg-dark">
                    <img src="https://www.travelandleisure.com/thmb/KJ_1XFYBsdturkAi7rqza1OCf9c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/andrea-bocelli-preforming-BOCELLIXMAS1121-576758e713504afdafbce641b3a64286.jpg" class="d-block w-100" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Andrea Bocelli</h5>
                        <Rating
                          name="text-feedback"
                          value={andrea_bocelli}
                          size = "small"
                          readOnly
                          precision={0.1}
                          emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                        />
                    </div>
                </div>
              </a>
            </div>
            <div class="row mb-4">
              <a href="/artist?artist=billie_eilish">
                <div class="card bg-dark">
                    <img src="https://hips.hearstapps.com/hmg-prod/images/billie-eilish-performs-onstage-during-the-62nd-annual-news-photo-1580094746.jpg" class="d-block w-100" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Billie Eilish</h5>
                        <Rating
                          name="text-feedback"
                          value={billie_eilish}
                          size = "small"
                          readOnly
                          precision={0.1}
                          emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                        />
                    </div>
                </div>
              </a>
            </div>
            <div class="row mb-4">
              <a href="/artist?artist=billy_joel">
                <div class="card bg-dark">
                    <img src="https://www.billboard.com/wp-content/uploads/media/billy-joel-performance-smile-2014-a-billboard-1548.jpg" class="d-block w-100" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Billy Joel</h5>
                        <Rating
                          name="text-feedback"
                          value={billy_joel}
                          size = "small"
                          readOnly
                          precision={0.1}
                          emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                        />
                    </div>
                </div>
              </a>
            </div>
            <div class="row mb-4">
              <a href="/artist?artist=the_chainsmokers">
                <div class="card bg-dark">
                    <img src="https://static.onecms.io/wp-content/uploads/sites/6/2017/03/gettyimages-657906732-2000.jpg" class="d-block w-100" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title fw-bold">The Chainsmokers</h5>
                        <Rating
                          name="text-feedback"
                          value={the_chainsmokers}
                          size = "small"
                          readOnly
                          precision={0.1}
                          emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                        />
                    </div>
                </div>
              </a>
            </div>
            <div class="row mb-4">
              <a href="/artist?artist=dominic_fike">
                <div class="card bg-dark">
                  <img src="https://headlineplanet.com/home/wp-content/uploads/2022/02/Dominic-Fike-on-Fallon-4.jpg" class="d-block w-100" alt="..."/>
                  <div class="card-body">
                    <h5 class="card-title fw-bold">Dominic Fike</h5>
                    <Rating
                      name="text-feedback"
                      value={dominic_fike}
                      size = "small"
                      readOnly
                      precision={0.1}
                      emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                    />
                  </div>
                </div>
              </a>
            </div>  
            <div class="row mb-4">
              <a href="/artist?artist=elton_john">
                <div class="card bg-dark">
                    <img src="https://www.99images.com/download-image/933920/1920x1280" class="d-block w-100" alt="..."/>
                    <div class="card-body">
                      <h5 class="card-title fw-bold">Elton John</h5>
                      <Rating
                        name="text-feedback"
                        value={elton_john}
                        size = "small"
                        readOnly
                        precision={0.1}
                        emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                      />
                    </div>
                </div>
              </a>
            </div>  
            <div class="row mb-4">
              <a href="/artist?artist=harry_styles">
                <div class="card bg-dark">
                  <img src="https://www.billboard.com/wp-content/uploads/2021/12/harry-styles-2021-billboard-1548.jpg" class="d-block w-100" alt="..."/>
                  <div class="card-body">
                      <h5 class="card-title fw-bold">Harry Styles</h5>
                      <Rating
                        name="text-feedback"
                        value={harry_styles}
                        size = "small"
                        readOnly
                        precision={0.1}
                        emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                      />
                  </div>
                </div>
              </a>
            </div> 
            <div class="row mb-4">
              <a href="/artist?artist=jack_harlow">
                  <div class="card bg-dark">
                      <img src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/jack-harlow-superbowl-citi-concert--inline2-jp-081222-08aa15.jpg" class="d-block w-100" alt="..."/>
                      <div class="card-body">
                          <h5 class="card-title fw-bold">Jack Harlow</h5>
                          <Rating
                            name="text-feedback"
                            value={jack_harlow}
                            size = "small"
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                          />
                      </div>
                  </div>
                </a>
            </div>
            <div class="row mb-4">
              <a href="/artist?artist=old_dominion">
                <div class="card bg-dark">
                    <img src="https://www.gannett-cdn.com/presto/2022/06/13/PNAS/afe4fd5b-1f1c-4f90-b68f-be1f156fa003-CMA_Fest_day_3_1693.jpg" class="d-block w-100" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Old Dominion</h5>
                        <Rating
                          name="text-feedback"
                          value={old_dominion}
                          size = "small"
                          readOnly
                          precision={0.1}
                          emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                        />
                    </div>
                </div>
              </a>
            </div>
            <div class="row mb-4">
                <a href="/artist?artist=post_malone">
                  <div class="card bg-dark">
                      <img src="https://www.syracuse.com/resizer/Gho2h8t584_ZoNDxKzM1zOIiVk4=/arc-anglerfish-arc2-prod-advancelocal/public/ZZ2V33SVNREKLF6ROTZJ32GZXI.jpeg" class="d-block w-100" alt="..."/>
                      <div class="card-body">
                          <h5 class="card-title fw-bold">Post Malone</h5>
                          <Rating
                            name="text-feedback"
                            value={post_malone}
                            size = "small"
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                          />
                      </div>
                  </div>
                </a>
            </div>
            <div class="row mb-4">
              <a href="/artist?artist=yung_gravy">
                <div class="card bg-dark">
                    <img src="https://www.party-guru.com/wp-content/uploads/2022/01/8R6A5144-scaled.jpg" class="d-block w-100" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Yung Gravy</h5>
                        <Rating
                          name="text-feedback"
                          value={yung_gravy}
                          size = "small"
                          readOnly
                          precision={0.1}
                          emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                        />
                    </div>
                </div>
              </a>
            </div> 
          </div>

          {/* Web */}
          <div class="d-none d-sm-block">
            <div id="gallery" class="row">
                <div class="col-12 col-sm-9 align-self-center">
                    <h4 class="fw-bold ">Recently Added Artists</h4>
                </div>
            </div>
            <div class="row mb-5">
              <div class="col-4">
                  <a href="/artist?artist=adele">
                    <div class="card bg-dark">
                        <img src="https://nypost.com/wp-content/uploads/sites/2/2022/11/adele-089.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Adele</h5>
                            <Rating
                              name="text-feedback"
                              value={adele}
                              size = "small"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                            />
                        </div>
                    </div>
                  </a>
                </div>
                <div class="col-4">
                  <a href="/artist?artist=andrea_bocelli">
                    <div class="card bg-dark">
                        <img src="https://www.travelandleisure.com/thmb/KJ_1XFYBsdturkAi7rqza1OCf9c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/andrea-bocelli-preforming-BOCELLIXMAS1121-576758e713504afdafbce641b3a64286.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Andrea Bocelli</h5>
                            <Rating
                              name="text-feedback"
                              value={andrea_bocelli}
                              size = "small"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                            />
                        </div>
                    </div>
                  </a>
                </div>
                <div class="col-4">
                  <a href="/artist?artist=billie_eilish">
                    <div class="card bg-dark">
                        <img src="https://hips.hearstapps.com/hmg-prod/images/billie-eilish-performs-onstage-during-the-62nd-annual-news-photo-1580094746.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Billie Eilish</h5>
                            <Rating
                              name="text-feedback"
                              value={billie_eilish}
                              size = "small"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                            />
                        </div>
                    </div>
                  </a>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-4">
                  <a href="/artist?artist=billy_joel">
                    <div class="card bg-dark">
                        <img src="https://www.billboard.com/wp-content/uploads/media/billy-joel-performance-smile-2014-a-billboard-1548.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Billy Joel</h5>
                            <Rating
                              name="text-feedback"
                              value={billy_joel}
                              size = "small"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                            />
                        </div>
                    </div>
                  </a>
                </div>
                <div class="col-4">
                  <a href="/artist?artist=the_chainsmokers">
                    <div class="card bg-dark">
                        <img src="https://static.onecms.io/wp-content/uploads/sites/6/2017/03/gettyimages-657906732-2000.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">The Chainsmokers</h5>
                            <Rating
                              name="text-feedback"
                              value={the_chainsmokers}
                              size = "small"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                            />
                        </div>
                    </div>
                  </a>
                </div>
                <div class="col-4">
                  <a href="/artist?artist=dominic_fike">
                    <div class="card bg-dark">
                        <img src="https://headlineplanet.com/home/wp-content/uploads/2022/02/Dominic-Fike-on-Fallon-4.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Dominic Fike</h5>
                            <Rating
                              name="text-feedback"
                              value={dominic_fike}
                              size = "small"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                            />
                        </div>
                    </div>
                  </a>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-4">
                  <a href="/artist?artist=elton_john">
                    <div class="card bg-dark">
                        <img src="https://www.99images.com/download-image/933920/1920x1280" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Elton John</h5>
                            <Rating
                              name="text-feedback"
                              value={elton_john}
                              size = "small"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                            />
                        </div>
                    </div>
                  </a>
                </div>
                <div class="col-4">
                  <a href="/artist?artist=harry_styles">
                    <div class="card bg-dark">
                        <img src="https://www.billboard.com/wp-content/uploads/2021/12/harry-styles-2021-billboard-1548.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Harry Styles</h5>
                            <Rating
                              name="text-feedback"
                              value={harry_styles}
                              size = "small"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                            />
                        </div>
                    </div>
                  </a>
                </div>
                <div class="col-4">
                  <a href="/artist?artist=jack_harlow">
                    <div class="card bg-dark">
                        <img src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/jack-harlow-superbowl-citi-concert--inline2-jp-081222-08aa15.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Jack Harlow</h5>
                            <Rating
                              name="text-feedback"
                              value={jack_harlow}
                              size = "small"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                            />
                        </div>
                    </div>
                  </a>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                  <a href="/artist?artist=old_dominion">
                    <div class="card bg-dark">
                        <img src="https://www.gannett-cdn.com/presto/2022/06/13/PNAS/afe4fd5b-1f1c-4f90-b68f-be1f156fa003-CMA_Fest_day_3_1693.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Old Dominion</h5>
                            <Rating
                              name="text-feedback"
                              value={old_dominion}
                              size = "small"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                            />
                        </div>
                    </div>
                  </a>
                </div>
                <div class="col-4">
                  <a href="/artist?artist=post_malone">
                    <div class="card bg-dark">
                        <img src="https://www.syracuse.com/resizer/Gho2h8t584_ZoNDxKzM1zOIiVk4=/arc-anglerfish-arc2-prod-advancelocal/public/ZZ2V33SVNREKLF6ROTZJ32GZXI.jpeg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Post Malone</h5>
                            <Rating
                              name="text-feedback"
                              value={post_malone}
                              size = "small"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                            />
                        </div>
                    </div>
                  </a>
                </div>
                <div class="col-4">
                  <a href="/artist?artist=yung_gravy">
                    <div class="card bg-dark">
                        <img src="https://www.party-guru.com/wp-content/uploads/2022/01/8R6A5144-scaled.jpg" class="d-block w-100" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Yung Gravy</h5>
                            <Rating
                              name="text-feedback"
                              value={yung_gravy}
                              size = "small"
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                            />
                        </div>
                    </div>
                  </a>
                </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  );
}
export default Home;
