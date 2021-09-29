import React from 'react'
import {markerStyles} from './MarkerStyles.js';

function Marker({text}) {
    return (
        <div style={markerStyles}className="Marker">
            {text}
        </div>
    )
}

export default Marker
