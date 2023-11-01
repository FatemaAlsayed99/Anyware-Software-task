const announcementModel = require('../models/announcement')

module.exports.getAnnouncements = async(req,res)=>{
    const announcement = await announcementModel.find()
    res.send(announcement)
}

module.exports.saveAnnouncement = async(req,res)=>{
  const data = req.body
  try{
   const newAnnouncement= await announcementModel.create(data)
        console.log('Add Successfully')
        return res.status(200).json(newAnnouncement)
    }catch (error) {
      console.error("Error saving new announcement", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports.updateAnnouncement = async (req, res) => {
    const announcementId = req.params.announcementId;
    const data = req.body
  
    try {
      const updatedData = await announcementModel.findByIdAndUpdate({_id: announcementId}, data);
      res.status(200).json(updatedData);
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.deleteAnnouncement = async (req, res) => {
    const announcementId = req.params.announcementId;
  
    try {
      await announcementModel.findByIdAndDelete({_id: announcementId});
      res.status(200).json('Deleted Successfully');
    } catch (err) {
      console.log(err);
    }
  };