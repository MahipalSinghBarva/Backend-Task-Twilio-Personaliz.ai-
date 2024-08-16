import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

export const callIVR = (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();

    
    twiml.play('https://www.dropbox.com/scl/fi/c2er8jgagvjl0sausy45e/Fara-interview-audio.mp3?rlkey=tt2ugvw05hjp7j2mzs0cwndqs&st=sd3xpcsw&dl=0');

    const gather = twiml.gather({
        action: '/api/videolink', 
        numDigits: 1
    });

    gather.say('Press 1 if you are interested in the interview link.');

    res.type('text/xml');
    res.send(twiml.toString());
};

export const VideoInterview = (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();

    if (req.body.Digits === '1') {
        twiml.say('Thank you. We will send you the interview link via SMS.');
        
        
        client.messages.create({
            body: 'Here is your personalized interview link: https://v.personaliz.ai/?id=9b697c1a&uid=fe141702f66c760d85ab&mode=test',
            from: process.env.TWILIO_PHONE_NUMBER,
            to: '+918003100827'  
        }).then(message => console.log(`SMS sent with SID: ${message.sid}`))
          .catch(err => console.error('Error sending SMS:', err));
    } else {
        twiml.say('Invalid input. Goodbye.');
    }

    twiml.hangup();

    res.type('text/xml');
    res.send(twiml.toString());
};

export const callTwilioIVR = (req, res) => {
    client.calls.create({
        url: 'https://www.dropbox.com/scl/fi/c2er8jgagvjl0sausy45e/Fara-interview-audio.mp3?rlkey=tt2ugvw05hjp7j2mzs0cwndqs&st=sd3xpcsw&dl=0',  
        to: '+918003100827', 
        from: process.env.TWILIO_PHONE_NUMBER 
    })
    .then(call => {
        console.log(`Call initiated with SID: ${call.sid}`);
        res.status(200).json({ message: 'Call scheduled successfully', sid: call.sid });
    })
    .catch(err => {
        console.error('Error initiating call:', err);
        res.status(500).json({ message: 'Error initiating call', error: err });
    });
};
