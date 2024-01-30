import React from "react";
import { InlineWidget } from "react-calendly";

const ScheduleModal = ({ handleClose }) => {

  return (
    <>
     <div className="App">
      <InlineWidget url="https://calendly.com/mpricharda/30min" />
    </div>
    </>
  );
};

export default ScheduleModal;
  