const Data = require("../models/data");
const moment = require("moment");

exports.getData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addData = async (req, res) => {
  try {
    const newData = new Data({
      watt: req.body.watt,
      time: req.body.time
    });
    const data = await newData.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delData = async (req, res) => {
  try {
    const id = req.body.id;
    const data = await Data.findByIdAndRemove(id);
    console.log("Deleted Sucessfully");
    res.json(data);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.CalcKWH = async (req, res) => {
  try {
    const time1 = req.body.time1;
    const time2 = req.body.time2;
    const t1 = await Data.findOne({
      time: time1
    }).exec();
    const t2 = await Data.findOne({
      time: time2
    }).exec();

    const start = moment(time1, "HH:mm");
    const end = moment(time2, "HH:mm");
    var hours = end.diff(start, "hours", true);
    var duration = moment.duration(end.diff(start));
    var hours = duration.asHours();

    const kWh = (t2.watt - t1.watt) * hours;

    const calculatedKWh = {
      kWh: kWh
    };

    res.send(calculatedKWh);
  } catch (err) {
    res.json({ message: err.message });
  }
};
