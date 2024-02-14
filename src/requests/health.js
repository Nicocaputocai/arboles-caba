const axios = require('axios');

const healthRequest = {
    getAll: () =>{
        return axios({
            method: 'GET',
            url:'/health'

        })
    }
}

module.exports = healthRequest