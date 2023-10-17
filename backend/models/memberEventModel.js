import mongoose from 'mongoose';

const memberEventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  iCalUID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  startTime: {
    //MARK time difference!
    type: Date,
    required: true,
  },
  endTime: {
    //MARK time difference!
    type: Date,
    required: true,
  },
  memberEmail:{
    type:String,
    required:true
  },
  organizer:{  
    type:String,
    required:true
  },
  creator:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:false
  },
  statusResponse:{
    type:String,
    required:false
  },
  statusEvent:{
    type:String,
    required:false
  },
  eventColor:{
    type:String,
    required:false
  }
});

const MemberEvent = mongoose.model('MemberEvent',memberEventSchema,'memberevents');
export default MemberEvent;