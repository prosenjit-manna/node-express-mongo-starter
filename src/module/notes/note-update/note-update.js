import NoteModel from "../note.mongo.js";

export async function noteUpdate(req, res) {
  try {
    const note = await NoteModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
    });

    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    return res.send({ id: note._id });
} catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
