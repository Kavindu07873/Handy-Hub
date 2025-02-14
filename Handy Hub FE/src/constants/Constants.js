// export const BASE_ROUTE = "/lion-dev-v1";
import { useState } from "react";

export const __DEV__ = window.location.hostname === 'localhost'
export const __TESTING__ = window.location.hostname === 'dev.lionbeer-vendorportal.com'
export const __PROD__ = window.location.hostname === 'lionbeer-vendorportal.com'
export const BASE_ROUTE = "";
export const LOGIN_ROUTE = "/login";
export const VENDOR_LOGIN_ROUTE = "/vendor-login";
export const DASHBOARD_ROUTE = "/dashboard";
export const SUPERVISOR_DASHBOARD_ROUTE = "/supervisor-dashboard";
export const PROCESS_TYPE_ROUTE = "/process-type";
export const DEPARTMENT_ROUTE = "/department";
export const USER_ROUTE = "/user";
export const VENDOR_ROUTE = "/vendor";
export const PROCESS_ROUTE = "/process";
export const PENDING_TASKS_ROUTE = "/pending-tasks";
export const COMPLETED_TASKS_ROUTE = "/completed-tasks";
export const HOLIDAY_CALENDER_ROUTE = "/holiday-calendar";
export const VENDOR_DASHBOARD = "/vendor-process";
export const PRIVACY_POLICY = "/privacy-policy"
export const INITIATED_PROCESSES_ROUTE = "/initiated-processes"
// export const HOME_ROUTE = "/lion-dev-v1/";
export const HOME_ROUTE = "";

export const MAX_DESC_LENGTH = 1500;
export const MAX_PROCESS_TYPE_DESC_LENGTH = 1000;

export const chartRanges = {
  LOWER_RANGE : 'Lower range',
  MID_RANGE : 'Mid range',
  HIGH_RANGE : 'High range'
};

export const chartStatus = {
  PROCESS_TYPES : "PROCESS_TYPES",
  DEPARTMENT: "DEPARTMENT",
  PURCHASE_GROUP: "PURCHASE_GROUP",
  SLA: "SLA"
}

export const userRoles = ["ADMIN", "STAFF", "SUPERVISOR", "VENDOR"]

export const LOGIN_STEPS = {
  login: 'LOGIN',
  forgotPassword: 'FORGOT',
  codeVerify: 'VERIFY',
  resetPassword: 'RESET',
  temporaryPassword: 'TEMPORARY',
  passwordExpire: 'PASSWORD_EXPIRE'
}

export const loginError = {
  vendorId: false,
  password: false
}

export const forgotError = {
  vendorId: false,
  email: false
}

export const resetPassword = {
  newPassword: false,
  reEnterPassword: false
}

export const updatePassword = {
  currentPassword: false,
  newPassword: false,
  reEnterPassword: false
}

export const VENDOR_STATUS = ["ACTIVE","INACTIVE"]

export const PENDING_SUB_STATUS = [
  {label: 'Pending', value: 'Pending'},
  {label: 'Hold', value: 'Hold'}
]

export const COMPLETED_SUB_STATUS = [
  {label: 'Completed', value: 'Completed'},
  {label: 'Rejected', value: 'Rejected'},
];

export const PENDING_EDIT_SUB_STATUS = [
  {label: 'Completed', value: 'Completed'},
  {label: 'Hold', value: 'Hold'},
  {label: 'Rejected', value: 'Rejected'},
];

export const PENDING_EDIT_SUB_STATUS_FOR_HOLD = [
  {label: 'Completed', value: 'Completed'},
  {label: 'Rejected', value: 'Rejected'},
];

export const SUPERVISOR_DASHBOARD_STATUS = [
  {label: 'Pending', value: 'Pending'},
  {label: 'Completed', value: 'Completed'},
]

export const SUPERVISOR_DASHBOARD_PENDING_SUB_STATUS = [
  {label: 'All', value: null},
  {label: 'Pending', value: 'Pending'},
  {label: 'Hold', value: 'Hold'},
]

export const SUPERVISOR_DASHBOARD_COMPLETED_SUB_STATUS = [
  {label: 'All', value: null},
  {label: 'Rejected', value: 'Rejected'},
  {label: 'Completed', value: 'Completed'},
]

export const SUPERVISOR_DASHBOARD_SLA_TYPE = [
  {label: 'All', value: 'SAP,MANUAL'},
  {label: 'SAP', value: 'SAP'},
  {label: 'Manual', value: 'MANUAL'},
]

export const SLA_VISIBLE_TYPES = [
  {label: 'Purchasing Group', value: 'PURCHASING_GROUP'},
  {label: 'Department', value: 'DEPARTMENT'},
]

export const OTP_LENGTH = 5
