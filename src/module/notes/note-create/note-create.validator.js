import { z } from "zod";
import sanitizeHtml from 'sanitize-html';



const noteSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  content: z.string().nonempty({ message: "Content is required" }).transform((val) => sanitizeHtml(val)),
});

export function noteCreateValidator(req, res, next) {
  const result = noteSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map((err) => ({ message: err.message }));
    return res.status(400).send(errors);
  }

  req.body = result.data;

  next();
}
