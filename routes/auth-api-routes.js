var passport = require('passport');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
    app.post('/api/auth', function(request, response) {
        passport.authenticate(
            'local', 
            {session: false}, 
            function(error, user, info) {
                console.log("HERE")
                if (error || !user) {
                    console.log(error);
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
                   console.log("LOGIN")
                   if (error) {
                       response.send(error);
                   }
                   var sanitizedUser = {
                       id: user.id,
                       username: user.username,
                       email: user.email
                   };

                   // generate a signed son web token with the contents of user object and return it in the response
                   const token = jwt.sign(sanitizedUser, 'your_jwt_secret');
                   response.json(
                       {
                           user: sanitizedUser,
                           token: token
                       }
                   );
                });
            }
        )(request, response);
    });
};