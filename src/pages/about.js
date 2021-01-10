import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {Box} from '@chakra-ui/react';
import Head from '../components/head'
import {Container} from "@chakra-ui/layout";

const About = ({data}) => (
  <Container>
    <Head pageTitle={data.aboutJson.title}/>
    <Box>
      <div
        dangerouslySetInnerHTML={{
          __html: data.aboutJson.content.childMarkdownRemark.html,
        }}
      />
    </Box>
  </Container>
);

About.propTypes = {
  data: PropTypes.object.isRequired,
};

export default About;

export const query = graphql`
  query AboutQuery {
    aboutJson {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
