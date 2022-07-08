import React from "react";
import { Alert } from "react-bootstrap";

export default function SuccessMessage(props) {
  return (
    <>
      <Alert style={{ textAlign: "center" }} variant="success">
        {props.children}
      </Alert>
    </>
  );
}
