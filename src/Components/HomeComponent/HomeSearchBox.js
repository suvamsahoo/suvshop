import React, { useState } from "react";

export default function HomeSearchBox(props) {
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form
      onSubmit={submitHandler}
      className="HomeSearchBox width100per Margin10px"
    >
      <input
        type="text"
        name="q"
        id="q"
        onChange={(e) => setName(e.target.value)}
        placeholder="search"
        className="Padding10px BS32"
      ></input>
      <button type="submit" className="BS32">
        <i className="fa fa-search" style={{ color: "#0d6efd" }}></i>
      </button>
    </form>
  );
}
