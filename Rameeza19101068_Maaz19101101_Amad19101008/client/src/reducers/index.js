import { combineReducers } from 'redux'
import auth from './auth'
import alert from './alert'

import dashboard from './dashboard'
import user from './user'
import pages from './pages'
import product from './product'
import customer from './customer'
import rentproduct from './rentproduct'
import returnproduct from './returnproduct'
import appointment from './appointment'
import report from './report'
import invoice from './invoice'
import alternotes from './alternotes';
import coupons from './coupons'
import events from './events'

export default combineReducers({
  alert,
  auth,
  pages,
  user,
  product,
  customer,
  rentproduct,
  returnproduct,
  appointment,
  report,
  dashboard,
  invoice,
  alternotes,
  coupons,
  events
})
