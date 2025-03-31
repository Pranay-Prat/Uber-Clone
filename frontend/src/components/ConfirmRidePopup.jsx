import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmRidePopup = (props) => {
    const [otp, setOtp] = useState('');
    const [distance, setDistance] = useState(null); // State to store the distance
    const navigate = useNavigate();

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

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: { rideId: props.ride._id, otp: otp },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status === 200) {
                props.setconfirmridePopupPanel(false);
                props.setridePopupPanel(false);
                navigate('/captain-riding', { state: { ride: props.ride } });
            }
        } catch (error) {
            console.error('Error confirming ride:', error);
            alert('An error occurred while confirming the ride.');
        }
    };

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'>
                <i
                    onClick={() => {
                        props.setridePopupPanel(false);
                    }}
                    className='text-3xl text-gray-300 ri-arrow-down-wide-line'
                ></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>
            <div className='flex items-center gap-3 justify-between bg-yellow-400 rounded-lg mt-4 p-2'>
                <div className='flex items-center gap-3'>
                    <img
                        className='h-16 w-16 rounded-full object-cover'
                        src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                        alt=''
                    />
                    <h2 className='text-xl font-medium'>
                        {props.ride?.user.fullname.firstname + ' ' + props.ride?.user.fullname.lastname}
                    </h2>
                </div>
                <h2 className='text-lg font-semibold'>{distance ? `${distance} KM` : 'Calculating...'}</h2>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center mt-4'>
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
                <div className='mt-4 w-full'>
                    <form onSubmit={submitHandler}>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type='number'
                            className='bg-[#eee] font-mono px-8 py-2 text-lg rounded-base w-full my-3'
                            placeholder='Enter OTP'
                        />
                        <button className='w-full mt-2 bg-green-500 text-lg flex justify-center text-white font-semibold rounded-lg p-3'>
                            Confirm
                        </button>
                        <button
                            onClick={() => {
                                props.setconfirmridePopupPanel(false);
                                props.setridePopupPanel(false);
                            }}
                            className='w-full mt-2 text-white text-lg bg-red-500 font-semibold rounded-lg p-3'
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRidePopup;