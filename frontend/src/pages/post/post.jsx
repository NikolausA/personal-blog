import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectPost, selectUserId } from "../../selectors";
import { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ACTION_TYPE, setPostData } from "../../actions";
import { request } from "../../utils/request";
import { mapPostInfo } from "../../utils/map-post-info";
import { API_URL } from "../../constants";

export const Post = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [uploadedMedia, setUploadedMedia] = useState(null);
  const navigate = useNavigate();

  const { id, title, content, author, image, created, userId } =
    useSelector(selectPost);
  const currentUserserId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) {
      setEditForm({ title, content, image });
    }
  }, [isEditing, title, content, image]);

  useEffect(() => {
    return () => {
      dispatch({ type: ACTION_TYPE.DELETE_POST });
    };
  }, [dispatch]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({ title, content, image });
    setUploadedMedia(null);
  };

  const handleSaveEdit = () => {
    const formData = new FormData();
    formData.append("title", editForm.title);
    formData.append("content", editForm.content);
    if (uploadedMedia) {
      formData.append("media", uploadedMedia);
    }

    request(`${API_URL}/blog/${id}`, "PUT", formData)
      .then((response) => {
        const { post, error } = response;
        if (error) {
          console.error("Error updating post:", error);
          return;
        }
        const mappedPost = mapPostInfo(post);
        dispatch(setPostData(mappedPost));
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Unexpected error:", error);
      });
  };

  const handleDelete = async () => {
    try {
      const response = await request(`${API_URL}/blog/${id}`, "DELETE");
      if (response.message === "Post deleted successfully") {
        dispatch({ type: ACTION_TYPE.DELETE_POST });
        navigate("/");
      } else {
        throw new Error(response.message || "Error deleting post");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (field) => (event) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedMedia(file);
      const imageUrl = URL.createObjectURL(file);
      setEditForm((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  if (!id || !title) {
    return <Typography variant="h5">Пост не найден</Typography>;
  }

  return (
    <Box
      sx={{
        width: "80%",
        margin: "20px auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {isEditing ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Typography variant="h4" textAlign="center">
            Редактировать пост
          </Typography>

          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}

          <TextField
            name="title"
            label="Заголовок"
            value={editForm.title}
            onChange={handleChange("title")}
            fullWidth
          />
          <TextField
            name="content"
            label="Содержание"
            value={editForm.content}
            onChange={handleChange("content")}
            multiline
            rows={5}
            fullWidth
          />
          <Button variant="outlined" component="label">
            Загрузить изображение
            <input type="file" hidden onChange={handleMediaChange} />
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              gap: "5px",
            }}
          >
            <Button variant="contained" color="error" onClick={handleDelete}>
              Удалить пост
            </Button>
            <Button variant="outlined" onClick={handleCancelEdit}>
              Отмена
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveEdit}
            >
              Сохранить
            </Button>
            {/* <Box></Box> */}
          </Box>
        </Box>
      ) : (
        // Отображение поста
        <>
          <Typography variant="h3" component="h1" textAlign="center">
            {title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" color="textSecondary">
              Автор: {author}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Дата: {new Date(created).toLocaleDateString()}
            </Typography>

            {userId === currentUserserId && (
              <IconButton onClick={handleEdit} aria-label="edit post">
                <EditIcon />
              </IconButton>
            )}
          </Box>

          {image && (
            <Box
              component="img"
              src={image}
              alt={title}
              sx={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
            />
          )}

          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {content}
          </Typography>
        </>
      )}
    </Box>
  );
};
