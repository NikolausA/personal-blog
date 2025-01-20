import { useState, useEffect } from "react";
import { request } from "../../utils/request";
import { checkImageExists } from "../../utils/check-image-exist";
import { mapPostInfo } from "../../utils/map-post-info";
import { API_URL, DEFAULT_IMAGE } from "../../constants";
import { PostCard } from "./components";
import { Grid, Typography } from "@mui/material";

export const Main = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Получение данных и проверка существования изображений
    request(`${API_URL}/blog`).then(async (res) => {
      const mappedPosts = mapPostInfo(res);
      const validatedPosts = await Promise.all(
        mappedPosts.map(async (post) => {
          const imageExists = await checkImageExists(post.image);
          if (!imageExists) {
            console.warn(`Изображение отсутствует: ${post.image}`);
            return { ...post, image: DEFAULT_IMAGE }; // Путь к заглушке
          }
          return post;
        })
      );
      setPosts(validatedPosts);
    });
  }, []);

  return (
    <div
      style={{
        maxWidth: "100%",
        overflowX: "hidden",
        padding: "0 16px",
        boxSizing: "border-box",
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          mt: 4,
          justifyContent: "center", // Центровка содержимого, если есть лишнее пространство
        }}
      >
        {posts.length ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              created={post.created}
              image={post.image}
              userId={post.userId}
            />
          ))
        ) : (
          <Typography variant="h6" component="div" gutterBottom>
            There is no any posts
          </Typography>
        )}
      </Grid>
    </div>
  );
};
