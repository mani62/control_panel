import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Row, Col, Dropdown, Space, Button, Tabs, Tag, message, Modal} from "antd";
import { MenuProps } from 'antd';
// @ts-ignore
import {FontAwesome} from "react-web-vector-icons"
import './Mail.less';
import DataTable from "../../components/DataTable/DataTable";
import { ColumnsType } from 'antd/es/table';

interface DataType {
    mailStatus: string,
    subject: string,
    text: string,
    name: string,
    star: boolean,
    status: string,
    date: number
}

const MailScreen = () => {

    const {t} = useTranslation();

    const [selectedRow,setSelectedRow] = useState<React.Key[]>([]);
    const [data,setData] = useState<any>([]);
    const [starredData,setStarredData] = useState<any>([]);
    const [sentData,setSentData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [tab, setTab] = useState<string | number>(1);
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        getData()
    },[])

    //Fetch data from Json file
    const getData=()=>{
        setLoading(true)
        fetch('/json/Mail.json')
            .then(function(response){
                return response.json();
            })
            .then(function(myJson) {
                setData(myJson.data)
                setLoading(false)
            });
    }

    //Fetch starred emails from Json file
    const getStarredEmails=(data: Array<DataType>)=>{
        setLoading(true)
        let newData: Array<DataType> = [];
        data.map((item: DataType)=>{
            if(item.star === true)
                newData.push(item)
        })
        setStarredData(newData)
        setLoading(false)
    }

    //Fetch sent emails from Json file
    const getSentEmails=(data: Array<DataType>)=>{
        setLoading(true)
        let newData: Array<DataType> = [];
        data.map((item: DataType)=>{
            if(item.mailStatus === 'sent')
                newData.push(item)
        })
        setSentData(newData)
        setLoading(false)
    }

    //More sub menu
    const items : MenuProps['items'] = [
        {
            label: <a href="#">1st menu item</a>,
            key: '0',
        },
        {
            label: <a href="#">2nd menu item</a>,
            key: '1',
        }
    ];

    //Handle tab data
    const handleOnClick = (val: string | number) =>{
        if(val == 1)
            getData()
        else if(val == 2)
            getSentEmails(data)
        else if(val == 3)
            getStarredEmails(data)
    }

    //Table Columns
    const columns: ColumnsType<DataType> = [
        {
            title: "star",
            dataIndex: "star",
            key: "star",
            align:'center',
            width:'6%',
            render:(item:boolean)=>{
                let star = <FontAwesome name={'star'} color={'#b3b3b3'} size={25} />;
                if(item === true)
                    star = <FontAwesome name={'star'} color={'#f6bb42'} size={25} />;
                return star;
            }
        },
        {
            title: "status",
            dataIndex: "status",
            key: "status",
            className:'emailTags',
            width:'10%',
            render:(item:string)=>{
                let status;
                switch (item) {
                    case 'important':
                        status = <Tag color={'#1fb5ac'}>{item}</Tag>
                        break;
                    case 'home':
                        status = <Tag color={'#ff7365'}>{item}</Tag>
                        break;
                    case 'work':
                        status = <Tag color={'#4ec4e9'}>{item}</Tag>
                        break;
                    default:
                        status = <Tag color={'#ff7365'}>home</Tag>
                }
                return status;
            }
        },
        {
            title: "name",
            dataIndex: "name",
            key: "name",
            className: 'emailFullName'
        },
        {
            title: "subject",
            dataIndex: "subject",
            key: "subject"
        },
        {
            title: "text",
            dataIndex: "text",
            key: "text",
            render:(item:string)=>{
                const length = item.length;
                let newText = item.slice(0, 50);
                newText = (length > 50 ? newText+'...' : newText)
                return newText;
            }
        },
        {
            title: "date",
            dataIndex: "date",
            key: "date",
            render: (item: number) => {
                let itemDate;
                const date = new Date(item*1000);
                const today = new Date();

                if(date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear())
                    itemDate = date.getHours()+' : '+date.getMinutes()
                else
                    itemDate = date.toLocaleString('default', { month: 'short' })+' '+date.getDate();

                return itemDate;
            }
        }
    ]

    //Delete Rec
    const deleteRecord = () => {
        if(selectedRow.length === 0)
            message.error(t('mail.message.selectRow'));
        if(tab == 2){
            const updatedTableData = sentData.filter((row: { key: React.Key; }) => !selectedRow.includes(row.key));
            setSentData(updatedTableData);
        } else if(tab == 3){
            const updatedTableData = starredData.filter((row: { key: React.Key; }) => !selectedRow.includes(row.key));
            setStarredData(updatedTableData);
        } else{
            const updatedTableData = data.filter((row: { key: React.Key; }) => !selectedRow.includes(row.key));
            setData(updatedTableData);
        }
        setSelectedRow([]);
        hideModal()
    }

    //Star Record
    const starRecord = () => {
        if(tab == 2){
            const updatedData = sentData.map((item: any) => {
                if (selectedRow.includes(item.key)) {
                    return { ...item, star: !item.star };
                } else {
                    return item;
                }
            });
            setSentData(updatedData);
            getSentEmails(updatedData);
        } else if(tab == 3){
            const updatedData = starredData.map((item: any) => {
                if (selectedRow.includes(item.key)) {
                    return { ...item, star: !item.star };
                } else {
                    return item;
                }
            });
            setStarredData(updatedData);
            getStarredEmails(updatedData);
        } else{
            const updatedData = data.map((item: any) => {
                if (selectedRow.includes(item.key)) {
                    return { ...item, star: !item.star };
                } else {
                    return item;
                }
            });
            setData(updatedData);
        }
        setSelectedRow([]);
    }

    //Reload Records
    const reloadRecord = () => {
        if(tab == 2){
            getSentEmails(data)
        } else if(tab == 3){
            getStarredEmails(data)
        } else{
            getData()
        }
        setSelectedRow([]);
    }

    //Modal confirmation
    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    return (
        <div className={'mailList'}>
            <Row gutter={[24,24]} justify={"start"} align={'top'} className={'boxMargin'}>
                <Col lg={{span:24}} md={{span:24}} sm={{span:24}} xs={{span:24}}>
                    <Row className={"titleBox grayTitle MailBoxTitle"}>
                        <Col lg={{span:10}} md={{span:8}} sm={{span:24}} xs={{span:24}}>
                            {t('mail.title.mailBox')}
                        </Col>
                        <Col lg={{span:14}} md={{span:16}} sm={{span:24}} xs={{span:24}} className={'mailBoxIcon'}>
                            <span  className={'icons'}>
                                <span onClick={starRecord}>
                                    <FontAwesome name={'star'} size={20} />
                                </span>
                                <span onClick={showModal}>
                                    <FontAwesome name={'trash'} size={20} />
                                </span>
                                <span>
                                    <FontAwesome name={'location-arrow'} size={20} />
                                </span>
                                <span>
                                    <FontAwesome name={'exclamation-circle'} size={20} />
                                </span>
                                <span onClick={reloadRecord}>
                                    <FontAwesome name={'refresh'} size={20} />
                                </span>
                            </span>
                            <Dropdown menu={{ items }} trigger={['click']} className={'topMenu'}>
                                <a onClick={(e) => e.preventDefault()}>
                                    More
                                    <Space>
                                        <FontAwesome name={"chevron-down"} size={15} />
                                    </Space>
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row gutter={[24,24]} justify={"start"} align={'top'} className={'boxMargin'}>
                <Col lg={{span:12}} md={{span:12}} sm={{span:24}} xs={{span:24}}>
                    <Button type="primary" className={'composeBtn'}>
                        {t('mail.compose')}
                    </Button>
                </Col>
                <Col lg={{span:12}} md={{span:12}} sm={{span:24}} xs={{span:24}}>
                </Col>
            </Row>
            <Row gutter={[24,24]} justify={"start"} align={'top'} className={'boxMargin'}>
                <Col lg={{span:24}} md={{span:24}} sm={{span:24}} xs={{span:24}}>
                    <Tabs
                        type="card"
                        items={[{
                            label: <span className={'tabTitle'}>
                                     <FontAwesome name={"inbox"} size={20}/>
                                     <span className={'tabText'}>{t('mail.title.inbox')}</span>
                                   </span>,
                            key: '1',
                            children: <DataTable data={data} columns={columns} onChange={(val: React.Key[])=>setSelectedRow(val)} loading={loading} />,
                        },{
                            label: <span className={'tabTitle'}>
                                     <FontAwesome name={'location-arrow'} size={20} />
                                     <span className={'tabText'}>{t('mail.title.sent')}</span>
                                   </span>,
                            key: '2',
                            children: <DataTable data={sentData} columns={columns} onChange={(val: React.Key[])=>setSelectedRow(val)} loading={loading} />,
                        },{
                            label: <span className={'tabTitle'}>
                                     <FontAwesome name={'star'} size={20} />
                                     <span className={'tabText'}>{t('mail.title.starred')}</span>
                                   </span>,
                            key: '3',
                            children: <DataTable data={starredData} columns={columns} onChange={(val: React.Key[])=>setSelectedRow(val)} loading={loading} />,
                        }]}
                        onTabClick={(val)=>handleOnClick(val)}
                        onChange={(val: number | string)=>setTab(val)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Modal
                        title="Modal"
                        open={open}
                        onOk={deleteRecord}
                        onCancel={hideModal}
                        okText={t('deleteBtn')}
                        cancelText={t('cancelBtn')}
                    >
                        {t('deleteMsg')}
                    </Modal>
                </Col>
            </Row>
        </div>
    )

}

export default MailScreen;
