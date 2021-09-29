import React, {useContext, useState, useEffect} from 'react'
import './ReviewsList.css'
import AddBoxIcon from '@material-ui/icons/AddBox';
import ReviewComment from '../ReviewComment/ReviewComment'
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import {UserContext} from '../../UserContext'


function ReviewsList({restaurant, restaurantImage, restaurantReviews}) {
    const {firstNameK, lastNameK,  userCommentK, userRatingK, allRestaurantReviewsK} = useContext(UserContext);

    const [firstName, setFirstName] = firstNameK;
    const [lastName, setLastName] = lastNameK;
    const [userComment, setuserComment] = userCommentK;
    const [userRating, setuserRating] = userRatingK;
    const [allRestaurantReviews, setallRestaurantReviews] = allRestaurantReviewsK;
    // setallRestaurantReviews(restaurantReviews)

    const [clickedIcon, setclickedIcon] = useState(false);
    const [addednewReview, setaddednewReview] = useState(false);
  
// useEffect(() => {
//    setallRestaurantReviews(restaurantReviews)
//   }, [restaurantReviews])

    const adduserReview = () => {
        // add the review at the end of restaurantReviews array
        restaurantReviews.push({
            author_name: `${firstName} ${lastName}`,
            author_url: "",
            language: "en",
            profile_photo_url: "",
            rating: userRating,
            relative_time_description: "",
            text: userComment,
            time: null
        })
        setallRestaurantReviews(restaurantReviews)
        setaddednewReview(true);
        setclickedIcon(false);
        setFirstName("");
        setLastName("");
        setuserComment("");
        setuserRating(0)
    }

// useEffect(() => {
//    if(addednewReview) {
//     let newReview = restaurantReviews.pop();
//     <ReviewComment 
//     review = {newReview}
//     />
//    }
//   }, [])

    const revealForm = () => {
        setclickedIcon(true);
    }

    const handleCancel = () => {
        setclickedIcon(false)
    }

 

    return (
        <div>
        <div className="ReviewsList__Container">
                <div className="ReviewsList__heading"><h2>Reviews</h2></div>
                <div className="ReviewsList__AddIcon">
                    <h3>ADD</h3>
                    <div className="Add_Icon">
                    <AddBoxIcon fontSize="large"
                    onClick = {revealForm}
                    />
                    </div>   
                </div>                
            </div>
            <div>
            
                {clickedIcon ? 
                 <AddCommentForm 
                adduserReview ={adduserReview}
                handleCancel = {handleCancel}
                />
                :
                null 
                }   
                
            </div>

            {restaurantReviews.map((review,i) => (
            <ReviewComment key={i}
            review = {review}
            />
            ))}
        </div>
    )
}

export default ReviewsList
