import React, {FC} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import useInput from "../hooks/useInput";
import {useActions} from "../hooks/useActions";
const LoginForm:FC = () => {
    const {login} = useActions();
    const {isError, isLoading} = useTypedSelector(state => state.auth)
    const username = useInput('');
    const password = useInput('');
    const submit = () => {
        login(username.value, password.value);
    }
    return (
        <Form
            onFinish={submit}
        >
            {isError && <div style={{color: 'red'}}>{isError}</div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
            >
                <Input {...username}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input {...password} type="password"/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;