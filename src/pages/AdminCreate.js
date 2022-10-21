import React, { useContext, useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import CreateTask from "../components/create/CreateTask";
import CreateCategory from "../components/create/CreateCategory";
import CreateQuestion from "../components/create/CreateQuestion";
import { fetchCategory } from "../http/categoryAPI";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { fetchTask } from "../http/taskAPI";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UpdateTask from "../components/update/UpdateTask";

// import Sonnet from '../../components/Sonnet';

const AdminCreate = observer(() => {

    const { question } = useContext(Context)
    const [key, setKey] = useState('update');

    useEffect(() => {
        fetchCategory().then(data => question.setCategory(data))
        fetchTask().then(data => question.setTask(data))
    }, [])

    return (
        <Container
            className="d-flex flex-column"
            style={{ height: window.innerHeight }}
        >
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 mt-3"
            >
                <Tab eventKey="create" title="Create">
                    <CreateTask />
                    <CreateCategory />
                    <CreateQuestion />
                </Tab>
                <Tab eventKey="update" title="Update / delete">
                    <UpdateTask/>

                </Tab>
            </Tabs>
        </Container>
    );
})

export default AdminCreate;