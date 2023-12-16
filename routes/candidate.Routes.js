const express = require("express");
const router = express.Router();

const {
    createCandidateInfo,
    getCandidateInfoById,
    getAllCandidates,
    updateCandidateInfo,
    deleteCandidateById
} = require("../controllers/candidate.controllers")

router
    .route("/")
    .get(getAllCandidates)
    .post(createCandidateInfo)
router.get("/:id" , getCandidateInfoById)
router.put("/:id" , updateCandidateInfo)
router.delete("/:id" , deleteCandidateById)

module.exports = router;