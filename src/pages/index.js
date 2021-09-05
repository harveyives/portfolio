import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, IconButton, Link, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import { MusicHistory } from '../features/musicHistory/musicHistory';
import InstagramGrid from './instagramGrid';
import { Markdown } from '../components/markdown';
import Header from '../components/header';
import { ProjectCard } from '../components/projects/projectCard';
import { SimpleGrid } from '@chakra-ui/layout';
import { FaFacebookMessenger, FaGithub, FaLinkedin, FaSpotify } from 'react-icons/all';

const IconLink = props => (
  <Link href={props.url}>
    <IconButton variant={'link'} w={'100%'} h={'100%'} icon={props.icon}/>
  </Link>
);

const Index = ({data}) => (
  <Box>
    <Header/>
    {/*<Img fluid={data.trolltunga.childImageSharp.fluid}/>*/}
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
      <SimpleGrid columns={2} spacing={5}>
        {data.allGithubPinnedRepository.edges.map((e, i) =>
          <ProjectCard key={i} data={e.node}/>
        )}
      </SimpleGrid>
    </Container>
    <InstagramGrid data={data}/>
    <Container>
      <Box height={40}>
        <SimpleGrid columns={4} spacing={5} h={10} p={10}>
          <IconLink url={'https://open.spotify.com/user/harveyives'} icon={<FaSpotify color={'orange'} size={'50%'}/>}/>
          <IconLink url={'https://m.me/harveyives'} icon={<FaFacebookMessenger color={'orange'} size={'50%'}/>}/>
          <IconLink url={'https://linkedin.com/in/harveyives'} icon={<FaLinkedin color={'orange'} size={'48%'}/>}/>
          <IconLink url={'https://github.com/harveyives'} icon={<FaGithub color={'orange'} size={'50%'}/>}/>
        </SimpleGrid>
      </Box>
    </Container>
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
