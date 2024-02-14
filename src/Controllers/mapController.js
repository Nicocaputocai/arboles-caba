require('dotenv').config()
module.exports ={
    map: (req,res) =>{
        res.render('map', {accessToken: process.env.MAPBOXTOKEN})
    }
}

// {accessToken: process.env.MAPBOXTOKEN}