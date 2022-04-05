import React from 'react';
import { ReactNavbar } from "overlay-navbar";
import logo from '../../../images/artyftLogo.jpeg';

const orangeColor = '#930638';

const Header = () => {
    return ( 
        <div>
            <ReactNavbar 
                logo={logo}
                logoHoverColor="black"
                burgerColor="white"
                burgerColorHover="grey"
                logoWidth="100%"
                navColor1={`${orangeColor}`}
                link1Size="1.5vmax"
                link1Color="white"
                link1Padding="1vmax"
                link1ColorHover="black"
                nav2justifyContent="flex-end"
                link1Margin="1vmax"
                link2Margin="0"
                link3Margin="0"
                link4Margin="1vmax"
                nav3justifyContent="flex-start"
                link1Text="Home"
                link1Url="/"
                link2Url="/products"
                link3Url="/about"
                link4Url="/contact"
                link1Family="Franklin Gothic Medium"
                link2Text="Products"
                link3Text="About Us"
                link4Text="Contact Us"
                nav4justifyContent="flex-start"
                searchIconMargin="0.5vmax"
                cartIconMargin="1vmax"
                profileIconMargin="0.5vmax"
                searchIconColorHover={`${orangeColor}`}
                cartIconColorHover={`${orangeColor}`}
                profileIconColorHover={`${orangeColor}`}
                />
        </div>
     );
};

export default Header;