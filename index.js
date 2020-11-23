let listOfRooms = require("./rooms")
const express = require("express");
const bodyParser = require("body-parser");
let roomsId = 3;
let bookedRoom = [];
const app = express();
let port = process.env.PORT || 8000
app
.use(bodyParser.json())
.get("/", (req, res)=>{                       
    res.status(200).send
    ( `<h1>HOTELROOM BOOKING API</h1> ,
        <h1>FOR ALL EXISTING ROOM HIT : url/ListAllRooms</h1>
        <h1>FOR ALL BOOKED ROOM HIT : url/ListAllBookedRooms</h1>
        <h1>FOR ALL CUSTOMERS HIT : url/ListAllCustomers</h1>`  )
})
.get("/ListAllRooms", (req,res) =>
{
    res.status(200).json({
        rooms:listOfRooms
    })
 })
 .get("/ListAllBookedRooms", (req,res) =>
     {
         res.status(200).json({
             rooms:bookedRoom
     })
})
.get("/ListAllCustomers" ,(req,res) =>
 {
   // bookedRoom.forEach((room) => 
    //{
     res.status(200 ).json(
    {
      //  customerName : room.customerName,
      //  roomName : room.id,
      //  date : room.date,
      //  startTime : room.startTime,
      //  endTime : room.endTime
        customers : bookedRoom
     })
   // })

 })
.post("/createroom",(req, res)=>{                   //Create new Hall
        req.body.rooms.forEach((room)=>{
            if( room.seatsAvailable && room.amneties && room.price && room.available)
            {
                roomsId++
                room.id = roomsId;
            listOfRooms.push(room)
            res.end("Added Successfully")
            }
            else
            {
                res.end("PLEASE ENTER THE VALUES IN PROPER FORMAT")
            }
    })
       
})
.post("/bookingRoom", (req,res) => {
    let isBoooked = false;
        req.body.roomBooking.forEach((booking) =>
         {
                if(booking.customerName && booking.date && booking.startTime && booking.endTime && booking.id )
                 {
                     listOfRooms.forEach((room) =>
                      {
                          if(room.id == booking.id && room.available == true)
                           {
                               room.available = false;
                                booking.status = "booked";
                               bookedRoom.push(booking);
                               console.log("Room is booked")
                               isBoooked = true
                              
                           }
                           else
                           {
                              console.log("Room either doesnt exit or is Already Booked")
                             
                           }
                      })
                   
                 }
                 else
                  {
                      res.json({
                          message : "Please provide the information in valid format"
                      })
                  }

         })
         if(isBoooked) 
         {
             res.json({
                 message: "Room is booked"
             })
        }
        else
        { 
            res.json({
                message : "Either the room doesnt exist or the room was already booked"
            })
         }
    }).listen(port,console.log("Web server Started"))


  