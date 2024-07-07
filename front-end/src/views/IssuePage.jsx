import React, { useState, useEffect } from 'react';
import {useParams } from "react-router-dom";
import { Box, FormControl, FormLabel, Textarea, Button, Text, Select } from '@chakra-ui/react';
import axios from 'axios';

const IssuePage = () => {
  // State for form inputs
  const [data, setData] = useState({});
  const [comment, setComment] = useState('');

  const params = useParams();

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/issue/${params.id}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email will be sent to " + data.email + " saying '" + comment + "'.");
    setComment('')
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/issue/${id}`, { status: newStatus });
      setData({ ...data, status: newStatus })
      console.log(`Email will be sent to ${data.email} saying there is issue is now ${newStatus}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Text>{data.name}</Text>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Text>{data.email}</Text>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Issue</FormLabel>
        <Text>{data.issue}</Text>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Status</FormLabel>
        <Select value={data.status} onChange={(e) => handleStatusChange(data._id, e.target.value)}>
          <option value="new">New</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </Select>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Add Comment</FormLabel>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default IssuePage;
