const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User =  require('../../models/Model');
const Profile = require('../../models/Profile');
const{check,validationResult} = require('express-validator');


//@route    GET api/profile/me
//@desc     Get current users profile
//@access   Private

//returning my own profile
router.get('/me',auth,async(req,res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:'there is no profile for this user'});
        }
        res.json(profile);
    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

 


//@route POST api/profile
//@desc Create or Update

router.post('/',[auth,[
    check('bio','bio is required')
    .not()
    .isEmpty(),
    check('genres','genres is required')
    .not()
    .isEmpty()
]
],
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const{

        website,
        genres,
        instagram,
        spotify,
        snapchat
        } = req.body;


        //build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(website) profileFields.website = website
        if(genres){
            profileFields.genres = genres.split(',').map(genres =>genres.trim());
        }



        //build social object
        profileFields.social = {}
        if(instagram) profileFields.social.instagram = instagram;
        if(spotify) profileFields.social.spotify = spotify;
        if(snapchat) profileFields.social.snapchat = snapchat;

       try{
            let profile = await Profile.findOne({user: req.user.id});

            if(profile)
            {
                profile = await Profile.findOneAndUpdate(
                    {user:req.user.id},
                    {$set:profileFields },
                    {new:true}
                    );

                    return res.json(profile);
            }

            //create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
       }
       catch(err)
       {
           console.error(err.message);
           res.status(500).send('server error');
       }
}
);


//get all profiles and profile by user ID
//profile by user id
//GET api/profile/user/:user_id(by user id)


router.get('/user/:user_id',async(req,res)=>
{
    try{
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);

        if(!profile)return res.status(400).json({msg:'there is no profile for this user'})
        res.json(profile);   
    }

    catch(err)
    {
        console.error(err.message);
        if(err.kind == 'ObjectId')
        {
            return res.status(400).json({msg:'Profile not found'});
        }
        res.status(500).send('server error');
    }
})


//delete a user and profile

router.delete('/',auth,async(req,res)=>{
    try{
        //remove profile
        //to remove users posts
         await Profile.findOneAndRemove({user: req.user.id});

         await User.findOneAndRemove({ _id: req.user.id});


        res.json({msg:'user deleted'});
    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send('server error');
    }

});







module.exports = router;
