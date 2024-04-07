const { json } = require('body-parser');
const User = require('../models/users');
const {
    ValidationError,
    PermissionError,
    AuthorizationError,
    DatabaseError,
    NotFoundError,
    OperationalError
  } = require('../utils/errors');

const getUsers = async (req, res) => {
    try{
        let { userArr } = req.params;
        let resp = [];
        if(userArr && isarray(userArr) && arr.length > 0){
            for(let email of userArr){
                let user = await User.findOne({ email}, {password: 0}).lean();
                resp.push(user);
            }
        }else{
            resp = await User.find({}, {password: 0}).lean();
        }
        res.status(200).json({message: 'Users fetched successfully', users: resp});
    }catch(error){
        res.status(500).json({error: 'Error getting user'});
    }
}

module.exports = {  getUsers };