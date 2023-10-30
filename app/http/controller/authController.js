const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController(){
    const _getRedirectUrl= (req)=>{
        return req.user.role==='admin' ? '/admin/orders': '/customer/orders'
    }

    return{
        login(req,res)
        {

            res.render('auth/login')
        },
        postLogin(req,res,next){
            passport.authenticate('local',(err,user,info)=>{
                if(err){
                req.flash('error',info.message)
                return next(err)
                }
                if(!user)
                {
                    req.flash('error',info.message)
                    return res.redirect(_getRedirectUrl(req))
                }
                req.logIn(user,(err)=>{
                    if(err)
                    {
                        req.flash('error',info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })
            })(req,res,next)
        },

        register(req,res)
        {
            res.render('auth/register')
        },
        async postRegister(req,res){
            const { name, email, password } = req.body;
           
           if( !name || !email || !password ){
            req.flash('error','All fields are required')
            req.flash('name',name);
            req.flash('email',email);
            return res.redirect('/register')
           }
       
           
           try {
            const user = await User.findOne({ email: email }).exec();
            if (user) {
                req.flash('error', 'User already taken');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }
            // Continue with the rest of your logic if the user doesn't exist
        } catch (err) {
            // Handle the error, perhaps by sending an error response
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        
        
        
        const hashPassword = await bcrypt.hash(password,10)
           const user = new User({
            name,
            email,
            password: hashPassword,
           })
           user.save().then((user)=>{
            console.log('saved data to database successfully');
            res.redirect('/');
        }).catch(err=>{
            req.flash('error','Something went wrong');
            return res.redirect('/register');
        });
        
        },
        logout(req,res){
            req.logout(()=>{
                return res.redirect('/login')
            })
            
        }
    }
}
module.exports = authController