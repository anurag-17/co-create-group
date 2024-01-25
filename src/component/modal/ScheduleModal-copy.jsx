import React from "react";
import { InlineWidget } from "react-calendly";

const ScheduleModal = ({ handleClose }) => {

  return (
    <>
     <div className="App">
      <InlineWidget url="https://calendly.com/negisapna2208/secheduling-a-call" />
    </div>
    </>
  );
};

export default ScheduleModal;
