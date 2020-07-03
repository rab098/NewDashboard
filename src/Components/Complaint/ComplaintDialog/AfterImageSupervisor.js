import React, { useState } from "react";
import ImageUploader from "react-images-upload";

const AfterImageSupervisor = (props) => {
  const [pictures, setPictures] = useState("");

  const onDrop = (picture) => {
    console.log("picture", picture);
    setPictures(picture);
    console.log("hi pictures", pictures);
  };
  return (
    <ImageUploader
      {...props}
      withIcon={true}
      onChange={onDrop}
      imgExtension={[".jpg", ".jpeg", ".png"]}
      buttonText="Choose image"
      singleImage={true}
      maxFileSize={5242880}
      withPreview={true}
    />
  );
};

export default AfterImageSupervisor;
