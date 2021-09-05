import React from 'react';

import { Link } from 'gatsby';
import { Badge, Text } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

export const ProjectCard = ({ data }) => {
  return (
    <Link to={`/projects/${data.data.name}`} >
      <Box p={8} h={'100%'}>
        <Box boxShadow="xs" p={3} rounded="md" h={'100%'}>
          <Box rounded="md">
            <Img fluid={data.children.filter(it => it.__typename == "File" && it.childImageSharp !== null)[0].childImageSharp.fluid} style={{borderRadius: '0.375rem'}} />
          </Box>
          <Box mt={2} p={2}>
            <Flex align="baseline">
              <Badge colorScheme={'orange'}>{data.data.primaryLanguage.name}</Badge>
            </Flex>
            <Text mt={2} fontSize="m" fontWeight="semibold" lineHeight="short">
              {data.data.title}
            </Text>
            <Text mt={2} fontSize="xs">
              {data.data.description}
            </Text>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

ProjectCard.propTypes = {
  data: PropTypes.object.isRequired,
};
