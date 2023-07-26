const express = require('express');
const cors = require('cors');
const axios = require('axios');

// if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config();
// }

const app = express();
app.use(cors());
console.log(process.env.NODE_ENV)
// to bypass CORS
app.get('/', async (req, res) => {
  
  if (req.query.url) {
    const proxyRes = await axios.get(`${req.query.url}`,{headers: {
            //"x-rapidapi-host": "https://api-football-v1.p.rapidapi.com/v3/",// this one for the rapid api server
            "x-rapidapi-host": "v3.football.api-sports.io" ,// this one for the api-football server
            "x-rapidapi-key": process.env.API_KEY,
        }});
    // const proxyRes = await axios.get(req.query.url);
    res.send(proxyRes.data);
  } else {
    res.send('Please provide a url query parameter');
  }
});

app.listen(5001, () => {
  console.log('Listening on port 5001...');
});