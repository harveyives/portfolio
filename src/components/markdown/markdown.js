import styled from "@emotion/styled";
import {Box} from "@chakra-ui/react";
import React from "react";

const BoxWithHeadings = styled(Box)`
  p, ul, ol {
    margin-bottom: 1rem;
  }

  h1 { font-size: 4rem; }
  h2 { font-size: 3rem; }
  h3 { font-size: 2.25rem; }
  h4 { font-size: 1.875rem; }
  h5 { font-size: 1.5rem; }
  h6 { font-size: 1.25rem; }
`

export const Markdown = ({data}) => <BoxWithHeadings dangerouslySetInnerHTML={{
  __html: data,
}}/>;
