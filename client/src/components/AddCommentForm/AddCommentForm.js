import React, {useContext, useState, useEffect} from 'react'
import {UserContext} from '../../UserContext'
import './AddCommentForm.css'
import {FaStar} from "react-icons/fa"

function AddCommentForm({adduserReview, handleCancel}) {

    const {firstNameK, lastNameK,  userCommentK,  userRatingK,} = useContext(UserContext);

    const [firstName, setFirstName] = firstNameK;
    const [lastName, setLastName] = lastNameK;  
    const [userComment, setuserComment] = userCommentK;
    const [userRating, setuserRating] = userRatingK;
    const [formIsValid, setFormIsValid] = useState(false);
  
    useEffect(() => {
        handleValidation()
    }, [firstName, lastName, userComment, userRating, formIsValid])
  
    const addFirstName = (e) => {
        let firstName = e.target.value;
        setFirstName(firstName);
      
    }

    const addLastName = (e) => {
        let lastName = e.target.value;
        setLastName(lastName); 
        
    }

    const addReview = (e) => {
        let review = e.target.value;
        setuserComment(review)    
    }

    const adduserRating = (e) => {
        const userRating = e
        setuserRating(userRating)   
    }


    const handleValidation = () => {
                //Name
        if (!firstName) {
          setFormIsValid(false)
          return
        }
        if (!lastName) {
            setFormIsValid(false)
            return
          }
        if (userRating === 0) {
            setFormIsValid(false)
            return
          }
        setFormIsValid(true)
 }
    
    return (
        <div>
            <div className="form__name__container">
                <div className="form__first__name">
                    <p className="form__name__field">First Name:</p>
                    <input  
                    type="text"
                    onChange={addFirstName}
                    required
                    />
                     {firstName.length === 0 && <span className="error">*First name required</span>}

                </div>
               
                <div className="form__last__name">
                    <p className="form__name__field">Last Name:</p>
                    <input  
                    type="text"
                    onChange={addLastName}
                    required
                    />    
                    {lastName.length === 0 && <span className="error">*Last name required</span>} 
                </div>

            </div>
            <div className="user__rating">
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return(
                        <label key={i}>
                            <input 
                            type="radio" 
                            required
                            name="rating" 
                            value={ratingValue}
                            onClick={() => {adduserRating(ratingValue)} }

                            />

                            <FaStar className="star" 
                            color={ratingValue <= userRating ? "#ffc107" : "#e4e5e9" }
                            size={30}
                            /> 
                        </label> 
                    ) 
                
                })}
            </div>
            <div className="form__comment__container">
            <p>Add Review</p>
            <textarea 
            value={userComment}
            onChange={addReview}
            required
            ></textarea>
            </div>
            <div className="form__buttons">
                <button type="submit" onClick={(e) => (handleCancel())}>Cancel</button>
                
                <button type="submit" 
                disabled = {!formIsValid}
                onClick={(e) => (adduserReview())}
                >Add Review</button>
            </div>            
        </div>
    )
}

export default AddCommentForm
