const mongoose = require('mongoose');
const { Router } = require('express');
const securityGroupRouter = Router();
const { SecurityGroup } = require('../models/SecurityGroup');

securityGroupRouter.get('/sgs', async (req, res) => {
  try {
    const securityGroups = await SecurityGroup.find({});
    return res.send(securityGroups);
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

securityGroupRouter.put('/sgs/:sgId/input-values', async (req, res) => {
  try {
    const { sgId } = req.params;
    if (!mongoose.isValidObjectId(sgId)) return res.status(400).send({ err: 'invalid sgId' });

    const { comment, checkDate } = req.body;
    console.log(comment, checkDate);

    const securityGroup = await SecurityGroup.findByIdAndUpdate(
      sgId,
      { 'InputValue.Comment': comment, 'InputValue.CheckDate': checkDate },
      { new: true }
    );
    return res.send({ securityGroup });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

module.exports = { securityGroupRouter };
