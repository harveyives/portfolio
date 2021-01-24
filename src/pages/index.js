import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import { MusicHistory } from '../features/musicHistory/musicHistory';
import InstagramGrid from './instagramGrid';
import { Markdown } from '../components/markdown';
import Header from '../components/header';
import Img from 'gatsby-image';
import { ProjectCard } from '../components/projects/projectCard';
import { SimpleGrid } from '@chakra-ui/layout';

const Index = ({data}) => (
  <Box>
    {console.log(data)}
    <Header/>
    <Img fluid={data.trolltunga.childImageSharp.fluid}/>
    <Container mb={5}>
      <Markdown data={data.homeJson.content.childMarkdownRemark.html}/>
      <Text p={'2rem 0 2rem 0'}>
        <i>Here&apos;s a component that pulls my Spotify listening history:</i>
      </Text>
      <MusicHistory/>
      <Text p={'2rem 0 2rem 0'}>
        <i>
          and here&apos;s a component that displays my recent posts from
          instagram with a blur in/out animation:
        </i>
      </Text>
      <SimpleGrid columns={3} spacing={10}>
        {data.allGithubPinnedRepository.edges.map((e, i) =>
          <ProjectCard key={i} data={e.node}/>
        )}
      </SimpleGrid>
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
      content {
        childMarkdownRemark {
          html
          frontmatter {
            title
          }
        }
      }
    }
    allGithubPinnedRepository {
      edges {
        node {
          children {
            ... on File {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
                internal {
                  type
                }
              }
            }
          }
          data {
            title
            primaryLanguage {
              name
            }
            description
            name
          }
        }
      }
    }
    trolltunga: file(relativePath: { eq: "home/trolltunga.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
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
