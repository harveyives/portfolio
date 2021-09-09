import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMusicHistory } from './musicHistorySlice';
import { Tooltip, VStack } from '@chakra-ui/react';
import { Box, Center, Grid, Text } from '@chakra-ui/layout';
import moment from 'moment';
import { CircularProgress } from '@chakra-ui/progress';
import { useColorModeValue } from '@chakra-ui/color-mode';

export const MusicHistory = () => {
    const dispatch = useDispatch();

    const secondaryText = useColorModeValue('gray.500', 'white');

    const { tracks, loading, error } = useSelector(state => state.musicHistory);

    useEffect(() => {
        dispatch(getMusicHistory());
    }, []);

    if (error) {
        return (
            <div>
                <h1>Something went wrong...</h1>
                <div>{error}</div>
            </div>
        );
    }

    const track_limit = 5;
    // [0,1,2,3] => [sm,md,lg,xl]
    // const track_image_size = 2;

    return (
        <Box>
            {loading && (
                <Box height={250}>
                    <Center h={'100%'}>
                        <CircularProgress isIndeterminate />
                    </Center>
                </Box>
            )}
            {!loading && (
                <Box p={3} borderWidth="1px" borderRadius="lg">
                    <VStack
                        // divider={<StackDivider borderColor="gray.200"/>}
                        spacing={4}
                        align="stretch"
                    >
                        <Text fontSize="3xl" fontWeight={'bold'}>
                            What I&apos;ve been listening to
                        </Text>
                        {tracks.slice(0, track_limit).map((it, i) => (
                            <Grid
                                templateColumns="repeat(10, 1fr)"
                                gap={3}
                                key={i}
                                w={'100%'}
                                borderRadius={5}
                                as={'a'}
                                href={it.url}
                            >
                                <Text gridColumn={'span 4'}>{it.name}</Text>
                                <Box gridColumn={'span 3'}>
                                    {it.artist['#text']}
                                </Box>
                                <Text
                                    gridColumn={'span 3'}
                                    fontSize={'sm'}
                                    color={secondaryText}
                                >
                                    {!it.date && 'right now!'}
                                    {it.date && (
                                        <Tooltip label={it.date['#text']}>
                                            {'about ' +
                                                moment
                                                    .unix(it.date.uts)
                                                    .fromNow()}
                                        </Tooltip>
                                    )}
                                </Text>
                            </Grid>
                        ))}
                    </VStack>
                </Box>
            )}
        </Box>
    );
};
