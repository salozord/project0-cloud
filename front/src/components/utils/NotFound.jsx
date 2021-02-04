import React from 'react'
import { useLocation } from 'react-router-dom';

export default function NotFound() {
    const location = useLocation();
    
    return (
        <div>
            <h3>The route {location.pathname} does not exist</h3>
        </div>
    )
}
