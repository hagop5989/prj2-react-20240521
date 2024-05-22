import React, { useState } from "react";
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function MyLayout({ title0, objectList0 = [], objectProps0 = [] }) {
  const [title, setTitle] = useState(title0 || "");
  const [objectList, setObjectList] = useState(objectList0);
  const [objectProps, setObjectProps] = useState(objectProps0);

  const navigate = useNavigate();

  return (
    <Box>
      <Box>{title}</Box>
      <Box>
        <Table>
          <Thead>
            <Tr bgColor={"gray.200"}>
              <Th>#</Th>
              {objectProps.map((prop, index) => (
                <Th key={index}>{prop}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {objectList.map((obj, rowIndex) => (
              <Tr
                _hover={{ bgColor: "gray.200" }}
                cursor={"pointer"}
                onClick={() => navigate(`/${title}/${obj.id}`)}
                key={obj.id}
              >
                <Td>{rowIndex + 1}</Td>
                {objectProps.map((prop, colIndex) => (
                  <Td key={colIndex}>{obj[prop]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default MyLayout;
