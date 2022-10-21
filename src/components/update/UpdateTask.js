import axios from "axios";
import { observer } from "mobx-react-lite";
import React, { useContext, useRef, useState } from "react";
import { Form, Card, Button, InputGroup } from 'react-bootstrap';
import { Context } from "../..";


const UpdateTask = observer(() => {
    const { question } = useContext(Context)
    const put_name = useRef(null);
    const [input, setInput] = useState('')
    const [tasks, setTasks] = useState([]);


    const handleUpdate = () => {
        put_name.current.focus();
    }

    const updateCategory = () => {
        try {
            let header = {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            };
            let token = localStorage.getItem('token');
            if (token) header.Authorization = `Bearer ${token}`;

            const id = question.task.id;
            axios.put(`${process.env.REACT_APP_API_URL}task`, {
                id: question.task.id,
                name: put_name.current.value()
            },

                { withCredentials: true, headers: header }).then((json) => {
                    alert(json)
                    alert('Success')
                })
        }
        catch (err) {
            if (err.response) {
                console.log(err.response.data);
            }

        }
    }

    const deleteTask = async (id) => {
        try {
            axios.delete(`${process.env.REACT_APP_API_URL}task/some/${id}`, {
                id: question.task.id,
            });
            setTasks(
                tasks.filter((task) => {
                    return task.id !== id;
                })
            );
        }
        catch (err) {
            if (err.response) {
                console.log(err.response.data);
            }

        }

    };


    return (
        <div>
            <Card style={{ width: 400 }} className="p-4 mt-4">

                <div className="d-flex justify-content-space-between align-items-center">
                    <h3>UpdateTask</h3>
                </div>


                <div className="d-flex justify-content-space-between">
                    <div>
                        {question.task.map(task =>
                            <div key={task.id} className="d-flex justify-content-space-between">
                                <Form.Control
                                    ref={put_name}
                                    className="mt-3"
                                    value={task.name}
                                    // onChange={handleUpdate}
                                    onChange={(e) => setInput(e.target.value)}

                                >
                                </Form.Control>

                                <Button
                                    variant="warning"
                                    className="mt-3 "
                                    onClick={handleUpdate}
                                >
                                    &#128393;
                                </Button>
                                <Button
                                    className="mt-3"
                                    variant={"outline-danger"}
                                    onClick={deleteTask}
                                >
                                    &#128465;
                                </Button>
                            </div>
                        )}
                    </div>
                </div>



            </Card>
        </div>
    )
})

export default UpdateTask