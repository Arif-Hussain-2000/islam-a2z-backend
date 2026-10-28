const Hadith = require("../models/Hadith");

const getHadith = async (req, res) => {
  try {
    const { chapterId, bookId, hadithNumber } = req.query;

    let hadiths;

    if (chapterId) {
      hadiths = await Hadith.find({ chapterId: chapterId });
    } else if (bookId && hadithNumber) {
      hadiths = await Hadith.findOne({
        bookId: bookId,
        hadithNumber: Number(hadithNumber),
      }); // search hadith
    } else {
      hadiths = await Hadith.find();
    }

    res.json(hadiths);
  } catch (error) {
    res.status(500).json({
      message: "Hadiths not fetched",
      error: error.message,
    });
  }
};

const createHadith = async (req, res) => {
  try {
    const hadith = await Hadith.create(req.body);

    res.status(201).json(hadith);
  } catch (error) {
    res.status(500).json({
      message: "Hadith not created",
      error: error.message,
    });
  }
};

const updateHadith = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      bookId,
      chapterId,
      hadithNumber,
      arabic,
      urdu,
      english,
      narrator,
      explanation,
    } = req.body;

    const hadith = await Hadith.findByIdAndUpdate(
      id,
      {
        bookId,
        chapterId,
        hadithNumber,
        arabic,
        urdu,
        english,
        narrator,
        explanation,
      },
      { returnDocument: "after", runValidators: true },
    );

    if (!hadith) {
      return res.status(404).json({
        message: "Hadith not found",
      });
    }

    res.json({
      message: "Hadith updated successfully",
      hadith,
    });
  }  catch (error) {
    res.status(500).json({
      message: "Hadith not updated",
      error: error.message,
    });
  }
};

module.exports = {
  getHadith,
  createHadith,
  updateHadith
};
