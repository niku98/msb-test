import Calendar from "antd/es/calendar/locale/en_US";
import DatePicker from "antd/es/date-picker/locale/en_US";
import type { Locale } from "antd/es/locale";
import TimePicker from "antd/es/time-picker/locale/en_US";
import Pagination from "rc-pagination/lib/locale/en_US";

const typeTemplate = "${label} is invalid format";

const antViLocale: Locale = {
  locale: "en",
  Pagination: { ...Pagination, page: "" },
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: "Please choose",
  },
  Table: {
    filterTitle: "Filter",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filter",
    emptyText: "No data",
    selectAll: "Select all",
    selectInvert: "Select invert",
    selectNone: "De-select all",
    selectionAll: "Select all",
    sortTitle: "Sort",
    expand: "Expand",
    collapse: "Collapse",
    triggerDesc: "Sort descend",
    triggerAsc: "Sort ascend",
    cancelSort: "Cancel sort",
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK",
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel",
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "De-select current page",
    selectAll: "Select all",
    removeAll: "Remove all",
    selectInvert: "Select invert",
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload file failure",
    previewFile: "Preview",
    downloadFile: "Download",
  },
  Empty: {
    description: "No data",
  },
  Icon: {
    icon: "icon",
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand",
  },
  PageHeader: {
    back: "Back",
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "${label} is invalid",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "Please enter ${label}",
      date: {
        format: "${label} is not date format",
        parse: "${label} cannot convert to date format",
        invalid: "${label} is invalid",
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
      },
      string: {
        len: "${label} must have ${len} character(s)",
        min: "${label} must have minimum ${min} character(s)",
        max: "${label} must have maximum ${max} character(s)",
        range: "${label} have have from ${min} to ${max} character(s)",
      },
      number: {
        len: "${label} must equal ${len}",
        min: "${label} must larger ${min}",
        max: "${label} must smaller ${max}",
        range: "${label} must be in range ${min}-${max}",
      },
      array: {
        len: "Must have ${len} ${label}",
        min: "Must have minimum ${min} ${label}",
        max: "Must have maximum ${max} ${label}",
        range: "${label}'s length must be in range ${min}-${max}",
      },
      pattern: {
        mismatch: "${label} is invalid",
      },
    },
  },
  Image: {
    preview: "Preview",
  },
};

export default antViLocale;
