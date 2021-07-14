import React, { useEffect, useState } from "react";
import FsLightbox from "fslightbox-react";

export default function ProductImages({ prodDetail }) {
  //component state
  const [toggler, setToggler] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);

  //useEffect, build images array from props
  useEffect(() => {
    //if there are images of a product
    if (prodDetail.images.length > 0) {
      let lightboxImagesArr = [];
      for (let img of prodDetail.images) {
        lightboxImagesArr.push(img.url);
      }
      setLightboxImages(lightboxImagesArr);
    }
  }, []);
  //gets url of images for div bacckground. Or Not_Found_Pic if no images exist
  const renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_available.png";
    }
  };

  // displays lightbox when clicked on img
  const handleLightboxClick = (imageIndex) => {
    if (lightboxImages.length > 0) {
      setImageIndex(imageIndex);
      setToggler(!toggler);
    }
  };
  //renders prod images under main pic, starting from 2nd img(if there are)
  const renderThumbs = (prodDetail) =>
    lightboxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => handleLightboxClick(i)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat` }}
        ></div>
      ) : null
    );

  //RENDER
  return (
    <div className="product_image_container">
      <div className="main_pic">
        <div
          style={{
            background: `url(${renderCardImage(prodDetail.images)}) no-repeat`,
          }}
          onClick={() => handleLightboxClick(0)}
        ></div>
        <div className="main_thumbs">{renderThumbs(prodDetail)}</div>
      </div>
      <FsLightbox
        toggler={toggler}
        sources={lightboxImages}
        sourceIndex={imageIndex}
      />
    </div>
  );
}
