import axios from "axios";

const twitchListEndpoint = axios.create({
    baseURL: "https://api.twitch.tv/helix",
    headers: {
        "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID
    }
});

const twitchGetToken = axios.create({
    baseURL: `https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&client_secret=${process.env.REACT_APP_TWITCH_CLIENT_SECRET_KEY}&grant_type=client_credentials`,
    method: "POST"
})

const http = {
    twitchListEndpoint,
    twitchGetToken
};

export default http;