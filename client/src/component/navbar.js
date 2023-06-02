import React from 'react';

import { Link } from 'react-router-dom';
const navbar= ()=>{
    return(
        
        
         <div className='navbar'>

            <ul>
            
                <li>
                <Link to='/'>Home</Link>
                <Link to='add'>Add Product</Link>
                <Link to='update'>Update Product</Link>
                <Link to='logout'>Logout</Link>
                <Link to='profile'>Profile</Link>
                <Link to='signup'>SignUp</Link>
                </li>
            

            </ul>
            
        </div>

        
        
        
        
        
    )
}
export default navbar;