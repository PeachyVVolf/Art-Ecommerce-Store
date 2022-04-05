const headingFont = '"Franklin Gothic Medium", "Arial Narrow", "Arial"';
const bodyFont = '"Lucid Sans", "Lucid Sans Regular", "Lucid Grande"';
const orangeColor = '#AD0E82';
const purpleColor= '#800002';

const styles = {
    ProductDetails: {
        padding: '8vmax',
        display: 'flex',
        "& div":{
            justifyContent: 'space-evenly',
            boxSizing: 'border-box'
        }
        
    },
    carousel: {
        padding: '0px',
        marginLeft: '-160px',
        width: '800px',
    },
    carouselImage: {
        width: '30vmax',
    },
    details:{
        width: '60%',
        paddingRight: '0%',
        marginRight: '0%'
    },
    detailsBlock1:{
        "& h1":{
            color: 'white',
            font: `600 1.6vmax ${headingFont}`
        }
    },
    detailsBlock2: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTop: '1px solid white',
        borderBottom: '1px solid white',
        width: '70%',
        padding: '1vmax 0',
        "& span":{
            font: `200 1vmax ${bodyFont}`
        }
    },
    detailsBlock3: {
        width: '70%',
        "& h1":{
            color: 'white',
            font: `400 1.8vmax ${headingFont}`,
            margin: '1vmax 0'
        },
        "& p":{
            borderTop: '1px solid white',
            borderBottom: '1px solid white',
            padding: '1vmax 0',
            color: 'white',
            font: `400 1.3vmax ${headingFont}`,
            margin: '1vmax 0'
        }
    },
    detailsBlock31:{
        display: 'flex',
        alignItems: 'center',
    },
    detailsBlock311: {
        "& button": {
            border: 'none',
            backgroundColor: `${orangeColor}`,
            padding: '0.5vmax 1vmax',
            cursor: 'pointer',
            color: 'white',
            transition: 'all 0.5s',
            "&:hover":{
                backgroundColor: `${purpleColor}`
            }
        },
        "& input":{
            border: 'none',
            padding: '0.5vmax',
            width: '1vmax',
            textAlign: 'center',
            outline: 'none',
            font: `400 0.8vmax ${bodyFont}`,
            color: 'rgba(0, 0, 0, 0.74)'
        }
    },
    redColor: {
        color: 'red'
    },
    greenColor: {
        color: 'green'
    },
    addToCart: {
        border: 'none',
        cursor: 'pointer',
        padding: '0.5vmax 2vmax',
        color: 'white',
        font: `400 0.8vmax ${headingFont}`,
        borderRadius: '7px',
        margin: '1vmax',
        outline: 'none',
        transition: 'all 0.5s',
        backgroundColor: `${orangeColor}`,
        "&:hover":{
            backgroundColor: `${purpleColor}`
        }
    },
    detailsBlock4: {
        color: 'white',
        font: `500 1.3vmax ${bodyFont}`,
        "& p": {
            font: `300 1.1vmax ${bodyFont}`
        }
    },
    submitReview: {
        border: 'none',
        backgroundColor: `${orangeColor}`,
        color: 'white',
        font: `500 0.8vmax ${headingFont}`,
        borderRadius: '7px',
        padding: '0.6vmax 2vmax',
        margin: '1vmax 0',
        transition: 'all 0.5s',
        outline: 'none',
        "&:hover":{
            backgroundColor: `${purpleColor}`,
            cursor: 'pointer',
            transform: 'scale(1.1)'
        }
    }
};

export default styles;