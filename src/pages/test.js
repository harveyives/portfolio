import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import Box from 'components/box';
import {graphql} from 'gatsby';
import Img from "gatsby-image";


const Index = ({data}) => (
  <Layout>
    <Box>
    </Box>
    {data.allInstaNode.edges.map(it => it.node).map(it => (
      <Img key={it.id} fluid={it.localFile.childImageSharp.fluid} alt={it.caption}/>))}
    <div style={{height: '50vh'}}/>
  </Layout>
);

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Index;

export const query = graphql`
query {
  allInstaNode(limit: 12, sort: {fields: timestamp, order: DESC}) {
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
            fluid(maxWidth: 150, quality:90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
}
`;
