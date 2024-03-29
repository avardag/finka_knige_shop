import React from "react";
import { format } from "date-fns";

const UserHistoryBlock = (props) => {
  //renders tbody
  const renderBlocks = () =>
    props.products
      ? props.products.map((product, i) => (
          <tr key={i}>
            <td>{format(product.dateOfPurchase).format("MM-DD-YYYY")}</td>
            <td>
              {product.brand.name} {product.name}
            </td>
            <td>$ {product.price}</td>
            <td>{product.quantity}</td>
          </tr>
        ))
      : null;

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default UserHistoryBlock;
