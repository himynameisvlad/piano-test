const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

router.post('/', auth.optional, async (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        failed: 'Email is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        failed: 'Password is required',
      },
    });
  }

  const existingUser = await Users.findOne({ email: user.email });

  if (existingUser) {
    return res.status(422).json({
        errors: {
          failed: 'User exists',
        },
      });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.post('/restore', auth.optional, async (req, res, next) => {
    const { body: { user } } = req;
  
    if(!user.email) {
      return res.status(422).json({
        errors: {
          failed: 'Email is required',
        },
      });
    }
  
    if(!user.secret) {
      return res.status(422).json({
        errors: {
          failed: 'Secret is required',
        },
      });
    }
  
    const currentUser = await Users.findOne({ email: user.email });

    if(!currentUser) {
        return res.status(422).json({
            errors: {
              failed: 'User not found',
            },
        });
    }

    if(currentUser.secret === user.secret) {
        return res.json(null);
    }

    return res.status(422).json({
        errors: {
          failed: 'Secret is incorrect',
        },
    });
  });

router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        failed: 'Email is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        failed: 'Password is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(422).json(info);
  })(req, res, next);
});

router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
