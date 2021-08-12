const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(cors());
app.use(express.json());

//send email through this email
let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"sales@inqline.com",
        pass:"salesinqline786"
    }
})

//post request for handling data and send the email, receives the data in body
app.post('/sendemail', (req, res) => {
    //Send an email here but currently dummy email
    console.log(req.body)
    res.json({message: 'Message received!'})
    
    let mailOptions = {
        from:"sales@inqline.com",
        to:'rayyan@inqline.com',
        subject:`New Request for Invite Received from ${req.body.email} on AI.Inqline`,
        // text:req.body.text
        html:`<p>A new request for a demo is received from ${req.body.fname} ${req.body.lname}</p>
        <strong>Details of the sender</strong><br>
        <p>FirstName: ${req.body.fname}</p>
        <p>LastName: ${req.body.lname}</p>   
        <p>Email Address: ${req.body.email}</p>
        <p>Phone: ${req.body.phone}</p>
        <p>Company: ${req.body.company}</p>   
        <p>How did you hear about us?: ${req.body.aboutus}</p>   
        `,
        replyTo:req.body.email
    }
    transporter.sendMail(mailOptions, (error, info)=>{

        if(error){
            console.log(error)
        }
        else{
            console.log("Success"+info.response)
        }
    })

});


app.get('/', (req,res)=>{
    res.send("Server is up and running")
})

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})