const bgColor = 'rgb(34,33,33)';
const textColor = 'white';
const headingFont = '"Franklin Gothic Medium", "Arial Narrow", "Arial"';
const bodyFont = '"Lucid Sans", "Lucid Sans Regular", "Lucid Grande"';
const orangeColor = '#AD0E82';

export default {
    footer:{
        marginTop: '10vmax',
        padding: '2vmax',
        backgroundColor: `${bgColor}`,
        color: `${textColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: [`${headingFont}`],
        "&:hover":{
            cursor: 'default'
        }
    },
    leftFooter: {
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        fontSize:'1.4vmax',
        "& p, & strong":{
            fontFamily: [`${bodyFont}`],
            fontSize: '1.2vmax'
        }
    },
    midFooter: {
        width: '60%',
        textAlign: 'center',
        fontSize:'1vmax',
        "& p":{
            maxWidth: '60%',
            margin: '1vmax auto'
        }
    },
    rightFooter: {
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        "& h4":{
            fontFamily: [`${headingFont}`],
            fontSize: '1.4vmax',
            textDecoration: 'underline'
        },
        "& a": {
            transition: 'all 0.5s',
            color: 'white',
            textDecoration: 'none',
            fontSize: '1vmax',
            margin: '0.4vmax',
            "&:hover":{
                cursor: 'pointer',
                color: `${orangeColor}`
            },
            "& FontAwesomeIcon":{
                "&:hover":{
                    color: `${orangeColor}`
                }
            }
        }
    }
}