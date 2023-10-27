import React from "react";

import { CompactRestaurantInfo } from "../../../components/restaurant/compact-restaurant-info.component";

export const MapViewCallout = ({ restaurant }) => (
  <CompactRestaurantInfo isMap restaurant={restaurant} />
);
