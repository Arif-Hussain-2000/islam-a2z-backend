const Chapter = require("../models/chapter");

const getChapters = async (req, res) => {
    try {
        const { bookId } = req.query;

        let chapters;

        if (bookId) {
            chapters = await Chapter.find({ bookId: bookId });
        } else {
            chapters = await Chapter.find();
        }

        res.json(chapters);

    } catch (error) {
        res.status(500).json({
            message: "Chapters not fetched",
            error: error.message
        });
    }
};


const getChapterById = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id);

        if (!chapter) {
            return res.status(404).json({
                message: "Chapter not found"
            });
        }

        res.json(chapter);

    } catch (error) {
        res.status(500).json({
            message: "Chapter not fetched",
            error: error.message
        });
    }
};


const createChapters = async (req, res) => {
    try {
        const chapter = await Chapter.create(req.body);

        res.status(201).json(chapter);

    } catch (error) {
        res.status(500).json({
            message: "Chapter not created",
            error: error.message
        });
    }
};

const updateChapters = async (req, res)=>{
    try{
const {id}=  req.params;
const {bookId, title, chapterNumber}=req.body;
const chapter = await Chapter.findByIdAndUpdate(
    id,{
        bookId,
        title,
        chapterNumber,
    },
    {returnDocument:"new",runValidators:true},
);
if(!chapter){
    return res.status(404).json({
        message: "Chapter not found",
    });
}res.json({
    message: "Chapters updated successfully",
    chapter,
});
    }catch(error){
        res.status(500).json({
            message:"Chapter not updated.",
            error:error.message,
        });
    }
};


module.exports = {
    getChapters,
    getChapterById,
    createChapters,
    updateChapters,
};