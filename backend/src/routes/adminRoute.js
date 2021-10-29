const { Router } = require('express');
const adminRouter = Router();
const cron = require('node-cron');

adminRouter.post('/taskone', (req, res) => {
  try {
    taskOne.stop();
    const { interval } = req.body;
    let intervalToCron;
    if (interval == 5) intervalToCron = '*/5 * * * *';
    else if (interval == 15) intervalToCron = '*/15 * * * *';
    else if (interval == 30) intervalToCron = '*/30 * * * *';
    else if (interval == 60) intervalToCron = '* /1* * * *';

    taskOne = startCron('taskOne', intervalToCron);
    return res.send('success');
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

adminRouter.post('/tasktwo', (req, res) => {
  try {
    taskTwo.stop();
    const { interval } = req.body;
    let intervalToCron;
    if (interval == 5) intervalToCron = '*/5 * * * *';
    else if (interval == 15) intervalToCron = '*/15 * * * *';
    else if (interval == 30) intervalToCron = '*/30 * * * *';
    else if (interval == 60) intervalToCron = '* /1* * * *';

    taskTwo = startCron('taskTwo', intervalToCron);
    return res.send('success');
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

module.exports = { adminRouter };

const startCron = function (text, interval) {
  const task = cron.schedule(interval, () => console.log(`${text} | ${new Date()}`));
  return task;
};

let taskOne = startCron('taskOne', '*/1 * * * * *');
let taskTwo = startCron('taskTwo', '*/15 * * * * *');
