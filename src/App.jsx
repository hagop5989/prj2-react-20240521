import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyLayout2 from "./MyLayout2.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Home />,
    children: [
      // { index: true, element: <BoardList /> },
      // { path: "write", element: <BoardWrite /> },
      // { path: "board/:id", element: <BoardView /> },
      // { path: "edit/:id", element: <BoardEdit /> },
      // { path: "signup", element: <MemberSignup /> },
      // { path: "member/list", element: <MemberList /> },
      // { path: "member/:id", element: <MemberInfo /> },
      { path: "mylayout", element: <MyLayout2 /> },
    ],
  },
]);

function App(props) {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
