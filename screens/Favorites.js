import React from 'react'
import { FlatList, Image, Text, View } from 'react-native-web'
import useAuth from '../hooks/useAuth';

function Favorites() {

  const { user } = useAuth();
  console.log({ user });
  return (
    < View>
      <Text>Favorites</Text>
      <FlatList
        data={user.favs || [
        ]}
        renderItem={({ item }) => {
          return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: item.photoURL }} />
            <View>
              <Text>{item.address}</Text>
              <Text> rooms:{item.rooms}</Text>
            </View>
          </View>
        }}
      >
      </FlatList>
    </ View>
  )
}

export default Favorites