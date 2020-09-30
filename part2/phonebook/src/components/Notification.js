import React from 'react';
import './Notification.css';

const Notification = (props) => {
  if (!props.message) return null;

  const { message, type } = props.message;

  return (
    <div className={type === "error" ? "notification error" : "notification"}>
      {message}
    </div>
  );
};

export default Notification;