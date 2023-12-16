const getAll = (Model) => async (req, res) => {
  try {
    const data = await Model.find();

    res.status(200).json({
      status: "success",
      length: data.length,
      data: {
        [Model.collection.collectionName]: data,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const handleFactory = { getAll };

module.exports = handleFactory;
