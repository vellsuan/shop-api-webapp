import {
  CHECK_IN_OUT_INFO,
  SELECT_TOUR_CODE,
  ROOM_DETAILS,
  IS_USE_INVOICE,
  INVOICE_TYPE,
  INVOICE_CONTENT,
  ORDER_CONTENT,
  RESET_STATE
} from './mutation-types.js'



export default {
  [CHECK_IN_OUT_INFO] (state, checkInOutInfo) {
    state.checkInOutInfo.checkinDate = checkInOutInfo.checkinDate
    state.checkInOutInfo.checkoutDate = checkInOutInfo.checkoutDate
    state.checkInOutInfo.startTime = checkInOutInfo.startTime
  },
  [SELECT_TOUR_CODE] (state, selectTourCode) {
    state.selectTourCode = selectTourCode
  },
  [ROOM_DETAILS] (state, roomDetails) {
    state.roomDetails = roomDetails
  },
  [IS_USE_INVOICE] (state, isUseInvoice) {
    state.isUseInvoice = isUseInvoice
  },
  [INVOICE_TYPE] (state, invoiceType) {
    state.invoiceType = invoiceType
  },
  [INVOICE_CONTENT] (state, invoiceContent) {
    state.invoiceContent = invoiceContent
  },
  [ORDER_CONTENT] (state, orderContent) {
    state.orderContent = orderContent
  },
  [RESET_STATE] (state) {
      Object.assign(state,JSON.parse(localStorage.state))
  }
}