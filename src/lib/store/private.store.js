import { writable } from "svelte/store";

export const menuItems = [
    { id: 0, title: "Basic Details", slug: "basic" },
    { id: 1, title: "Choose Dates", slug: "dates" },
    { id: 2, title: "Review & Schedule", slug: "schedule" },
];



export const privateModalOpen = writable(false)


export const teachers = writable([
    {
        id:1,
        name: "Tedd Surman",
        designation: "YAT500",
        image: "assets/img/tedd.jpeg",
        selected: true,
        options: [
            { duration: 30, amount: 60, currency: "USD" },
            { duration: 40, amount: 90, currency: "USD" },
            { duration: 60, amount: 120, currency: "USD" },
            { duration: 90, amount: 180, currency: "USD" },
        ],
    },

    {
        id:2,
        name: "Masumi Muramatsu",
        designation: "YAT300",
        image: "/assets/img/masumi.jpeg",
        selected: false,
        options: [
            { duration: 30, amount: 30, currency: "USD" },
            { duration: 40, amount: 45, currency: "USD" },
            { duration: 60, amount: 60, currency: "USD" },
            { duration: 90, amount: 90, currency: "USD" },
        ],
    },
])



export const currentDay = writable(0)


export const selectedSchedule = writable({
    //selectedTeacher : { id:1, name:"Tedd Surman"}
    //numberOfDays : 2
    //selectedDuration : { duration:30, amount:30, currency : "USD"}
    //day1:{ date :"", slot:"", timezone:""}
})


export const timeList = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "12:00PM"]


export const slots = writable([])

export const generateSlots = (date, startTime, endTime, slotDuration) =>{

    const availableSlots = [];
    const totalSlots = Math.floor((endTime - startTime) / (slotDuration * 60 * 1000));


    for (let i = 0; i < totalSlots; i++) {
        const slotStart = new Date(startTime.getTime() + i * slotDuration * 60 * 1000);
        const slotEnd = new Date(slotStart.getTime() + slotDuration * 60 * 1000);
        
        // Check if the time slot is available (you can replace this with your own logic)
        if (isSlotAvailable(slotStart, slotEnd, date)) {
          availableSlots.push(slotStart.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
        }
      }


    console.log({availableSlots})

    return availableSlots;
}


function isSlotAvailable(start, end, date) {
    // This is just an example, you need to implement your own logic to check if the time slot is available
    const isAvailable = true;
    
    return isAvailable;
  }


  export const formatAMPM = (date) =>{
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }