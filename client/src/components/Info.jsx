import React from 'react';
import './components style/Info.css';

const Info = () => {

    const user = (JSON.parse(localStorage.getItem('activeUser')))[0];

    return (
        <div className='user_info_wrapper'>
            <div className='user_info'>
                <p><strong>Full Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone Number:</strong> {user.phone}</p>
                <p><strong>Website:</strong> {user.website}</p>
            </div>
        </div>
    )
}

export default Info;