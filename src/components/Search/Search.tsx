import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
// @ts-ignore
import { Feather } from 'react-web-vector-icons'
import './Search.less'

interface Props {
    onChange: (value: string) => void;
}

const Search = (props: Props) =>{

    const onFinish = (values: string) => {
        props.onChange(values)
    };

    return (
        <Form
            name="search"
            onFinish={onFinish}
            autoComplete="off"
            className={'searchBox'}
        >
            <Form.Item name="search">
                <Row justify={'space-between'}>
                    <Col xl={{span:22}} lg={{span:21}} sm={{span:18}}>
                        <Input />
                    </Col>
                    <Col xl={{span:2}} lg={{span:3}} sm={{span:6}}>
                        <Button htmlType="submit" className={'searchBtn'}>
                            <Feather name={'search'} size={20} />
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    )
}

export default Search;
