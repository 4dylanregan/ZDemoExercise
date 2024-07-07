import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast
} from '@chakra-ui/react';

const Home = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate and submit the form data
      try {
        if (name && email && description) {
          const response = await axios.post('http://localhost:3000/issue', { name: name, email: email, description: description });
          if (response.status === 201) {
            console.log(`Email will be sent to ${email} saying there is issue has been reported.`);
            toast({
              title: 'Form submitted.',
              description: "We've received your submission.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            // Clear the form
            setName('');
            setEmail('');
            setDescription('');
          }
        } else {
          toast({
            title: 'Error.',
            description: 'All fields are required.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
  };

  return (
    <Box maxW="md" mx="auto" mt="10" p="6" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>Description of the Problem</FormLabel>
            <Textarea
              placeholder="Describe the issue you are experiencing"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Home