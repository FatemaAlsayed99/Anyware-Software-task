const {Router} = require("express");
const { getAnnouncements, saveAnnouncement, updateAnnouncement, deleteAnnouncement } = require("../controllers/announcement");

const router = Router()

router.get('/', getAnnouncements)
router.post('/save', saveAnnouncement)
router.patch('/update/:announcementId', updateAnnouncement)
router.delete('/delete/:announcementId', deleteAnnouncement)


module.exports = router;