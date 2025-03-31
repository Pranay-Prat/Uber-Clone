import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FinishRide = (props) => {
    const navigate = useNavigate();
    const [distance, setDistance] = useState(null); // State to store the distance

    // Fetch the real distance between pickup and destination
    useEffect(() => {
        const fetchDistance = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`, {
                    params: {
                        origin: props.ride?.pickup,
                        destination: props.ride?.destination,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.status === 200) {
                    setDistance(response.data.distanceInKm.toFixed(2)); // Set the distance in kilometers
                }
            } catch (error) {
                console.error('Error fetching distance:', error);
                setDistance('N/A'); // Fallback in case of an error
            }
        };

        if (props.ride?.pickup && props.ride?.destination) {
            fetchDistance();
        }
    }, [props.ride]);

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.status === 200) {
            navigate('/captain-home');
            alert('Ride finished successfully');
        }
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'>
                <i onClick={() => {
                    props.setfinishRidePanel(false);
                }} className='text-3xl text-gray-300 ri-arrow-down-wide-line'></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Ride Finished</h3>
            <div className='flex items-center gap-3 justify-between bg-yellow-400 rounded-lg mt-8 p-2'>
                <div className='flex items-center gap-3'>
                    <img className='h-16 w-16 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfH4QOh9hhpvEpTq5x0uYOAE5pO-XVUOEz4w&s" alt="" />
                    <h2 className='text-xl font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <h2 className='text-lg font-semibold'>{distance ? `${distance} KM` : 'Calculating...'}</h2>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.ride?.destination}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className='text-lg ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-6 w-full'>
                    <button onClick={endRide} className='w-full mt-2 bg-green-500 text-lg flex justify-center text-white font-semibold rounded-lg p-3'>Finish Ride</button>
                </div>
            </div>
        </div>
    );
}

export default FinishRide;