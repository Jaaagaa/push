import { Course } from "./schema.js";

export const buyone = (req, res, io) => {
    //update database and emit update-buyers event to all clients
    Course.findByIdAndUpdate({ _id: id }, { $inc: { buyers: 1 } }, { new: true }).then((course) => {
        io.emit("data", course);
        //if you want to return something in response write code here
      }).catch((err) => console.log(err))
}