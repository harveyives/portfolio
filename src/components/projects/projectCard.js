import React from 'react';

import { Badge, Link, Text } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

export const ProjectCard = ({data, children }) => {
  console.log(children);
  return (
    <Link href={`/projects/${data.data.name}`}>
      <Box boxShadow="xs" p="3" rounded="md" maxW="320px">
        <Box rounded="md">
          { console.log(data.children)}
          <Img fluid={data.children.filter(it => it.__typename == "File" && it.childImageSharp !== null)[0].childImageSharp.fluid} style={{borderRadius: '0.375rem'}} />
        </Box>
        <Box mt={2} p={2}>
          <Flex align="baseline">
            <Badge colorScheme="pink">{data.data.primaryLanguage.name}</Badge>
          </Flex>
          <Text mt={2} fontSize="m" fontWeight="semibold" lineHeight="short">
            {data.data.title}
          </Text>
          <Text mt={2} fontSize="xs" isTruncated>
            {data.data.description}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

ProjectCard.propTypes = {
  data: PropTypes.object.isRequired,
};
