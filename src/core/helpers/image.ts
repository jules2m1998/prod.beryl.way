export const getImagePathToServer = (img?: string) =>
  img
    ? `${(import.meta.env.VITE_APP_API_URL as string).replace(
        "api/",
        ""
      )}${img}`
    : "https://img.freepik.com/free-vector/white-blurred-background_1034-249.jpg";
