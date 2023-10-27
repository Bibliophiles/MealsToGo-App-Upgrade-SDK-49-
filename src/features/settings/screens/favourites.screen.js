import React, { useContext } from "react";
import styled from "styled-components/native";

import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { RestaurantList } from "../../components/restaurant-list.styles";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { TouchableOpacity } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";

import { RestaurantInfoCard } from "../../components/restaurant-info-card.component";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;
export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavoritesContext);

  return favourites.length ? (
    <RestaurantList
      data={favourites}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RestaurantDetail", { restaurant: item })
          }
        >
          <Spacer position="bottom" size="large">
            <RestaurantInfoCard restaurant={item} />
          </Spacer>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.name}
    />
  ) : (
    <NoFavouritesArea>
      <Text variant="label">No favourites yet</Text>
    </NoFavouritesArea>
  );
};
