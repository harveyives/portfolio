import React from 'react';
import { Box } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from './mdx-components';

const Main = props => (
  <Box as="main" minH="72vh" pt={8} px={5} mt="4rem" {...props} />
);

const DocsLayout = ({ data }) => {
  return (
    <MDXProvider components={MDXComponents}>
      <div
        dangerouslySetInnerHTML={{
          __html: data,
        }}
      ></div>
    </MDXProvider>
  );
};

export default DocsLayout;
