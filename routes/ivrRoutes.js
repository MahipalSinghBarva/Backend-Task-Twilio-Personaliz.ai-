import express from "express";

import {callIVR, VideoInterview, callTwilioIVR} from "../twillo/ivr.js"


const router = express.Router()

router.post("/callivr", callIVR)
router.post("/videolink", VideoInterview)
router.post('/schedule-call', callTwilioIVR);

export default router
