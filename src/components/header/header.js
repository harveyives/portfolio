import {
    chakra,
    Flex,
    Heading,
    useColorModeValue,
    useDisclosure,
    useUpdateEffect,
} from '@chakra-ui/react';
import React from 'react';

function HeaderContent() {
    const mobileNav = useDisclosure();
    const mobileNavBtnRef = React.useRef();

    useUpdateEffect(() => {
        mobileNavBtnRef.current?.focus();
    }, [mobileNav.isOpen]);

    return (
        <>
            <Flex
                w="100%"
                h="100%"
                px="6"
                align="center"
                justify="space-between"
            >
                <Flex align="center">
                    <chakra.a
                        display="block"
                        aria-label="Chakra UI, Back to homepage"
                    >
                        <Heading as={'h1'}>Harvey Ives</Heading>
                    </chakra.a>
                </Flex>
            </Flex>
        </>
    );
}

function Header(props) {
    const bg = useColorModeValue('white', 'gray.800');
    const ref = React.useRef();

    return (
        <chakra.header
            ref={ref}
            shadow={'sm'}
            transition="box-shadow 0.2s"
            top="0"
            bg={bg}
            left="0"
            right="0"
            borderTopColor="teal.400"
            width="full"
            {...props}
        >
            <chakra.div height="4.5rem" mx="auto" maxW="1200px">
                <HeaderContent />
            </chakra.div>
        </chakra.header>
    );
}

export default Header;
