import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MemberInfo() {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => setMember(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          myToastMethod("warning", "존재하지 않는 회원입니다.");
          navigate("/");
        }
      });
  }, []);

  function handleClickRemove() {
    setIsLoading(true);
    axios
      .delete(`/api/member/${id}`)
      .then(() => {
        myToastMethod("success", "회원 탈퇴하였습니다");
        navigate("/");
      })
      .catch(() => {
        myToastMethod("warnning", "회원 탈퇴 중 문제가 발생하였습니다.");
        navigate("/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function myToastMethod(status, description) {
    toast({
      status: status,
      description: description,
      position: "top",
    });
  }

  if (member === null) {
    return <Spinner />;
  }
  return (
    <Box>
      <Box>회원 정보</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input isReadOnly value={member.email}></Input>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <Input value={member.nickName} readOnly={true}></Input>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>가입일시</FormLabel>
            <Input value={member.signupDateAndTime} readOnly={true}></Input>
          </FormControl>
        </Box>
        <Button colorScheme={"green"}>수정</Button>
        <Button
          colorScheme={"red"}
          isLoading={isLoading}
          onClick={handleClickRemove}
        >
          탈퇴
        </Button>
      </Box>
    </Box>
  );
}
