import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { request } from "../../utils/request";
import { API_URL } from "../../constants";
import { addPostFormSchema } from "../../form-schemas";
import { Box, Button, TextField, Typography } from "@mui/material";

export const AddNewPost = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState(null);
  const [uploadedMedia, setUploadedMedia] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      text: "",
    },
    resolver: yupResolver(addPostFormSchema),
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const handleFormSubmit = ({ title, text, media }) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", text);
    if (media) {
      formData.append("mediaUrl", media);
    }

    // const formValues = watch();
    // const mediaFile = watch("media");

    // console.log("Form Data:", formData);
    // console.log("Form values:", formValues);
    // console.log("Media file:", mediaFile);

    request(`${API_URL}/blog/create`, "POST", formData)
      .then((response) => {
        const { message, newPost, redirect, redirectUrl, error } = response;
        if (message) {
          console.log(message);
          console.log(newPost);
        }

        if (redirect) {
          navigate(redirectUrl);
        }
        if (error) {
          setServerErrorMessage(error);
        }
      })
      .catch((error) => {
        console.error("Unexpected error:", error);
      });
    reset();
    setUploadedMedia(null);
  };

  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedMedia(file);
      setValue("media", file, { shouldValidate: true });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      sx={{
        mt: 3,
        width: 300,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Создать пост
      </Typography>

      <TextField
        fullWidth
        label="Заголовок"
        name="title"
        {...register("title")}
      />
      {errors.title && (
        <Typography variant="caption" color="error">
          {errors.title?.message}
        </Typography>
      )}

      <TextField
        fullWidth
        label="Текст"
        name="text"
        multiline
        rows={4}
        {...register("text")}
      />
      {errors.text && (
        <Typography variant="caption" color="error">
          {errors.text?.message}
        </Typography>
      )}

      <Box display="flex" alignItems="center" gap={2}>
        <Button variant="contained" component="label">
          Загрузить медиафайл
          <input
            type="file"
            hidden
            accept="image/*,video/*"
            onChange={handleMediaChange}
          />
        </Button>
      </Box>

      {uploadedMedia && (
        <Typography variant="caption" color="primary">
          Загружен: {uploadedMedia.name}
        </Typography>
      )}

      {errors.media && (
        <Typography variant="caption" color="error">
          {errors.media?.message}
        </Typography>
      )}
      {serverErrorMessage && (
        <Typography variant="caption" color="error">
          {serverErrorMessage}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3, py: 1, px: 2 }}
        disabled={!isValid}
      >
        Отправить
      </Button>
    </Box>
  );
};
