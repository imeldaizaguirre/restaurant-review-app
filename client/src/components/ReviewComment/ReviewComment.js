import {React, useState} from 'react'
import "./ReviewComment.css"
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

function ReviewComment({review}) {


    const [ratingValue] = useState(review.rating);
    
    return (
        <div className="ReviewComment__Container">
            <div className="ReviewComment__Commentor">
               <h4>{review.author_name}</h4> 
            </div>
            <div className="ReviewComment__Commentor__Rating">
                        <div className="rating__number">
                        {ratingValue}.0
                        </div>
                        
                        {ratingValue > 0 ? Array(Math.floor(ratingValue)).fill().map((n,i) => 
                          <StarIcon key={i}fontSize = "small" /> ) : <p className="noRating">No Rating Available</p>}
                        {ratingValue && ratingValue % 1 !== 0 ?
                         <StarHalfIcon   fontSize = "small" /> : null}
                        
            </div>
            <div className="ReviewComment__Comment__Container">
                <div className="ReviewComment__Commentor__Image">
                   { review.profile_photo_url ?
                   <img src={review.profile_photo_url} alt="author"/>
                    :
                    <AccountBoxIcon fontSize="medium" />
                    }
                </div>
                <div className="ReviewComment__Comment">
                    <p>{review.text}</p>
                </div>

            </div>
            
            
        </div>
    )
}

export default ReviewComment
