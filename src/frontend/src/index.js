import Calendar from '@toast-ui/calendar';
import moment  from 'moment';


const el = document.getElementById("app");
const all = document.getElementById("all");
const trigger = document.querySelector(".dropdown-trigger");
const group_dropdown = document.getElementById("groupEmailDropdown");
const selectedTextElement = document.getElementById('selectedGroupEmail');
const range = document.querySelector('.navbar--range');
const today = document.getElementById("today");
const prev = document.getElementById("prev");
const next = document.getElementById("next");


const calendar = new Calendar(el, {
  defaultView: 'week',
  week: {
    startDayOfWeek:0,
    taskView: false,
    eventView: true,
    showTimezoneCollapseButton: true,
  },
  timezone: {
    zones: [
      {
        timezoneName: 'Asia/Tokyo',
        displayLabel: 'UTC+9:00',
        tooltip: 'Tokyo',
      },
    ],
  },
  theme: {
    week: {
      dayGridLeft: {
        width: '8rem',
      },
      timeGridLeft: {
        width: '8rem',
      },
    },
  },
  template: {
    milestone: function (event) {
      return '<span class="calendar-event-milestone">' + '⛳ ' + event.title + '</span>';
    },
    milestoneTitle: function () {
      return '<strong>Milestones</strong>';
    },
    task: function (event) {
      return '<span class="calendar-event-task">' + '✅ ' + event.title + '</span>';
    },
    taskTitle: function () {
      return '<strong>Tasks</strong>';
    },
    allday: function (event) {
      return '<span class="calendar-event-allday">' + event.title + '</span>';
    },
    alldayTitle: function () {
      return '<strong>All day events</strong>';
    },
    time: function (event) {
      if (event.state=='Free'){
        return ('<span class="calendar-event-time" style="color: #222; text-decoration: line-through;">' + event.title + '</span>');
      }else{
        return ('<span class="calendar-event-time" style="color: #222;">' + event.title + '</span>');
      }
    },
    goingDuration: function (event) {
      return (
        '<span class="calendar-event-going-duration" style="color: #222;">' +
        event.goingDuration +
        '</span>'
      );
    },
    comingDuration: function (event) {
      return (
        '<span class="calendar-event-coming-duration" style="color: #222;">' +
        event.comingDuration +
        '</span>'
      );
    },
    weekDayName: function (data) {
      var customDayNames = ['日', '月', '火', '水', '木', '金', '土'];
      var date = data.dateInstance.toDate();
      return (
        '<span style="display: block; text-align: center;" class="calendar-event-weekday-name">' +
        moment(date).format('MM-DD') + ' ' + customDayNames[data.day] +
        '</span>'
      );
    },
    weekGridFooterExceed: function (hiddenEvents) {
      return (
        '<span class="calendar-event-weekgrid-footer-exceed">+' + hiddenEvents + '</span>'
      );
    },
    collapseBtnTitle: function () {
      return '⬆️';
    },
    timezoneDisplayLabel: function (data) {
      //customize the label of the time zone in the weekly/daily view that uses two or more time zones.
      if (data.displayLabel) {
        return data.displayLabel;
      }
      return String(
        data.timezoneOffset > 0 ? '+' + data.timezoneOffset : data.timezoneOffset
      );
    },
    timegridNowIndicatorLabel: function (data) {
      return 'Now: ' + moment(data.time.toDate()).format('hh:mm');
    },
    timegridDisplayTime({ time }) {
      return `sub timezone: ${time}`;
    },
    popupEdit() {
      return '';
    },
    popupDelete() {
      return '';
    },
  },
  disableClick: true,
  usageStatistics:false,
  // useFormPopup: true,
  useDetailPopup: true
});

calendar.setTheme({
  week: {
    dayGridLeft: {
      borderRight: 'none',
      backgroundColor: 'rgba(81, 92, 230, 0.05)',
      width: '144px',
    },
  },
});

displayRenderRange();
const [curr_startDate, curr_endDate] = getLocaltTime();
// const startLocal = calendar.getDateRangeStart().d.d;
// const startDate = startLocal.toISOString();  // Expected: '2023-10-07T15:00:00.000Z'
// const endLocal = calendar.getDateRangeEnd().d.d;
// endLocal.setHours(23, 59, 59, 999);
// const endDate = endLocal.toISOString();
// console.log(startDate,endDate);  // Expected: '2023-10-14T14:59:59.999Z'

calendar.render();



trigger.addEventListener("click", () => {
  const [startDate, endDate] = getLocaltTime();
  group_dropdown.innerHTML = '';
  const apiUrl = `http://tui-backend:3000/api/groups`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
    .then((data) => {
      data.forEach(group => {
        const anchor = document.createElement("a");
        // anchor.href = "#";
        anchor.className = "dropdown-item";
        anchor.dataset.viewName = group.groupEmail; 
        anchor.textContent = group.groupEmail;
        group_dropdown.appendChild(anchor);

        // Attach click event listener to each dropdown-item
        anchor.addEventListener('click', function() {
          // Retrieve group name from the clicked anchor's data-viewName attribute
          group_dropdown.innerHTML = '';
          const groupName = this.dataset.viewName; 
          selectedTextElement.textContent = groupName;
      
          const groupeEventUrl = `http://tui-backend:3000/api/groupsevents?groupEmail=${groupName}&minTime=${startDate}&maxTime=${endDate}`;
          fetch(groupeEventUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
          })
          .then((data) => {
            updateCalendarWithData(data);
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
          });
          
        });
      });
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
});

//Retrieve all event in current period
all.addEventListener("click", () => {
  displayEvents();
});

prev.addEventListener('click', function () {
  calendar.prev();
  if (selectedTextElement.textContent==="Select Group Email" ){
    displayEvents();
  }else{displayMemberEvents();}
  displayRenderRange();
});

today.addEventListener('click', function () {
  calendar.today();
  if (selectedTextElement.textContent==="Select Group Email" ){
    displayEvents();
  }else{displayMemberEvents();}
  displayRenderRange();
});

next.addEventListener('click', function () {
  calendar.next();
  if (selectedTextElement.textContent==="Select Group Email" ){
    displayEvents();
  }else{displayMemberEvents();}
  displayRenderRange();
});

function displayEvents(){
  //Retrieve all event in current clendar range event.d 
  const [startDate, endDate] = getLocaltTime();
  const apiUrl = `http://tui-backend:3000/api/events?minTime=${startDate}&maxTime=${endDate}`; 
  // Make an HTTP GET request to retrieve data
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      updateCalendarWithData(data);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });

}

function displayMemberEvents(){
  const groupName = selectedTextElement.textContent
  const [startDate, endDate] = getLocaltTime();
  const groupeEventUrl = `http://tui-backend:3000/api/groupsevents?groupEmail=${groupName}&minTime=${startDate}&maxTime=${endDate}`;
  fetch(groupeEventUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
  })
  .then((data) => {
    updateCalendarWithData(data);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function updateCalendarWithData(data) {
  //Currentle, it does not support repeating event!
  const events = data;
  calendar.clear();

  events.forEach((event) => {
    // console.log("Retrieve: ",event.title,event.startTime.substring(0, 19),event.endTime.substring(0, 19));
    calendar.createEvents([
      {
        id: event.id,
        calendarId: event.iCalUID,
        title: event.memberEmail.match(/^([^@]+)@/)[1] + ' ' + event.title,
        // isAllDay: true,
        start: moment.utc(event.startTime),
        end: moment.utc(event.endTime),
        location:event.location,
        backgroundColor: (!event.statusResponse) ? event.eventColor:hexWithTransparency(event),
        state: (event.statusResponse==='declined')?'Free':'Busy',
        // attendees:['A','B','C'],
        borderColor:'#696969',
        category: 'time',
      },
    ]);
    
  });
  calendar.render();
}

function getNavbarRange(tzStart, tzEnd, viewType) {
  var start = tzStart.toDate();
  var end = tzEnd.toDate();
  var middle;
  if (viewType === 'month') {
    middle = new Date(start.getTime() + (end.getTime() - start.getTime()) / 2);

    return moment(middle).format('YYYY-MM');
  }
  if (viewType === 'day') {
    return moment(start).format('YYYY-MM-DD');
  }
  if (viewType === 'week') {
    return moment(start).format('YYYY-MM-DD') + ' ~ ' + moment(end).format('YYYY-MM-DD');
  }
  throw new Error('no view type');
}

function hexWithTransparency(event) {
  if(event.statusResponse==="accepted" || event.statusResponse==="declined"){
    return event.eventColor;
  } 
  else if (event.statusResponse==="needsAction"){
    return '#ffffff';
  }
  else{
    let hex = event.eventColor;
    const alpha = 0.5
    if (hex.charAt(0) === '#') {
        hex = hex.slice(1);
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `#${hex}${alphaHex}`;
  }
}

function displayRenderRange() {
  var viewName = calendar.getViewName();
  range.textContent = getNavbarRange(
    calendar.getDateRangeStart(),
    calendar.getDateRangeEnd(),
    viewName
  );
}

function getLocaltTime(){
  const startLocal = calendar.getDateRangeStart().d.d;
  const startDate = startLocal.toISOString();  // Expected: '2023-10-07T15:00:00.000Z'
  const endLocal = calendar.getDateRangeEnd().d.d;
  endLocal.setHours(23, 59, 59, 999);
  const endDate = endLocal.toISOString();
  return [startDate,endDate];  // Expected: '2023-10-14T14:59:59.999Z'
}
