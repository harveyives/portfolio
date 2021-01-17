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

const Index = ({data}) => (
  <Box>
    <Header/>
    <Img fluid={data.trolltunga.childImageSharp.fluid}/>
    <Container>
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
    </Container>
    {data.githubData.data.user.pinnedItems.edges.map((e, i) => <ProjectCard key={i} data={e.node}/>)}
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
