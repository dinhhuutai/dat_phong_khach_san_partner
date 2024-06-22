const uploadImage = img => {
  try {
    const uploadData = new FormData();
    uploadData.append('image', img?.target?.files[0], 'file');

    return uploadData;
  } catch (error) {}
};

export default uploadImage;
