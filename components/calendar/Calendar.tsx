import React from "react";
import ReactCalendar from "react-calendar";
import styled from "styled-components";
import { useMenu } from "../../context/MenuContext";
import { formatDate } from "../../utils/functions";
import Backdrop from "../ui/modal/Backdrop";
import { useSteps } from "../../context/StepContext";

type Props = {
  onClose: () => void;
};

const Calendar = ({ onClose }: Props) => {
  const { menuDate, setMenuDate } = useMenu();
  const { setModalOpen } = useSteps();

  const handleDateChange = (date: Date) => {
    setMenuDate(date);
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
          className={"REACT-CALENDAR shadow-lg"}
          onClickDay={(date) => handleDateChange(date)}
          value={menuDate}
        />
      </div>
    </Backdrop>
  );
};

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  max-width: 600px;
  margin: auto;
  margin-top: 20px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 3px;
  /* ~~~ navigation styles ~~~ */

  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }

  /* ~~~ label styles ~~~ */

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-decoration: none;
  }

  /* ~~~ button styles ~~~ */

  button {
    margin: 3px;
    background-color: #eeefef;
    border: 0;
    border-radius: 3px;
    color: #000000;
    padding: 5px 0;

    &:hover {
      background-color: #d9d9d9;
    }

    &:active {
      background-color: #d2d2d2;
    }
  }

  /* ~~~ day grid styles ~~~ */

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

    .react-calendar__tile {
      max-width: initial !important;
    }

    .react-calendar__tile--range {
      background: #d8f0dc;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
  }

  /* ~~~ neighboring month & weekend styles ~~~ */

  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.7;
  }

  .react-calendar__month-view__days__day--weekend {
    background-color: #ececec;
  }

  /* ~~~ other view styles ~~~ */

  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;

    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`;

export default Calendar;
