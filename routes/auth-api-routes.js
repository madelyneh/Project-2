var passport = require('passport');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
    app.post('/api/auth', function(request, response) {
        passport.authenticate(
            'local', 
            {session: false}, 
            function(error, user, info) {
                if (error) {
                    console.log("auth-api 14: " + error);
                    return response.status(403);
                } else if (!user) {
                    response.redirectUrl('/');

                }
                request.login(user, {session: false}, function(error) {
                    if (error) {
                        console.log('[auth-api-routes.js] Error on request.login', error);
                        response.send(error);
                    }
                    var sanitizedUser = {
                        id: user.id,
                        username: user.username,
                        firstName: user.nameInput,
                        lastName: user.lastName
                    };


                    // generate a signed json web token with the contents of user object and return it in the response
                    const token = jwt.sign(sanitizedUser, 'your_jwt_secret');
                    response.json(
                        {
                            user: sanitizedUser,
                            token: token,
                            redirectUrl: '/daily' + `?author_id=${sanitizedUser.id}`
                        }
                    );
                });
            }
        )(request, response);
    });
}