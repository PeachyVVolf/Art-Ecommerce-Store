import React from 'react';
import artyftLogo from '../../../images/artyftLogo.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import { withStyles } from '@material-ui/styles';
import styles from './footerStyles';

const Footer = ({classes}) => {
    return ( 
        <footer className={classes.footer}>
            <div className={classes.leftFooter}>
                <h4>Download our App</h4>
                <p>Download Artyft for Android and IOS</p>
                <strong>Under Development!!</strong>
            </div>
            <div className={classes.midFooter}>
                <img src={artyftLogo} alt='artyft' width='280px'/>
                <p>Pakistan's First NFT Marketplace.</p>
                <p>Copyrights 2021 &copy; Artyft</p>
            </div>
            <div className={classes.rightFooter}>
                <h4>Follow Us</h4>
                <a href=''><FontAwesomeIcon icon={faInstagram} /> Instagram</a>
                <a href=''><FontAwesomeIcon icon={faFacebook} /> Facebook</a>
                <a href=''><FontAwesomeIcon icon={faPinterestP} /> Pintrest</a>
            </div>
        </footer>
     );
};

export default withStyles(styles)(Footer);