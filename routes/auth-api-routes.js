var passport = require('passport');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
    app.post('/api/auth', function(request, response) {
      console.log("MADE IT");
        passport.authenticate(
            'local', 
            {session: false}, 
            function(error, user, info) {
                console.log("auth-api 10");
                if (error || !user) {
                    console.log("auth-api 12: " + error);
                    return response.status(403);
                    
                    // .json({
                        // message: 'Unable to Authorize',
                        // user   : user,
                        // error  : error,
                        // info: info
                    // });
                }
                // console.log("HERE!")
               request.login(user, {session: false}, function(error) {
                   console.log("auth-api 24: LOGIN");
                   if (error) {
                       console.log('[auth-api-routes.js] Error on request.login', error);
                       response.send(error);
                   }
                   var sanitizedUser = {
                       id: user.id,
                       username: user.username,
                       email: user.email
                   };

                   // generate a signed json web token with the contents of user object and return it in the response
                   const token = jwt.sign(sanitizedUser, 'your_jwt_secret');
                   response.json(
                       {
                           user: sanitizedUser,
                           token: token,
                           redirectUrl: '/daily'
                       }
                   );
                });
            }
        )(request, response);
    });
};