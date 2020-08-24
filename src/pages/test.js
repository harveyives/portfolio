import('intersection-observer');
import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import Img from 'gatsby-image';
import {Box, Grid, useBreakpoint} from '@chakra-ui/core';
import {InView} from 'react-intersection-observer';
import {AspectRatio, Flex} from '@chakra-ui/layout';
import {FaInstagram} from 'react-icons/all';
import {useDisclosure} from "@chakra-ui/hooks";
import styled from '@emotion/styled'


const BlurredImg = styled(Img)`
  filter: ${props => props.isOpen ? 'blur(4px)' : 0};
  transform: scale(1.04);
  transition: 0.6s filter linear;
  transition-delay: ${props => props.isOpen ? '0.8s' : '0s'};
`

const AppearingBox = styled(Box)`
  opacity: ${props => props.isOpen ? '100%' : '0%'};
  transition: 0.6s filter linear;
  transition-delay: ${props => props.isOpen ? '0.8s' : '0s'};
`

const imageGrid = {
  columns: {base: 3, sm: 4, md: 5, lg: 6, xl: 6},
  items: {base: 3, sm: 4, md: 5, lg: 12, xl: 12},
};

//LOOK AT HOW MANY SIZING HACKS I HAD TO DO TO GET THIS THING CENTERED. LOOK AT IT. REMOVE ONE AND THE WHOLE THING FALLS OVER
//THIS IS INSANE
const InstagramIcon = props => (
  <Flex h={'100%'} w={'100%'} pos={'absolute'} justify={'center'}>
    <Box w={100 / props.columns + '%'} h={'100%'} align={'center'}>
      <Flex align={'center'} justify="center" h={'100%'} w={'100%'}>
        <AspectRatio ratio={'1'} w={'65%'} alignItems={'center'}>
          <AppearingBox bg={'white'} borderRadius={'50%'} isOpen={props.isOpen}>
            <FaInstagram size={'60%'}/>
          </AppearingBox>
        </AspectRatio>
      </Flex>
    </Box>
  </Flex>
);

const Test = function ({data}) {
  const deviceSize = useBreakpoint();
  const {isOpen, onOpen, onClose, onToggle} = useDisclosure()
  console.log(isOpen);
  return (
    <div>
      <Box height={1000} bg="green.100"/>
      <InView
        as="div"
        threshold={1}
        onChange={onToggle}
      >
        <Grid pos={'relative'} style={{overflow: 'hidden'}}>
          <Grid
            templateColumns={`repeat(${imageGrid.columns[deviceSize]}, 1fr)`}
            gap={0}
          >
            {data.allInstaNode.edges
              .map(it => it.node)
              .slice(0, imageGrid.items[deviceSize])
              .map(it => (
                <BlurredImg
                  key={it.id}
                  fluid={{
                    ...it.localFile.childImageSharp.fluid,
                    aspectRatio: 1,
                  }}
                  alt={it.caption}
                  isOpen={isOpen}
                />
              ))}
          </Grid>

          <InstagramIcon columns={imageGrid.columns[deviceSize]} isOpen={isOpen}/>
        </Grid>
      </InView>

      <Box height={200} bg="green.100"/>
    </div>
  );
};

Test.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Test;
export const query = graphql`
  query {
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

