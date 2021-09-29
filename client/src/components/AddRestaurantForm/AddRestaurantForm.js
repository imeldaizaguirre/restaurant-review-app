import React, {useContext, useState, useEffect} from 'react'
import {UserContext} from '../../UserContext'
import {FaStar} from "react-icons/fa"
import './AddRestaurantForm.css'


function AddRestaurantForm({handleCancel, addRestaurant, hideRestaurantForm}) {
    const {restaurantNameK, restaurantAddressK,  restaurantRatingK} = useContext(UserContext);
    const [restaurantName, setRestaurantName] = restaurantNameK;
    const [restaurantAddress, setRestaurantAddress] = restaurantAddressK; 
    const [restaurantRating, setRestaurantRating] = restaurantRatingK;

    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        handleValidation()
    }, [restaurantName, restaurantAddress, restaurantRating,formIsValid])


    const addrestaurantName = (e) => {
        let name = e.target.value;
        setRestaurantName(name)   
    }
    const addrestaurantAddress = (e) => {
        let restaurantAddress = e.target.value;
        setRestaurantAddress(restaurantAddress)
       
    }

    const handleValidation = () => {
        //Name
        if (!restaurantName) {
        setFormIsValid(false)
        return
        }
        if (!restaurantAddress) {
            setFormIsValid(false)
            return
        }
        if (restaurantRating === 0) {
            setFormIsValid(false)
            return
        }
        setFormIsValid(true)
    }

 
    return (
        <div className="outer__container">
            <div className="form__container">
                <div className="form__restaurant__name">
                    <p className="restaurant__name__field">Restaurant Name</p>
                    <input  
                    type="text"
                    onChange={addrestaurantName}
                    required
                    />
                    {restaurantName.length === 0 && <span className="error">*Restaurant name required</span>}
                </div>
                <div className="form__restaurant__address">
                    <p className="form__name__field">Address</p>
                    <input  
                    type="text"
                    onChange={addrestaurantAddress}
                    required
                    />   
                    {restaurantAddress.length === 0 && <span className="error"> Address is required</span>}  
                </div>

            </div>

            <div className="user__rating">
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return(
                        <label key={i}>
                            <input 
                            type="radio" 
                            name="rating" 
                            value={ratingValue}
                            onClick={() => setRestaurantRating(ratingValue)}

                            />
                            <FaStar className="star" 
                            color={ratingValue <= restaurantRating ? "#ffc107" : "#e4e5e9" }
                            size={30}
                            /> 
                        </label> 
                    ) 
                })}
            </div>
            <div className="form__buttons">
                <button type="submit" 
                onClick={(e) => (hideRestaurantForm())}
                >Cancel</button>
                
                <button type="submit" 
                disabled = {!formIsValid}
                onClick={addRestaurant}
                >Add</button>
               
            </div>

           
            
        </div>
    )
}

export default AddRestaurantForm
