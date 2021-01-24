import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

const BoxWithHeadings = styled(Box)`
  p,
  ul,
  ol {
    margin-bottom: 1rem;
  }
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.875rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  h5 {
    font-size: 1.25rem;
  }
  h6 {
    font-size: 1.15rem;
  }
`;

export const Markdown = ({data}) => (
  <BoxWithHeadings
    dangerouslySetInnerHTML={{
      __html: data,
    }}
  />
);

Markdown.propTypes = {
  data: PropTypes.object.isRequired,
};
