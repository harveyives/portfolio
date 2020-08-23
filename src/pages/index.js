import React from 'react';
import PropTypes from 'prop-types';
import {Box} from '@chakra-ui/core';
import {graphql} from 'gatsby';
import {MusicHistory} from '../features/musicHistory/musicHistory';
import InstagramGrid from "./instagramGrid";
import {Container, Text} from "@chakra-ui/layout";
import {Markdown} from "../components/markdown";


const Index = ({data}) => (
  <Box>
    <Container>
      <Markdown data={data.homeJson.content.childMarkdownRemark.html}/>
      <Text p={'2rem 0 2rem 0'}><i>Here&apos;s a component that pulls my Spotify listening history:</i></Text>
      <MusicHistory/>
      <Text p={'2rem 0 2rem 0'}><i>and here&apos;s a component that displays my recent posts from instagram with a blur
        in/out animation: </i></Text>
    </Container>
    <InstagramGrid data={data}/>
    <Box height={40}/>
  </Box>
);

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Index;

export const query = graphql`
  query HomepageQuery {
    homeJson {
      title
      content {
        childMarkdownRemark {
          html
          frontmatter {
            title
          }
        }
      }
      gallery {
        title
        copy
        image {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    allInstaNode(limit: 12, sort: { fields: timestamp, order: DESC }) {
      edges {
        node {
          id
          likes
          comments
          original
          timestamp
          caption
          localFile {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
