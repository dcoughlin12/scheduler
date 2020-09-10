import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  const DayListItemClass = classnames(
    "day-list__item", {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
    });

    const formatSpots = function(spots) {
      if (spots === 0) {
        return `no spots remaining`
      } else if (spots === 1) {
        return `1 spot remaining`
      } else {
        return `${spots} spots remaining`
      }
    };

  return (
    <li data-testid="day" className={DayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
};