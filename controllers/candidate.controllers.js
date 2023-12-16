const Candidate = require("../models/candidate.model");
const handleFactory = require("../utils/handleFactory");

const getAllCandidates = handleFactory.getAll(Candidate);

async function createCandidateInfo(req, res) {
  const { candidateName, interviewStatus, feedback, rating } = req.body;
  console.log(req.body)

  try {
    const data = await Candidate.create({
      candidateName: candidateName,
      interviewStatus: interviewStatus || "Pending",
      feedback: feedback || "",
      rating: rating || 0,
    });

    res.status(201).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

async function updateCandidateInfo(req, res) {
  const { id } = req.params;
  const { candidateName, interviewStatus, feedback, rating } = req.body;

  try {
    const data = await Candidate.updateOne(
      { _id: id },
      {
        $set: {
          candidateName,
          interviewStatus,
          feedback,
          rating,
        },
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

async function getCandidateInfoById(req, res) {
  const { id } = req.params;

  try {
    const data = await Candidate.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

async function deleteCandidateById(req, res) {
  const { id } = req.params;

  try {
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({
        status: "fail",
        message: "Candidate not found.",
      });
    }

    await Candidate.deleteOne({ _id: id });

    res.status(200).json({
      status: "success",
      message: "Candidate deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

module.exports = {
  createCandidateInfo,
  getCandidateInfoById,
  getAllCandidates,
  updateCandidateInfo,
  deleteCandidateById,
};
