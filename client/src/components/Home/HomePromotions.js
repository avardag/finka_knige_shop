import React from "react";
import { useSelector } from "react-redux";
import MyButton from "../utils/buttons";

export default function HomePromotions() {
  const site = useSelector((state) => state.site);
  const promotion = site.featured_products ? site.featured_products[1] : null;

  //TODO: craete a route and state in store for Home promotions
  const renderPromotion = () =>
    site.featured_products ? (
      <div
        className="home_promotion_img"
        style={{
          background: `url(${promotion.image_url})`,
        }}
      >
        <div className="tag low_title">{promotion.promotion_text}</div>
        <div>
          <MyButton
            type="default"
            text={promotion.button_text}
            linkTo={promotion.link}
            addStyles={{
              margin: "10px 0 0 0",
            }}
          />
        </div>
      </div>
    ) : null;

  return <div className="home_promotion">{renderPromotion()}</div>;
}
