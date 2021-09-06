import { Grid, useBreakpoint } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

const ResponsiveGrid = props => {
    const deviceSize = useBreakpoint();
    return (
        <Grid
            templateColumns={`repeat(${props.columnSizes[deviceSize]}, minmax(0, 1fr))`}
            {...props}
        >
            {props.children
                .slice(0, props.itemCounts[deviceSize])
                .map(it => it)}
        </Grid>
    );
};

ResponsiveGrid.propTypes = {
    columnSizes: PropTypes.object.isRequired,
    itemCounts: PropTypes.object.isRequired,
};

export default ResponsiveGrid;
