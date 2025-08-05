import React, { FC, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { request } from "graphql-request";
import { getPostsQuery } from "./grapqlQuery";
import FullScreenLoader from "../FullScreenLoader";
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { BLOG_URL } from "@env";

import { zoneDateToDate } from "../../utils/common";

type Post = {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
};

const Blogs: FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [currentCatName, setCurrentCatName] = useState("");

  const getAllBlogs = async (catName: string) => {
    setIsLoadingPosts(true);
    let query = "";
    query = getPostsQuery(catName);
    const data = (await request(
      `${BLOG_URL}/my-academy-news-blogs/graphql`,
      query
    )) as {
      posts: {
        nodes: {
          id: string;
          title: string;
          date: string;
          slug: string;
          excerpt: string;
        }[];
      };
    };

    setAllPosts(data.posts.nodes);
    setIsLoadingPosts(false);
  };

  useFocusEffect(
    useCallback(() => {
      getAllBlogs(currentCatName);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCatName])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={allPosts}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={({ item }) => {
          return (
            <View key={item.id}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={styles.message_box}>
                  <Pressable
                    onPress={() => {
                      Linking.openURL(`${BLOG_URL}/${item.slug}`);
                    }}
                  >
                    <Text style={styles.message_text}>{item.title}</Text>
                  </Pressable>
                  <Text style={styles.message_time}>
                    {zoneDateToDate(item.date)}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
      <FullScreenLoader visible={isLoadingPosts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  message_box: {
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    width: "100%",
    borderColor: "#E0E0E0",
  },
  message_text: {
    fontSize: 16,
    color: "#333",
  },
  message_time: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  listHeader: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#d4bff9",
  },
  listHeaderText: {
    fontSize: 18,
  },
});

export default Blogs;
