import React from 'react';
import { graphql } from 'gatsby';
import { Markdown } from '../components/markdown/markdown';
import { Container } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';

export default function Project({data}) {
  const project = data.githubPinnedRepository;
  console.log(project);
  return (
    <Box>
      <Container>
        <Markdown data={ project.childMarkdownRemark.html }/>
      </Container>
    </Box>
  );
}

export const query = graphql`
  query($slug: String!) {
    githubPinnedRepository(slug: { eq: $slug }) {
      data {
        name
        description
        primaryLanguage {
          name
        }
        url
        title
      }
      childMarkdownRemark {
        html
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
