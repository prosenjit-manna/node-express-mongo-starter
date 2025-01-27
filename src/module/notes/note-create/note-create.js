import NoteModel from "../../../model/note.mongo.js";

export async function noteCreate(req, res) {
  try {
    const note = await NoteModel.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id,
    });

    return res.send({ id: note._id });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
