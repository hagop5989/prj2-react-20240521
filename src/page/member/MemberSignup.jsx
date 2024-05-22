import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  function handleClick() {
    setIsLoading(true);
    axios
      .post("/api/member/signup", { email, password, nickName })
      .then(() => {
        toast({
          status: "success",
          description: "회원가입이 완료되었습니다.",
          position: "top",
        });
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: "입력 값을 확인해주세요.",
            position: "top",
          });
        } else {
          toast({
            status: "error",
            description: "회원가입 중 오류가 발생하였습니다.",
            position: "top",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCheckEmail() {
    axios
      .get(`/api/member/check?email=${email}`)
      .then(() => {
        toast({
          status: "warning",
          description: "사용할 수 없는 이메일입니다.",
          position: "top",
        });
      }) // 이미 있는 이메일 (사용 못함)
      .catch((err) => {
        if (err.response.status === 404) {
          // 사용할 수 있는 이메일
          toast({
            status: "info",
            description: "사용할 수 있는 이메일입니다.",
            position: "top",
          });
        }
      })
      .finally();
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/check?nickName=${nickName}`)
      .then(() => {
        toast({
          status: "warning",
          description: "사용할 수 없는 닉네임입니다.",
          position: "top",
        });
      }) // 이미 있는 닉네임 (사용 못함)
      .catch((err) => {
        if (err.response.status === 404) {
          // 사용할 수 있는 닉네임
          toast({
            status: "info",
            description: "사용할 수 있는 닉네임입니다.",
            position: "top",
          });
        }
      })
      .finally();
  }

  const isCheckedPassword = password === passwordCheck;
  let isDisabled = false;

  if (!isCheckedPassword) {
    isDisabled = true;
  }
  if (
    !(
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      nickName.trim().length > 0
    )
  ) {
    isDisabled = true;
  }
  return (
    <Box>
      <Box>회원 가입</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <InputGroup>
              <Input onChange={(e) => setEmail(e.target.value)} />
              <InputRightElement w={"75px"} mr={1}>
                <Button
                  colorScheme={"green"}
                  size={"sm"}
                  onClick={handleCheckEmail}
                >
                  중복 확인
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>암호</FormLabel>
            <Input onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>암호확인</FormLabel>
            <Input onChange={(e) => setPasswordCheck(e.target.value)} />
            {isCheckedPassword || (
              <FormHelperText color={"red.300"}>
                암호가 일치하지 않습니다
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <InputGroup>
              <Input onChange={(e) => setNickName(e.target.value)} />
              <InputRightElement w={"75px"} mr={1}>
                <Button
                  colorScheme={"green"}
                  size={"sm"}
                  onClick={handleCheckNickName}
                >
                  중복 확인
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Box>
          <Button
            isLoading={isLoading}
            onClick={handleClick}
            colorScheme={"blue"}
            isDisabled={isDisabled}
          >
            가입
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
