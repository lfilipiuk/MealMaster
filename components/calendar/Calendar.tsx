import React from "react";
import ReactCalendar from "react-calendar";
import styled from "styled-components";
import { useMenu } from "../../context/MenuContext";
import { formatDate, getStrippedDate } from "../../utils/functions";
import Backdrop from "../ui/modal/Backdrop";
import { useSteps } from "../../context/StepContext";

type Props = {
  onClose: () => void;
  value: Date;
};

const Calendar = ({ onClose, value }: Props) => {
  const { setMenuDate } = useMenu();

  const handleDateChange = (date: Date) => {
    setMenuDate(getStrippedDate(date));
    onClose();
  };

  return (
    <Backdrop onClick={onClose}>
      <div
        className={"absolute top-1/4"}
        onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
      >
        <ReactCalendar
          minDate={new Date(2021, 0, 1)}
          minDetail={"year"}
          locale={"en-GB"}
          className={"REACT-CALENDAR shadow-lg p-2"}
          onClickDay={(date) => handleDateChange(date)}
          value={value}
        />
      </div>
    </Backdrop>
  );
};

export default Calendar;
