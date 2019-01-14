import React from 'react';
import MyButton from '../utils/buttons';


const HomePromotions = () => {
  const promotion =
  //TODO: images will be served from server
  {
    img: "/images/gerber_1.jpg",
    lineOne: "40% OFF",
    lineTwo: "In Gerber knives",
    linkTitle: 'View Offers',
    linkTo: '/shop'
  }

  const renderPromotion = () => (
    promotion ?
      <div className="home_promotion_img"
        style={{
          background: `url(${promotion.img})`
        }}
      >
        <div className="tag title">{promotion.lineOne}</div>
        <div className="tag low_title">{promotion.lineTwo}</div>
        <div>
          <MyButton
            type="default"
            text={promotion.linkTitle}
            linkTo={promotion.linkTo}
            addStyles={{
              margin: '10px 0 0 0'
            }}
          />
        </div>
      </div>
      : null
  )

  return (
    <div className="home_promotion">
      {renderPromotion()}
    </div>
  );
};

export default HomePromotions;