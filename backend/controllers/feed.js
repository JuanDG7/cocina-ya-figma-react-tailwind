exports.getPosts = (req, res, next) => {
  res.status(200).json({
    title: "First Post",
    calorias: "This is the first post!",
    tiempo: "images/carbonara-cremosa.webp",
    porciones: "5 porciones",
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  //Create a post in db
  res.status(201).json({
    message: "Post created successfully",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
