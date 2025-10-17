import Post from "./Post.Schema.js";

const postService = {};

// 게시글 조회
postService.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ status: "succeess", posts: posts });
  } catch (e) {
    res.status(500).json({ status: "fail", error: e.message });
  }
};

// 특정 게시글 조회
postService.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    // if (!post) {
    //   return res.status(404).json({ status: "fail", error: "게시글을 찾을 수 없습니다." });
    // }

    if (!post) {
      // 302 Found 상태 코드로 /404.html 페이지로 리디렉션
      return res.redirect("/404.html");
    }

    res.status(200).json({ status: "success", post });
  } catch (e) {
    res.status(500).json({ status: "fail", error: e.message });
  }
};

// 게시글 생성
postService.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: "제목 입력은 필수입니다." });
    }

    const newPost = new Post({ title, content });
    const savedPost = await newPost.save();

    res.status(201).json({ status: "succeess", savedPost });
  } catch (e) {
    res.status(500).json({ status: "fail", error: e.message });
  }
};

// 게시글 수정
postService.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });

    res.status(200).json({ status: "succeess", updatedPost });
  } catch (e) {
    res.status(500).json({ status: "fail", error: e.message });
  }
};

// 게시글 삭제
postService.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    res.status(200).json({ status: "succeess", deletedPost, message: "게시글이 성공적으로 삭제되었습니다." });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default postService;
