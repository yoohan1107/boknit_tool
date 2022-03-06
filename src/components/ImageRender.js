import '../App.css';
import React from 'react'

function ImageRender(props) {
    console.log('props:',props);
    let patName = 'vevety';

    return (
        <div className='row'>
            {/* <div>{props}</div> */}
            <div className='col'>
                <div className='image-area'>
                <img className='img' src={require(`../profile/${patName}.png`)} alt=''/>
                </div>
            </div>
        </div>
    )
}

export default ImageRender;
