const bgColor = 'rgb(34,33,33)';
const headingFont = '"Franklin Gothic Medium", "Arial Narrow", "Arial"';
const bodyFont = '"Lucid Sans", "Lucid Sans Regular", "Lucid Grande"';
const orangeColor = '#AD0E82';

const styles = {
    productCard: {
        width: '16vmax',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        margin: '2vmax',
        padding: '1vmax',
        color: `${bgColor}`,
        transition: 'all 0.5s',
        paddingBottom: '0.5vmax',
        backgroundColor: 'white',
        "& img":{
            width: '16vmax'
        },
        "& div":{
            marginRight:'0.5vmax',
            marginTop:'0.5vmax',
            marginBottom:'0.5vmax',
            display: 'flex',
            justifyContent: 'flex-start',
            "& span": {
                margin:'0.5vmax',
                font: `300 0.7vmax ${bodyFont}`,
                color: `${bgColor}`
            }
        },
        "& p":{
            color: `${bgColor}`,
            fontFamily: `${bodyFont}`,
            fontSize: '1.2vmax',
            margin: '1vmax 0.5vmax',
            marginBottom: '0'
        },
        "& span": {
            margin: '0.5vmax 0.5vmax',
            color: 'tomato',
            fontFamily: `${headingFont}`,
            fontSize: '1vmax'
        },
        "&:hover": {
            boxShadow: `5px 5px 5px ${orangeColor}`,
            transform: 'translateY(-1vmax)'
        }
    },
    '@media screen and (max-width: 600px)': {
        productCard:{
            '& p':{
                fontSize: '1.7vmax'
            },
            '& div': {
                margin: '0vmax',
                display: 'block',
                fontSize:'12px',
                '& span':{
                    margin: '0 0.5vmax',
                    font: `300 1vmax ${bodyFont}`
                }
            },
            '& span':{
                fontSize: '1.5vmax'
            }
        }
    }
};

export default styles;