import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/issue');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [])

  const navigate = useNavigate();

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/issue/${id}`, { status: newStatus });
      const updatedData = data.map((item) => 
        item._id === id ? { ...item, status: newStatus } : item
      );
      setData(updatedData);
      console.log(`Email will be sent to ${data.filter((item) => item._id === id)[0].email} saying there is issue is now ${newStatus}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle button click
  const handleButtonClick = (id) => {
    navigate(`/admin/${id}`);
  };

  return (
    loading ? <div>Loading...</div> :
    <Box p={6}>
      <VStack spacing={6}>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Issue</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                <Td>{item.name}</Td>
                <Td>{item.email}</Td>
                <Td>{item.description}</Td>
                <Td>
                  <Select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                    size="sm"
                    width="150px"
                  >
                    <option value="new">New</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </Select>
                </Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={() => handleButtonClick(item._id)}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};


export default Admin