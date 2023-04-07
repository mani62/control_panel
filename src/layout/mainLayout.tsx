import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/Auth/AuthContext";
import { useTranslation } from "react-i18next";
import decode from 'jwt-decode';

//-- ant design config
import { ConfigProvider } from "antd";
import faIR from "antd/es/locale/fa_IR";
import enUS from "antd/es/locale/en_US";
import "moment/locale/fa";
import moment from "moment";

import { Layout } from "antd";
import Sidebar from "./sidebar";
import Header from "./header";
import './style.less'

const { Content } = Layout;

interface Props {
  children?: React.ReactElement;
}

interface title {
  fa: string;
  en: string;
}
// sidebar basic
export interface sidebarItembasic {
  id: number;
  title: title;
  icon?: string;
  isActive: boolean;
  access: Array<number>;
}

// sidebar item with children
interface sidbarItemHasChild extends sidebarItembasic {
  children: Array<sidbarItemHasChild | sidbarItemNoChild>;
}

// sidebar without childred
export interface sidbarItemNoChild extends sidebarItembasic {
  link: string;
  divider?: boolean;
}

// sidebar
const sidebarMenu: Array<sidbarItemHasChild | sidbarItemNoChild> = [
  {
    id: 1,
    title: {
      fa: "میزکار",
      en: "workTable",
    },
    icon: "WorkTable",
    isActive: false,
    access: [1, 2, 3],
    link: "/home",
  },
  {
    id: 2,
    title: {
      fa: "فاکتورها",
      en: "factors",
    },
    icon: "Factors",
    isActive: false,
    access: [1, 2, 3],
    children: [
      {
        id: 21,
        title: {
          fa: "ایجاد فاکتور",
          en: "factor",
        },
        link: "/factor",
        isActive: false,
        access: [3],
        icon: "createFactor",
      },
      {
        id: 22,
        title: {
          fa: "لیست فاکتورها",
          en: "factors list",
        },
        link: "/factorList",
        isActive: false,
        access: [1, 2, 3],
        icon: "factorList",
      },
      {
        id: 24,
        title: {
          fa: "لیست بن‌ها",
          en: "coupon list",
        },
        link: "/couponlist",
        isActive: false,
        access: [1, 2],
        icon: "couponList",
      },
      {
        id: 25,
        title: {
          fa: "لیست تراکنش ها",
          en: "transaction list",
        },
        link: "/transactionList",
        isActive: false,
        access: [1, 2, 3],
        icon: "smsTransaction",
      },
    ],
  },
  {
    id: 3,
    title: {
      fa: "مشتریان",
      en: "customers",
    },
    icon: "Customers",
    isActive: false,
    access: [1, 2, 3],
    children: [
      {
        id: 31,
        title: {
          fa: "لیست مشتریان",
          en: "customer list",
        },
        link: "/customerList",
        isActive: false,
        access: [1, 2, 3],
        icon: "customerList",
      },
      {
        id: 32,
        title: {
          fa: "ایجاد مشتری",
          en: "create customer",
        },
        link: "/customer/add",
        isActive: false,
        access: [1, 2, 3],
        icon: "createCustomer",
      },
      {
        id: 33,
        title: {
          fa: "لیست انتصاب داده نشده",
          en: "lost customer",
        },
        link: "/lostCustomers",
        isActive: false,
        access: [1, 2, 3],
        icon: "lostCustomer",
      },
    ],
  },
  {
    id: 4,
    title: {
      fa: "پیام‌ها",
      en: "messages",
    },
    icon: "Messages",
    isActive: false,
    access: [1],
    children: [
      {
        id: 41,
        title: {
          fa: "ارسال پیام",
          en: "send message",
        },
        link: "/message",
        isActive: false,
        access: [1],
        icon: "sendMessage",
      },
      {
        id: 42,
        title: {
          fa: "لیست پیام های ویژه",
          en: "special message list",
        },
        link: "/message/list",
        isActive: false,
        access: [1],
        icon: "messageList",
      },
      {
        id: 43,
        title: {
          fa: "لیست پیامک",
          en: "sms list",
        },
        link: "/message/smsList",
        isActive: false,
        access: [1],
        icon: "smsList",
      },
      {
        id: 44,
        title: {
          fa: "لیست شارژ پیامک",
          en: "sms charge list",
        },
        link: "/message/transaction",
        isActive: false,
        access: [1],
        icon: "smsTransaction",
      },
    ],
  },
  {
    id: 5,
    title: {
      fa: "جشنواره",
      en: "festival",
    },
    icon: "Festival",
    isActive: false,
    access: [1],
    children: [
      {
        id: 51,
        title: {
          fa: "ایجاد جشنواره",
          en: "create festival",
        },
        link: "/festival",
        isActive: false,
        access: [1],
        icon: "createFestival",
      },
      {
        id: 52,
        title: {
          fa: "لیست جشنواره‌ها",
          en: "festivals list",
        },
        link: "/festivalList",
        isActive: false,
        access: [1],
        icon: "festivalList",
      },
      {
        id: 53,
        title: {
          fa: "لیست بایگانی شده",
          en: "archived list",
        },
        link: "/festivalList/archive",
        isActive: false,
        access: [1],
        icon: "archiveList",
      },
    ],
  },
  {
    id: 6,
    title: {
      fa: "تنظیمات",
      en: "settings",
    },
    icon: "Settings",
    isActive: false,
    access: [1, 2],
    children: [
      {
        id: 61,
        title: {
          fa: "ساخت مدیر",
          en: "create manager",
        },
        link: "/createManager",
        isActive: false,
        access: [1, 2],
        icon: "createManager",
      },
      {
        id: 62,
        title: {
          fa: "لیست مدیران",
          en: "managers list",
        },
        link: "/managersList",
        isActive: false,
        access: [1, 2],
        icon: "managerList",
      },
      {
        id: 63,
        title: {
          fa: "ایجاد کارتخوان",
          en: "pos assinment",
        },
        link: "/createpos",
        isActive: false,
        access: [1],
        icon: "createPos",
        divider: true,
      },
      {
        id: 64,
        title: {
          fa: "‌لیست کارتخوان‌ها",
          en: "pos list",
        },
        link: "/posList",
        isActive: false,
        access: [1,2],
        icon: "posList",
      },
      {
        id: 65,
        title: {
          fa: "تنظیمات فروشگاه",
          en: "edit shop",
        },
        link: "/shopedit",
        isActive: false,
        access: [1],
        icon: "editShop",
        divider: true,
      },
      {
        id: 66,
        title: {
          fa: "لیست شعبه‌ها",
          en: "branch list",
        },
        link: "/branchList",
        isActive: false,
        access: [1],
        icon: "editShop",
      },
      {
        id: 67,
        title: {
          fa: "تنظیمات سطح",
          en: "level settings",
        },
        link: "/customer/level",
        isActive: false,
        access: [1],
        icon: "levelSetting",
        divider: true,
      },
      {
        id: 68,
        title: {
          fa: "تنظیمات تاریخ تولد",
          en: "birthday setting",
        },
        link: "/birthdaySetting",
        isActive: false,
        access: [1],
        icon: "editShop",
      },
      {
        id: 69,
        title: {
          fa: "تنظیمات دعوتنامه",
          en: "referral setting",
        },
        link: "/referralSetting",
        isActive: false,
        access: [1],
        icon: "editShop",
      },
    ],
  },
  {
    id: 7,
    title: {
      fa: "گزارشات",
      en: "analysis",
    },
    icon: "Analysis",
    isActive: false,
    access: [1, 2, 3],
    children: [
      {
        id: 71,
        title: {
          fa: "صورت عملکرد",
          en: "performance form",
        },
        isActive: false,
        access: [1],
        link: "/performanceForm",
      },
      {
        id: 78,
        title: {
          fa: "تراکنش های مالی پیامک",
          en: "financial transaction",
        },
        link: "/transaction/financial",
        isActive: false,
        access: [1, 2, 3],
      },
      {
        id: 72,
        title: {
          fa: "تعداد مشتریان",
          en: "customers count",
        },
        isActive: false,
        access: [1],
        link: "/report/customer",
      },
      {
        id: 73,
        title: {
          fa: "امار مشتریان جدید",
          en: "new customer statistics",
        },
        isActive: false,
        access: [1],
        link: "/report/newCustomerStatistics",
      },
      {
        id: 74,
        title: {
          fa: "تعداد فاکتورها",
          en: "factors count",
        },
        isActive: false,
        access: [1],
        link: "/report/factor",
      },
      {
        id: 75,
        title: {
          fa: "میانگین مبلغ فاکتور",
          en: "average factor amount",
        },
        isActive: false,
        access: [1],
        link: "/report/averageFactorAmount",
      },
      {
        id: 76,
        title: {
          fa: "میانگین زمان تکرار فاکتور",
          en: "Average factor repetition time",
        },
        isActive: false,
        access: [1],
        link: "/report/averageRepetitionFactor",
      },
      {
        id: 77,
        title: {
          fa: "میانگین تازگی خرید",
          en: "average fresh buy",
        },
        isActive: false,
        access: [1],
        link: "/report/generalStatistics",
      },

    ],
  },
  {
    id: 8,
    title: {
      fa: "ثبت نظر",
      en: "feedbacks",
    },
    icon: "Feedbacks",
    isActive: false,
    access: [1, 2],
    children: [
      {
        id: 81,
        title: {
          fa: "لیست امتیاز و نظرات",
          en: "rate list",
        },
        isActive: false,
        access: [1, 2],
        link: "/rateList",
      },
      {
        id: 82,
        title: {
          fa: "تنظیم امتیاز و نظرات",
          en: "rate settings",
        },
        link: "/rate_settings",
        isActive: false,
        access: [1],
      },
    ],
  },
  {
    id: 9,
    title: {
      fa: "روندها",
      en: "performance",
    },
    icon: "Performance",
    isActive: false,
    access: [1],
    children: [],
  },
];

const MainLayout = (props: Props) => {
  // -- translate helper
  const { t } = useTranslation("common");

  //-- load app context
  // const { setUserInfo } = useContext(AuthContext);
  // let userInfo: any = window.localStorage.getItem('loginData');
  // userInfo = decode(userInfo)
  //
  // useEffect(() => {
  //   setUserInfo(userInfo)
  // },[])

  return (
    <ConfigProvider direction={'ltr'}>
      <Layout>
        <Header />
        <Layout>
          <Sidebar menu={sidebarMenu} />
          <Content className={'mainLayout'}>{props.children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
