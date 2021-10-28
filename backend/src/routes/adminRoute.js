const { Router } = require('express');
const adminRouter = Router();
const cron = require('node-cron');

adminRouter.post('/taskone', (req, res) => {
  try {
    taskOne.stop();
    const { interval } = req.body;
    taskOne = startCron('taskOne', interval);
    return res.send('success');
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

adminRouter.post('/tasktwo', (req, res) => {
  try {
    taskTwo.stop();
    const { interval } = req.body;
    taskTwo = startCron('taskTwo', interval);
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

let taskOne = startCron('taskOne', '*/10 * * * * *');
let taskTwo = startCron('taskTwo', '*/15 * * * * *');
