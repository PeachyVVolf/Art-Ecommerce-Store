const bgColor = 'rgb(34,33,33)';
const textColor = 'white';
const headingFont = '"Franklin Gothic Medium", "Arial Narrow", "Arial"';
const bodyFont = '"Lucid Sans", "Lucid Sans Regular", "Lucid Grande"';
const orangeColor = '#AD0E82';
const purpleColor= '#800002';

export default {
    banner: {
        backgroundImage: `linear-gradient(to right, ${orangeColor}, ${purpleColor})`,
        height: '100vmin',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        cursor: 'default',
        justifyContent: 'center',
        "& h1":{
            margin: '5vmax',
            font: `600 2.5vmax ${headingFont}`
        },
        "& p":{
            font: `300 1.4vmax ${bodyFont}`
        },
        "& a":{
            "& button":{
                marginBottom: '5vmax',
                cursor: 'pointer',
                backgroundColor: 'black',
                borderRadius: '12px',
                color: 'white',
                padding: '1.2vmax',
                borderColor: 'black',
                transition: 'all 0.5s',
                "&:hover":{
                    backgroundColor: `${orangeColor}`,
                    borderColor: `${purpleColor}`,
                    fontSize: '1.2vmax',
                    color:'black',
                    fontWeight: '700'
                }
            }
        },
        clipPath: 'polygon(50% 0%, 100% 50%, 23% 100%, 0 32%)'
    },
    homeHeading: {
        textAlign: 'center',
        fontFamily: `${headingFont}`,
        fontSize: '1.4vmax',
        borderBottom: '2px solid rgba(149, 7, 62, 0.5)',
        width: '20vmax',
        padding: '1vmax',
        margin: '5vmax auto'
    },
    container: {
        display: 'flex',
        margin: '2vmax auto',
        width: '80vw',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '100%'
    }
};