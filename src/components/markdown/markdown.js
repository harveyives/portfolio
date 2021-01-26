import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

const BoxWithHeadings = styled(Box)`
  p,
  ul,
  ol {
    margin-bottom: 1.5rem;
  }
  h1 {
    font-size: 3rem;
    font-weight: bold;
  }
  h2 {
    font-size: 2rem;
    font-weight: bold;
  }
  h3 {
    font-size: 1.875rem;
    font-weight: bold;
  }
  h4 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  h5 {
    font-size: 1.25rem;
    font-weight: bold;
  }
  h6 {
    font-size: 1.15rem;
    font-weight: bold;
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
