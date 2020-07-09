import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import Img from "gatsby-image";
import {Box, Grid, useBreakpoint} from "@chakra-ui/core";
import {InView} from "react-intersection-observer";
import {Flex} from "@chakra-ui/layout";

// TODO this solution isn't great, but until I can find a better way to organise the grid it will have to do.

const imageGrid = {
  // variable : [sm, md, lg, xl]
  columns: {
    base: "repeat(3, 1fr)",
    sm: "repeat(4, 1fr)",
    md: "repeat(4, 1fr)",
    lg: "repeat(6, 1fr)",
    xl: "repeat(6, 1fr)"
  },
  items: {base: 3, sm: 4, md: 4, lg: 12, xl: 12},
}

const Test = function ({data}) {
  const deviceSize = useBreakpoint();
  console.log(deviceSize);

  // <Box w="12" h="12" bg="blue.500" borderRadius="50%" />

  return (
    <div>

      <Box height={1000} bg="green.100">Plain children are always rendered. Use onChange to monitor state.</Box>
      <Box>
        <Grid templateColumns={imageGrid.columns[deviceSize]} gap={0} onMouseEnter={() => console.log('yeehaw')}
              h={"100%"} position={'relative'}>
          {data.allInstaNode.edges.map(it => it.node).slice(0, imageGrid.items[deviceSize]).map(it => (
            <Img key={it.id} fluid={{...it.localFile.childImageSharp.fluid, aspectRatio: 1}} alt={it.caption}/>))}
          <Flex h={"100%"} w={'100%'} pos={'absolute'} align="center" justify="center">
            <Box justify={'center'} w="10" h="10" bg="red.500" zIndex="1"/>
          </Flex>
        </Grid>
      </Box>

      <InView as="div" threshold={1} rootMargin="10px" onChange={(inView, entry) => console.log('Inview:', inView)}>
        <Box height={200} bg="green.100">Plain children are always rendered. Use onChange to monitor state.</Box>
      </InView>
    </div>

  )
};

Test.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Test;
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
            fluid(quality:90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
}
`;
