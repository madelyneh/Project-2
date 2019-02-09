let passport = require("passport");
let jwt = require('jsonwebtoken');

module.exports = function(app) {
    app.post('/api/auth', function(request, response) {
        passport.authenticate(
            'local', 
            {session: false}, 
            function(error, user, info) {
                if (error || !user) {
                    return response.status(400).json({
                        message: 'Unable to Authorize',
                        user   : user,
                        info  : info
                    });
                }
               request.login(user, {session: false}, (error) => {
                   if (error) {
                       response.send(error);
                   }
                   let sanitizedUser = {
                       id: user.id,
                       username: user.username,
                       email: user.email
                   }
                   // generate a signed json web token with the contents of user object and return it in the response
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