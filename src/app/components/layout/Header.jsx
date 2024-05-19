import React from 'react';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

const Header = () => {
    return (
        <header>
            <h1 className="text-3xl font-bold mb-4 text-white text-center m-3">
                <ListAltRoundedIcon className="text-white" /> Dynamic Form
            </h1>
        </header>
    );
};

export default Header;