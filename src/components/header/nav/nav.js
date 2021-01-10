import React from 'react';
import {Link} from 'gatsby';
import {Box} from '@chakra-ui/react';

const Nav = () => (
  <Box>
    <ul>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <a href="https://github.com/fabe/gatsby-universal">GitHub</a>
      </li>
    </ul>
  </Box>
);

export default Nav;
