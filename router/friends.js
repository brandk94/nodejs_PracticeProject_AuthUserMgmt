const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
  res.send(JSON.stringify(friends));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  res.send(friends[req.params.email]);
});


// POST request: Add a new friend
router.post("/",(req,res)=>{
  // Check if email is provided in request body
  const email = req.body.email;
  if (email) {
    // If email is present, add new user to friends JSON dictionary
    friends[email] = {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "DOB": req.body.DOB
    };
    // Send response indicating user addition
    res.send(`The user ${req.body.firstName} has been added!`);
  }
  
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  // Check if email is registered in friends JSON dictionary
  const email = req.params.email;
  let friend = friends[email];
  if (friend) {
    // If user exists, update friend with new info
    let DOB = req.body.DOB;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    // If any new friend info is provided in body, update friend's info in dictionary
    if (DOB) {
      friend["DOB"] = DOB;
    }
    if (firstName) {
      friend["firstName"] = firstName;
    }
    if (lastName) {
      friend["lastName"] = lastName;
    }

    friends[email] = friend;
    
    // Send response that update was successful
    res.send(`Friend with email ${email} has been updated!`);
  } else {
    // Send error message saying friend doesn't exist
    res.status(404).json({message: `Friend with ${email} does not exist!`});
  }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  // Check if email exists in JSON friends dictionary
  const email = req.params.email;
  if (email) {
    // If email is provided, delete friend with email from friend dictionary
    delete friends[email];
    // Send response that delete was successful
    res.send(`Friend with email ${email} is deleted!`);
  }
});

module.exports=router;
