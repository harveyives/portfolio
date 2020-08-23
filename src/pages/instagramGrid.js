import {IconButton} from "@chakra-ui/button";
import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import Img from 'gatsby-image';
import {Box, Grid, Link, useBreakpoint} from '@chakra-ui/core';
import {InView} from 'react-intersection-observer';
import {AspectRatio, Flex} from '@chakra-ui/layout';
import {FaInstagram} from 'react-icons/all';
import {useDisclosure} from "@chakra-ui/hooks";
import styled from '@emotion/styled'

require('intersection-observer');

const steps = 8;

const BlurredImg = styled(Img)`
  transform: translateZ(0.1px) scale(1.04);
  -webkit-transition: 0.6s filter steps(${steps});
  -moz-transition: 0.6s filter steps(${steps});
  -ms-transition: 0.6s filter steps(${steps});
  -o-transition: 0.6s filter steps(${steps});
  transition: 0.6s filter steps(${steps});
  transition-delay: ${props => props.isOpen ? '0.8s' : '0s'};
  filter: ${props => props.isOpen ? 'blur(4px)' : 0};
`
//maybe refactor this to just be &:hover
const AppearingBox = styled(Box)`
  -webkit-transition: 0.6s opacity steps(${steps});
  -moz-transition: 0.6s opacity steps(${steps});
  -ms-transition: 0.6s opacity steps(${steps});
  -o-transition: 0.6s opacity steps(${steps});
  transition: 0.6s opacity steps(${steps});
  transition-delay: ${props => props.isOpen ? '0.8s' : '0s'};
  opacity: ${props => props.isOpen ? 1 : 0};
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
        <AspectRatio ratio={'1'} w={'70%'} alignItems={'center'}>
          <AppearingBox isOpen={props.isOpen}>
            <Link href={'https://instagram.com/harveyives'}
                  h={'90%'}
                  w={'90%'}>
              <IconButton
                bg={'white'}
                isRound
                variant={'link'}
                h={'100%'}
                w={'100%'}
                icon={<FaInstagram
                  size={'60%'}
                  color={'black'}
                />}
              />
            </Link>
          </AppearingBox>
        </AspectRatio>
      </Flex>
    </Box>
  </Flex>
);

const InstagramGrid = function ({data}) {
  const deviceSize = useBreakpoint();
  const {isOpen, onOpen, onClose, onToggle} = useDisclosure()
  console.log(data);
  return (
    <div>
      <InView
        as="div"
        threshold={1}
        onChange={(inView) => {
          inView ? onOpen() : onClose()
        }}
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
    </div>
  );
};

InstagramGrid.propTypes = {
  data: PropTypes.object.isRequired,
};

export default InstagramGrid;
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

