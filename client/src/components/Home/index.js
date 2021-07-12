import React, { useEffect } from "react";
import HomeSlider from "./HomeSlider";
import HomePromotions from "./HomePromotions";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsByArrival,
  getProductsBySell,
} from "../../store/actions/productsActions";
import CardBlock from "../utils/CardBlock";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProductsByArrival());
    dispatch(getProductsBySell());
  }, [dispatch]);

  return (
    <div>
      <HomeSlider />
      <CardBlock list={products.bySell} title={"Best Selling Knives"} />
      <HomePromotions />
      <CardBlock list={products.byArrival} title={"New Arrivals"} />
    </div>
  );
}
