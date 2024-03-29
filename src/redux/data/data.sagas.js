import { toast } from 'react-toastify'
import { takeLatest, put, select } from 'redux-saga/effects'
import { fetchDbGet, fetchDbPost } from '../../backend/backend'
import { refreshingUser } from '../user/user.action'
// import toast from 'cogo-toast'
import {
  addingCartItemFailed,
  addingCartItemSuccess,
  getSubscriptionsPlansFailed,
  getSubscriptionsPlansSuccess,
  gettingFormFailed,
  gettingFormSuccess,
  gettingUserLegalFormsFailed,
  gettingUserLegalFormsSucces,
} from './data.action'
// -------------------------------------------------------------

function* getSubscriptionsPlansStart() {
  try {
    const plans = JSON.parse(localStorage.getItem('subscription_plans'))
    yield put(getSubscriptionsPlansSuccess(plans))
    const response = yield fetchDbPost('api/get-subscription-plans', null, null)
    if (response.response === '200') {
      yield put(getSubscriptionsPlansSuccess(response.data))
      localStorage.setItem('subscription_plans', JSON.stringify(response.data))
    } else {
      yield put(getSubscriptionsPlansFailed())
      console.log('Failed To Fetch Plans From DB')
    }
  } catch (error) {
    yield put(getSubscriptionsPlansFailed(error))
    console.log('Failed To Fetch Plans From DB')
  }
}
export function* getSubscriptionsPlans() {
  yield takeLatest('GET_SUBSCRIPTION_PLANS_START', getSubscriptionsPlansStart)
}
// -------------------------------------------------------------

function* gettingFormStart({ payload }) {
  try {
    const response = yield fetchDbGet(`api/legal-form-detail/${payload}`, null)
    if (response.status) {
      yield put(gettingFormSuccess(response))
    } else {
      // document.location.href = '/'
      toast.dismiss()
      toast.error(response.msg)
      yield put(gettingFormFailed(response.msg))
    }
  } catch (error) {
    toast.dismiss()
    toast.error(error)
    yield put(gettingFormFailed(error))
  }
}
export function* gettingForm() {
  yield takeLatest('GETTING_FORM_START', gettingFormStart)
}
// -------------------------------------------------------------
function* addingCartItemStart({ payload }) {
  try {
    // yield localStorage.setItem('currentForm', JSON.stringify({ ...payload }))
    yield put(addingCartItemSuccess(payload))
  } catch (e) {
    yield put(addingCartItemFailed(e.message))
  }
}
export function* addingCartItem() {
  yield takeLatest('ADDING_CART_ITEM_START', addingCartItemStart)
}
// -------------------------------------------------------------
function* savingFormInApi({ payload }) {
  const state = yield select()
  const token = state.userReducer.token
  const uid = state.userReducer.currentUser.id
  try {
    const newresponse = yield fetchDbPost(
      `api/user/submit-legal-form`,
      // response.access_token.accessToken.plainTextToken,
      token,
      payload.form
    )
    if (newresponse.status) {
      yield put(addingCartItemSuccess(newresponse.user_legal_form))
      yield put(refreshingUser())
    } else {
      console.log(newresponse)
      throw Error(newresponse.msg)
    }
  } catch (e) {
    console.log(e)
  }
}
export function* savingFormInApiStart() {
  yield takeLatest('SAVING_FORM_TO_API', savingFormInApi)
}
// -------------------------------------------------------------
function* gettingUserLegalForms() {
  const state = yield select()
  const token = state.userReducer.token
  const uid = state.userReducer.currentUser.id
  
  const response = yield fetchDbGet(`api/user/legal-forms`, token)

  try {
    console.log(response)
    if (response.user_legal_forms) {
      yield put(gettingUserLegalFormsSucces(response.user_legal_forms))
    } else {
      throw new Error(response.msg)
    }
  } catch (error) {
    if (response.message == 'Unauthenticated.') {
      console.log(response.message)
    }
    yield put(gettingUserLegalFormsFailed(error.message))
    console.log('error.message')
    console.log(error.message)
  }
}
export function* gettingUserLegalFormsStart() {
  yield takeLatest('GETTING_USER_LEGAL_FORMS_START', gettingUserLegalForms)
}
