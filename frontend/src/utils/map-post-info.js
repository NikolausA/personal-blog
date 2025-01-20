export const mapPostInfo = (postData) => {
  if (Array.isArray(postData)) {
    return postData.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      image: `http://localhost:3000${item.mediaUrl}`,
      created: item.createdAt,
      userId: item.userId,
      author: item.User.username || "неизвестен",
    }));
  }
  return {
    id: postData.id,
    title: postData.title,
    content: postData.content,
    image: `http://localhost:3000${postData.mediaUrl}`,
    created: postData.createdAt,
    userId: postData.userId,
    author: postData.User.username || "неизвестен",
  };
};
