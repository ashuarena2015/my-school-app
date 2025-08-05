import { gql } from "graphql-request";

export const getPostsQuery = (catName: string) => {
    if(catName) {
        return gql` 
          {
            posts(where: { categoryName: "${catName}" }) {
              nodes {
                id
                postId
                slug
                title
                date,
                excerpt
                categories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
            }
          }`;
    } else {
        return gql`
                {
                  posts {
                    nodes {
                      id
                      postId
                      slug
                      title
                      date
                      excerpt
                    }
                  }
                }
              `;
    }
}
