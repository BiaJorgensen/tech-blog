// Function to verify if user is logged in, redirect to login page if not
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
