import React from "react";

export default function Message(props) {
  if (props.success) {
    return (
      <div className="alert alert-success" role="alert">
        <span> {props.success} </span>
        <button className="clear-btn" onClick={() => props.clearMsg()}>
          X
        </button>
      </div>
    );
  }
  return (
    <div className="alert alert-danger" role="alert">
      <span> {props.message} </span>
      <button className="clear-btn" onClick={() => props.clearError()}>
        X
      </button>
    </div>
  );
}
