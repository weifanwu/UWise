require('dotenv').config()
var express = require('express');
var router = express.Router();
const User = require('../../models/userSchema.js');
const passport = require('passport');
const frontend_url = process.env.FRONTEND_HOST;
const session = require('express-session');
require('./auth.js')

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.use(session({ 
  secret: 'cats',
  resave: false,
  saveUninitialized: true,
}));
router.use(passport.initialize());
router.use(passport.session());

router.get('/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: frontend_url + '/services',
    failureRedirect: '/auth/google/failure'
  })
);

router.get("/login/success", async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.email;
      const findUser = await User.findOne({"email" : email});
      if (!findUser) {
        const picture = req.user.picture;
        const family_name = req.user.family_name;
        const given_name = req.user.given_name;
        const grade = "";
        const major = "";
        const classes = []
        const user = new User({ family_name, given_name, email, picture, grade, major, classes });
        await user.save();
      }
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
      });
    } else {
      res.status(500).send("Please sign in first");
    }
  } catch(error) {
    console.log("there is an error");
    console.log(error);
    res.status(500).send("there is an internal error");
  }
});

router.get('/getClasses', isLoggedIn, async (req, res) => {
  try {
    const findUser = await User.findOne({"email" : req.user.email});
    res.send(findUser ? findUser.classes : []);
  } catch(error) {
    console.error(error);
    res.status(500).send("There is some internal issue.");
  }
});

router.post('/addClass', isLoggedIn, async (req, res) => {
  try {
    const className = req.body.classname;
    await User.updateOne(
      {"email" : req.user.email},
      {
        $push: {
          classes: {
             $each: [ className ],
          }
        }      
      }
    );
    res.send("Added Successfully");
  } catch(error) {
    console.log("this is error");
  }
});

router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    } else {
      res.redirect(frontend_url);
    }
  });
});

router.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

module.exports = router;