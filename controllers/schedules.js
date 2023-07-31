import { Profile } from "../models/profile.js"
// Update import statements for the models
import { Schedule } from "../models/schedule.js";

async function create(req, res) {
  try {
    req.body.owner = req.user.profile;
    const schedule = await Schedule.create(req.body);
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { schedules: schedule } },
      { new: true }
    );
    schedule.owner = profile;
    res.status(201).json(schedule);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export {
  create,
}