import React from 'react';

import { Badge, Text } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/layout';
import PropTypes from 'prop-types';

export const ProjectCard = ({data}) => {
  console.log(data);
  return (
    <Box p="5" maxW="320px" borderWidth="1px">
      <img alt="md" src="https://bit.ly/2k1H1t6"/>
      <Flex align="baseline" mt={2}>
        <Badge colorScheme="pink">{data.primaryLanguage.name}</Badge>
      </Flex>
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        {data.description}
      </Text>
    </Box>
  );
};

ProjectCard.propTypes = {
  data: PropTypes.object.isRequired,
};
