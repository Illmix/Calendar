import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

const Event:FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {fetchGuests, createEvent, fetchEvents} = useActions();
    const {guests, events} = useTypedSelector(state => state.event)
    const {user} = useTypedSelector(state => state.auth)
    useEffect(()=>{
        fetchGuests();
        fetchEvents(user.username);
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false);
        createEvent(event);
    }

    return (
        <Layout>
            <Row justify="center" style={{margin: 10}}>
                <Button
                    onClick={()=>setModalVisible(true)}
                >
                    ADD EVENT
                </Button>
            </Row>
            <EventCalendar events={events}/>
            <Modal
                title="Add event"
                open={modalVisible}
                footer={null}
                onCancel={()=>setModalVisible(false)}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    );
};

export default Event;