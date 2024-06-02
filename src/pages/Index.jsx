import React, { useState } from "react";
import { Container, Text, VStack, HStack, Button, Table, Thead, Tbody, Tr, Th, Td, Input, IconButton, useToast } from "@chakra-ui/react";
import { FaCartPlus, FaUpload } from "react-icons/fa";

const Index = () => {
  const [stock, setStock] = useState([
    { id: 1, name: "Paracetamol", quantity: 100 },
    { id: 2, name: "Ibuprofen", quantity: 50 },
    { id: 3, name: "Aspirin", quantity: 75 },
  ]);
  const [cart, setCart] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const toast = useToast();

  const handleAddToCart = (medicine) => {
    setCart([...cart, medicine]);
    toast({
      title: `${medicine.name} added to cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleFileUpload = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleUpdateStock = () => {
    if (!csvFile) {
      toast({
        title: "No file selected.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n");
      const updatedStock = lines.map((line) => {
        const [id, name, quantity] = line.split(",");
        return { id: parseInt(id), name, quantity: parseInt(quantity) };
      });
      setStock(updatedStock);
      toast({
        title: "Stock updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    };
    reader.readAsText(csvFile);
  };

  return (
    <Container centerContent maxW="container.lg" py={10}>
      <VStack spacing={6} width="100%">
        <Text fontSize="3xl" fontWeight="bold">
          Medicine Shop
        </Text>
        <HStack spacing={4} width="100%">
          <Input type="file" accept=".csv" onChange={handleFileUpload} />
          <IconButton aria-label="Upload CSV" icon={<FaUpload />} onClick={handleUpdateStock} />
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Quantity</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stock.map((medicine) => (
              <Tr key={medicine.id}>
                <Td>{medicine.id}</Td>
                <Td>{medicine.name}</Td>
                <Td>{medicine.quantity}</Td>
                <Td>
                  <IconButton aria-label="Add to cart" icon={<FaCartPlus />} onClick={() => handleAddToCart(medicine)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Text fontSize="2xl" fontWeight="bold">
          Cart
        </Text>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.map((medicine, index) => (
              <Tr key={index}>
                <Td>{medicine.id}</Td>
                <Td>{medicine.name}</Td>
                <Td>{medicine.quantity}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;
