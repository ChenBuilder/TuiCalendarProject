import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  groupEmail: {
    type: String,
    required: true,
  }
});

const GroupList = mongoose.model('GroupList',groupSchema,'grouplist');
export default GroupList;