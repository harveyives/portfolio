import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import {Box} from '@chakra-ui/core';
import {graphql} from 'gatsby';
import {MusicHistory} from '../features/musicHistory/musicHistory';

const Index = ({data}) => (
  <Layout>
    <Box>
      {/*<Title as="h2" size="large">*/}
      {/*  {data.homeJson.content.childMarkdownRemark.rawMarkdownBody}*/}
      {/*</Title>*/}
      <div
        dangerouslySetInnerHTML={{
          __html: data.homeJson.content.childMarkdownRemark.html,
        }}
      />
      <MusicHistory/>
    </Box>
    <div style={{height: '50vh'}}/>
  </Layout>
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
          rawMarkdownBody
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
  }
`;
