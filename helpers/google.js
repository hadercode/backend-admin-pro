const { OAuth2Client } = require('google-auth-library');

const verifyGoogle = async (token) => { 

    const client = new OAuth2Client({
      client_secret: process.env.GOOGLE_SECRET
    });
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the WEB_CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
    });
  
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If the request specified a Google Workspace domain:
    // const domain = payload['hd'];
    return payload;
}
//verify().catch(console.error);

module.exports = {
    verifyGoogle
}
