import React from "react";
import {
  ButtonGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

function Signout({ signOutFunction, ...props}) {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignOut = () => {
    signOutFunction();
    onClose();
  }

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      {/* Trigger: This component opens the popover */}
      <PopoverTrigger>
        <Text cursor="pointer" onClick={onOpen} {...props}>Signout</Text>
      </PopoverTrigger>

      {/* Content: This is the content of the popover */}
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton color="black"/>
        <PopoverBody textAlign="center" textColor="black">Confirm Signout</PopoverBody>
        <PopoverFooter textAlign="center">
          <ButtonGroup>
            <Button colorScheme="green" size="sm" onClick={handleSignOut}>
              Yes
            </Button>
            <Button colorScheme="red" size="sm" onClick={onClose}>
              No
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default Signout;
