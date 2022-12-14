import React, {FC, ReactNode} from 'react';
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar:FC<EventCalendarProps> = (props) => {
    function dateCellRender(value: any): ReactNode {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter(ev => ev.date === formatedDate);
        return (
            <div>
                {currentDayEvents.map((ev, index) =>
                    <div key={index}>
                        {ev.description}
                    </div>
                )}
            </div>
        );
    }
    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};

export default EventCalendar;