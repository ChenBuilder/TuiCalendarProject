import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  memberEmail: {
    type: String,
    required: true,
  },
  groupEmail: {
    type: String,
    required: true,
  },
  domain: {
    type: Boolean,
    required: true,
  }
});

const MemberList = mongoose.model('MemberList',memberSchema,'memberlist');
export default MemberList;