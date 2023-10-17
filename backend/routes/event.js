import express from 'express';
import MemberEvent from '../models/memberEventModel.js';
import MemberList from '../models/memberModel.js';
import GroupList from '../models/groupModel.js';

const router = express.Router();

// Route to retrieve events from MongoDB
router.get('/api/events', async (req, res) => {
  console.log('Entered /api/events route');  // Log entry
  const { minTime, maxTime } = req.query;
  console.log('minTime:', minTime); // Log received minTime
  console.log('maxTime:', maxTime); // Log received maxTime

  let query = {};
  if (minTime && maxTime) {
    query.startTime = { $gte: new Date(minTime),$lt: new Date(maxTime)};
  }
  console.log('Constructed query:', query); // Log the constructed query

  try {
    const events = await MemberEvent.find(query);
    // console.log('Found events:', events); // Log retrieved events
    res.json(events);
  } catch (error) {
    console.error('Error in /api/events route:', error); 
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/api/groups', async(req, res) => {
  console.log('Entered /api/groups route'); 
  try {
    const groups = await GroupList.find();
    // console.log('Found groups:', groups); // Log retrieved events
    res.json(groups);
  } catch (error) {
    console.error('Error in /api/events route:', error); 
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/api/groupsevents', async(req, res) => {
  console.log('Entered /api/groupevents route'); 
  const {groupEmail, minTime, maxTime} = req.query;

  try {
    const members = await MemberList.find({groupEmail: groupEmail}); // Corrected the typo here
    console.log(groupEmail,members);
    
    let allMemberEvents = []; // This will hold all events of all members

    for (let member of members) {
      let query = {};
      if (minTime && maxTime) {
        query.startTime = { $gte: new Date(minTime), $lt: new Date(maxTime) };
        query.memberEmail = member.memberEmail;
      }
      const memberEvents = await MemberEvent.find(query); // Awaited this operation
      // console.log(query,memberEvents);
      allMemberEvents.push(...memberEvents); // Add member's events to the main array
    }
    console.log('Found events:', allMemberEvents); // Log retrieved events
    res.json(allMemberEvents); // Send all events as response

  } catch (error) {
    console.error('Error in /api/groupevents route:', error); 
    res.status(500).json({ error: 'Server error' });
  }
});



export default router;