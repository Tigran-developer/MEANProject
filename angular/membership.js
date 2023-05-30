const mongoose = require('mongoose');

const MembershipSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Membership = module.exports = mongoose.model('Membership',MembershipSchema);


module.exports.loadAllMemberships = ()=>{

  return Membership.find();

};

module.exports.loadMembershipById = (id)=>{

  const query = {_id:id}
  return Membership.findOne(query);

};

