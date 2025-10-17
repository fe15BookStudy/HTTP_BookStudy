import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
  },
  { timestamps: true }
);

postSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updateAt;
  return obj;
};

const Post = mongoose.model("Post", postSchema);

export default Post;
