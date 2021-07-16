import React from "react";
import MyButton from "../utils/buttons";
//fontawsome icons import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @props prodDetail -> object
 * @props addToCart -> func. addToCart(product.id){  }
 */
const ProductInfo = ({ prodDetail, addToCart }) => {
  const showProductTags = (details) => (
    <div className="product_tags">
      {details.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>Free shipping</div>
            <div>And Return</div>
          </div>
        </div>
      ) : null}
      <div className="tag">
        <div>
          <FontAwesomeIcon icon={details.available ? faCheck : faTimes} />
        </div>
        <div className="tag_text">
          <div>{details.available ? "Available" : "Not Available"}</div>
          <div>{details.available ? "in store" : "Preorder only"}</div>
        </div>
      </div>
    </div>
  );

  const showProductActions = (details) => (
    <div className="product_actions">
      <div className="price">$ {details.price}</div>
      <div className="cart">
        <MyButton
          type="add_to_cart_link"
          runAction={() => {
            addToCart(details._id);
          }}
        />
      </div>
    </div>
  );
  const showProductSpecifications = (details) => (
    <div className="product_specifications">
      <h2>Knife Specifications</h2>
      <div>
        <div className="item">
          <strong>Style:</strong> {details.style.name}
        </div>
        <div className="item">
          <strong>Length of Blade:</strong> {details.bladeLength} cm
        </div>
        <div className="item">
          <strong>Weight:</strong> {details.weight} gr.
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <h1 className="product__detail--title">
        {prodDetail.brand.name} {prodDetail.name}
      </h1>

      <p>{prodDetail.description}</p>

      {showProductTags(prodDetail)}
      {showProductActions(prodDetail)}
      {showProductSpecifications(prodDetail)}
    </div>
  );
};

export default ProductInfo;
