// const LocalStrategy = require('passport-local').Strategy();
// const User = require('../models/user')
// const bcrypt = require("bcrypt")
// function init(passport){
//    passport.use(new passport({usernameField: 'email'}, async (email, password, done)=>{
//    const user = await User.findOne({email: email})
//    if(!user)
//    {
//     return done(null,false,{message: 'No User with this email'})
//    }
// bcrypt.compare(password,user.password().then(match=>{
//     if(match){
//         return done(null,user,{message: 'loged in successfully'})
//     }
//         return done(null,false,{message: 'incorrect email or password '})
// })).catch(err => {
//     return done(null,false,{message: 'SomeThing Went Wrong'})
// })

//    }))
//    passport.serializeUser((user,done )=>{
//     done(null, user._id)

//    })
//    passport.deserializeUser((id,done)=>{
//     User.findById(id, (err, user) => {
//         done(err, user)
//     })

//    })

// }

// module.exports = init;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require("bcrypt");

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: 'No User with this email' });
            }

            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return done(null, user, { message: 'Logged in successfully' });
            } else {
                return done(null, false, { message: 'Incorrect email or password' });
            }
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // passport.deserializeUser((id, done) => {
    //     User.findById(id, (err, user) => {
    //         done(err, user);
    //     });
    // });
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err, null);
            });
    });
    
}

module.exports = init;
