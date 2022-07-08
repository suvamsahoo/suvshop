import React from "react";
import { Alert } from "react-bootstrap";

export default function MessageBox(props) {
  return (
    <>
      <Alert style={{ textAlign: "center" }} variant="danger" className="my-2">
        {props.children}
      </Alert>
    </>
  );
}
