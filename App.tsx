import React, { useRef, useMemo } from 'react';
import {
  StatusBar,
  Image,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { faker } from '@faker-js/faker';

import { AVATAR_SIZE, BG_IMG, ITEM_SIZE, SPACING } from './constants';
import { generateFakeData } from './helpers';

faker.seed(10);

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const DATA = useMemo(() => generateFakeData(), []);

  const renderListItem = ({
    item,
    index,
  }: {
    item: IUserData;
    index: number;
  }) => {
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
      outputRange: [1, 1, 1, 0],
    });

    const opacity = scrollY.interpolate({
      inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 0.5)],
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View
        style={[styles.itemContainer, { opacity, transform: [{ scale }] }]}
      >
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.jobTitle}>{item.jobTitle}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: BG_IMG }} style={styles.bgImage} blurRadius={80} />
      <Animated.FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderListItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    padding: SPACING,
    paddingTop: StatusBar.currentHeight || 50,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING / 2,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  jobTitle: {
    fontSize: 18,
    opacity: 0.7,
  },
  email: {
    fontSize: 14,
    opacity: 0.8,
    color: '#0099cc',
  },
});
