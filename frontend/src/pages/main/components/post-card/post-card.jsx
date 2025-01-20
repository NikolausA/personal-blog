import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../../../../actions";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { selectPost } from "../../../../selectors";

export const PostCard = ({
  id,
  title,
  content,
  author,
  created,
  image,
  userId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postInStore = useSelector(selectPost);

  const handleCardClick = () => {
    if (postInStore !== id) {
      dispatch(
        setPostData({ id, title, content, author, created, image, userId })
      );
    }

    navigate(`/post/${id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%" }}>
        <CardActionArea onClick={handleCardClick}>
          {image && (
            <CardMedia component="img" height="140" image={image} alt={title} />
          )}
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {content}
            </Typography>
            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              Автор: {author} | Дата:{" "}
              {new Date(created).toLocaleDateString("ru-RU")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
