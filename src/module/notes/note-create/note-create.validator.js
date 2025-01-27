import { z } from "zod";
import sanitizeHtml from 'sanitize-html';



const noteSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  content: z.string().nonempty({ message: "Content is required" }).transform((val) => sanitizeHtml(val)),
}).strict();

export function noteCreateValidator(req, res, next) {
  const result = noteSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors.map(err => { 
      return { field: err.path.join('.'), message: err.message };
     }) });
  }
  req.body = result.data;
  
  next();
}
