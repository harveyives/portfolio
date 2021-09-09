import { Box, Grid, IconButton, Link, useBreakpoint } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { AspectRatio, Flex } from '@chakra-ui/layout';
import { FaInstagram } from 'react-icons/all';
import { useDisclosure } from '@chakra-ui/hooks';
import styled from '@emotion/styled';
import { InView } from 'react-intersection-observer';
import ResponsiveGrid from '../components/responsiveGrid/responsiveGrid';

if (typeof window !== 'undefined') {
    require('react-intersection-observer');
}

const steps = 8;
const BlurredImg = styled(Img)`
    transform: translateZ(0.1px) scale(1.04);
    -webkit-transition: 0.6s filter steps(${steps});
    -moz-transition: 0.6s filter steps(${steps});
    -ms-transition: 0.6s filter steps(${steps});
    -o-transition: 0.6s filter steps(${steps});
    transition: 0.6s filter steps(${steps});
    transition-delay: ${props => (props.open ? '0.8s' : '0s')};
    filter: ${props => (props.open ? 'blur(4px)' : 0)};
`;
// maybe refactor this to just be &:hover
const AppearingBox = styled(Box)`
    -webkit-transition: 0.6s opacity steps(${steps});
    -moz-transition: 0.6s opacity steps(${steps});
    -ms-transition: 0.6s opacity steps(${steps});
    -o-transition: 0.6s opacity steps(${steps});
    transition: 0.6s opacity steps(${steps});
    transition-delay: ${props => (props.open ? '0.8s' : '0s')};
    opacity: ${props => (props.open ? 1 : 0)};
`;

// LOOK AT HOW MANY SIZING HACKS I HAD TO DO TO GET THIS THING CENTERED. LOOK AT IT. REMOVE ONE AND THE WHOLE THING FALLS OVER
// THIS IS INSANE
const InstagramIcon = props => {
    return (
        <Flex h={'100%'} w={'100%'} pos={'absolute'} justify={'center'}>
            <Box w={100 / props.columns + '%'} h={'100%'} align={'center'}>
                <Flex align={'center'} justify="center" h={'100%'} w={'100%'}>
                    <AspectRatio ratio={'1'} w={'70%'} alignItems={'center'}>
                        <AppearingBox open={props.open}>
                            <Link
                                href={'https://instagram.com/harveyives'}
                                h={'90%'}
                                w={'90%'}
                            >
                                <IconButton
                                    bg={'white'}
                                    isRound
                                    variant={'link'}
                                    w={'100%'}
                                    style={{ height: '100%' }}
                                    icon={
                                        <FaInstagram
                                            size={'60%'}
                                            color={'black'}
                                        />
                                    }
                                />
                            </Link>
                        </AppearingBox>
                    </AspectRatio>
                </Flex>
            </Box>
        </Flex>
    );
};

InstagramIcon.propTypes = {
    columns: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
};

const InstagramGrid = function({ data }) {
    const grid = {
        columnSizes: { base: 3, sm: 4, md: 5, lg: 6, xl: 6 },
        itemCounts: { base: 3, sm: 4, md: 5, lg: 12, xl: 12 },
    };
    const deviceSize = useBreakpoint();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box>
            <InView
                as="div"
                threshold={1}
                onChange={inView => {
                    inView ? onOpen() : onClose();
                }}
            >
                <Grid pos={'relative'} style={{ overflow: 'hidden' }}>
                    <ResponsiveGrid {...grid}>
                        {data.allInstaNode.edges
                            .map(it => it.node)
                            .map(it => (
                                <BlurredImg
                                    key={it.id}
                                    fluid={{
                                        ...it.localFile.childImageSharp.fluid,
                                        aspectRatio: 1,
                                    }}
                                    alt={it.caption}
                                    open={isOpen ? 1 : 0}
                                />
                            ))}
                    </ResponsiveGrid>
                    <InstagramIcon
                        columns={grid.columnSizes[deviceSize]}
                        open={isOpen}
                    />
                </Grid>
            </InView>
        </Box>
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
