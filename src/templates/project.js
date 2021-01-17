import React from 'react';
import { graphql } from 'gatsby';

export default function Project({data}) {
  const project = data.githubPinnedRepository.data;
  console.log(project);
  return (
    <div>
      {project.name}
      {/*<h1>{post.frontmatter.title}</h1>*/}
      {/*<div dangerouslySetInnerHTML={{ __html: post.html }} />*/}
    </div>
  );
}
export const query = graphql`
  query($slug: String!) {
    githubPinnedRepository(slug: { eq: $slug }) {
      data {
        name
        description
        object {
          text
        }
        openGraphImageUrl
        primaryLanguage {
          name
        }
        url
      }
    }
  }
`;

// export const query = graphql`
//   query($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       html
//       frontmatter {
//         title
//       }
//     }
//   }
// `
