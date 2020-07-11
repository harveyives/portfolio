import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import Img from "gatsby-image";
import {Box, Grid, useBreakpoint} from "@chakra-ui/core";
import {InView} from "react-intersection-observer";
import {AspectRatio, Flex} from "@chakra-ui/layout";

const imageGrid = {
  columns: {base: 3, sm: 4, md: 5, lg: 6, xl: 6},
  items: {base: 3, sm: 4, md: 5, lg: 12, xl: 12},
}

//LOOK AT HOW MANY SIZING HACKS I HAD TO DO TO GET THIS THING CENTERED. LOOK AT IT. REMOVE ONE AND THE WHOLE THING FALLS OVER
//THIS IS INSANE
const IconI = (props) => (<Flex height={'100%'} w={'100%'} pos={'absolute'} justify={'center'}>
  <Box width={100 / props.columns + '%'} height={'100%'} bg={'red.500'} align={'center'}>
    <Flex align={'center'} justify='center' h={'100%'} w={'100%'}>
      <AspectRatio ratio={'1'} w={'65%'} alignItems={'center'}>
        <Box bg={'green.500'} borderRadius={'50%'}>
          yo
        </Box>
      </AspectRatio>
    </Flex>
  </Box>
</Flex>);

const Test = function ({data}) {
  const deviceSize = useBreakpoint();

  return (
    <div>

      <Box height={1000} bg="green.100">Plain children are always rendered. Use onChange to monitor state.</Box>
      <Box>
        <Grid templateColumns={`repeat(${imageGrid.columns[deviceSize]}, 1fr)`} gap={0}
              onMouseEnter={() => console.log('yeehaw')}
              pos={'relative'}>
          {data.allInstaNode.edges.map(it => it.node).slice(0, imageGrid.items[deviceSize]).map(it => (
            <Img key={it.id} fluid={{...it.localFile.childImageSharp.fluid, aspectRatio: 1}} alt={it.caption}/>))}
          <IconI columns={imageGrid.columns[deviceSize]}/>
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
