import { takeLatest, put, select } from 'redux-saga/effects'
import { fetchDbGet, fetchDbPost } from '../../backend/backend'
import { toast } from 'react-toastify'

import {
  changePasswordFailed,
  changePasswordSuccess,
  forgetPasswordFailed,
  forgetPasswordSuccess,
  passwordResetFailed,
  passwordResetSuccess,
  paymentFailed,
  refreshingUser,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
  subscribePlanFailed,
  subscribePlanSuccess,
} from './user.action'
import {
  addingCartItemSuccess,
  clearingCart,
  savingFormToApiAction,
} from '../data/data.action'

// ----------------------------------------------------------
// Helper Functions
// export function* refreshingUser(token, local) {
//   console.log('token')
//   const { user } = yield fetchDbGet(`api/user/data`, token)

//   console.log('user')
// }

// ----------------------------------------------------------

function* gettingCurrentUserStart() {
  const currentUserFromStorage = yield JSON.parse(
    localStorage.getItem('currentUser')
  )
  const currentUserFromSession = yield JSON.parse(
    sessionStorage.getItem('currentUser')
  )
  if (currentUserFromSession) {
    yield put(
      signInSuccess({
        user: currentUserFromSession.user,
        token: currentUserFromSession.token,
      })
    )
  } else if (currentUserFromStorage) {
    yield put(
      signInSuccess({
        user: currentUserFromStorage.user,
        token: currentUserFromStorage.token,
      })
    )
  } else {
    // console.log('No User found')
  }
}
export function* gettingCurrentUser() {
  yield takeLatest('GETTING_USER', gettingCurrentUserStart)
}

// export function* signUpStart({ payload }) {
//   try {
//     const response = yield fetchDbPost('api/register', null, payload)
//     if (response.user) {
//       // toast.dismiss();toast.success(
//       //   'We have sent you a verification link. Kindly Verify yourself before logging in!',
//       //   {
//       //     position: 'top-center',
//       //     autoClose: 55000,
//       //     hideProgressBar: true,
//       //     closeOnClick: false,
//       //     pauseOnHover: true,
//       //     draggable: true,
//       //     progress: undefined,
//       //   }
//       // )
//       yield put(signUpSuccess())
//     } else if (response.error) {
//       for (const key in response.error) {
//         if (response.error.hasOwnProperty(key)) {
//           // console.log(`${key}: ${response.error[key]}`)
//           console.log(response.error[key][0])
//           toast.dismiss()
//           toast.error(response.error[key][0])
//         }
//       }
//       yield put(signUpFailed(response.error))
//     }
//   } catch (err) {
//     yield put(signUpFailed(err.message))
//   }
// }
// export function* signUp() {
//   yield takeLatest('SIGN_UP_START', signUpStart)
// }
// ----------------------------------------------------------

export function* signInStart({ payload }) {
  const state = yield select()
  const cart = state.dataReducer.cart

  const currentUser = state.userReducer.currentUser
  try {
    const response = yield fetchDbPost('api/login', null, {
      email: payload.email,
      password: payload.password,
    })
    if (response.user && response.user.email_verified_at) {
      yield put(
        signInSuccess({
          user: response.user,
          token: response.access_token.plainTextToken,
        })
      )
      yield sessionStorage.setItem(
        'currentUser',
        JSON.stringify({
          user: response.user,
          token: response.access_token.plainTextToken,
        })
      )
      if (payload.keeplogin) {
        yield localStorage.setItem(
          'currentUser',
          JSON.stringify({
            user: response.user,
            token: response.access_token.plainTextToken,
          })
        )
      }
      if (cart.form) {
        // yield put(
        // savingFormToApiAction({ id: response.user.id, form: cart.form })
        // )

        const newresponse = yield fetchDbPost(
          `api/user/submit-legal-form`,
          // response.access_token.accessToken.plainTextToken,
          response.access_token.plainTextToken,
          cart.form
        )
        if (newresponse.status) {
          yield put(addingCartItemSuccess(newresponse.user_legal_form))
          if (newresponse.user_legal_form.status === '2') {
            yield toast.dismiss()
            toast.success(
              `Welcome ${response.user.name}, Your Form has been completed successfully`
            )
            yield put(refreshingUser())
            yield put(clearingCart())
          } else {
            yield toast.dismiss()
            toast.success(`Welcome ${response.user.name}.`)
          }
        } else {
          console.log(newresponse)
          throw Error(newresponse.msg)
        }
      } else {
        yield toast.dismiss()
        toast.success(`Welcome ${response.user.name}`)
      }
    } else if (response.message) {
      toast.dismiss()
      toast.error(response.message)
      yield put(signInFailed(response.message))
    } else if (response.user && !response.user.email_verified_at) {
      toast.dismiss()
      toast.error(
        'Kindly verify your email first. Verify link has sent to this email',
        {
          position: 'top-center',
          autoClose: 55000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
      throw new Error('Email not verified')
    } else {
      toast.dismiss()
      toast.error(response)
      yield put(signInFailed(response))
    }
  } catch (error) {
    yield put(signInFailed(error))
  }
}
export function* signIn() {
  yield takeLatest('SIGN_IN_START', signInStart)
}
// ----------------------------------------------------------

function* signOutStart() {
  const state = yield select()
  const token = state.userReducer.token
  try {
    localStorage.removeItem('currentUser')
    sessionStorage.removeItem('currentUser')
    toast.dismiss()
    toast.success('Logout Successfully')
    yield put(signOutSuccess())
    yield put(clearingCart())
    if (token) {
      yield fetchDbPost('api/logout', token, null)
    }
  } catch (error) {
    yield put(signOutFailed(error))
    yield put(signOutSuccess())
    localStorage.removeItem('currentUser')
    sessionStorage.removeItem('currentUser')
    toast.dismiss()
    toast.success('Logout Successfully')
  }
}
export function* signOut() {
  yield takeLatest('SIGN_OUT_START', signOutStart)
}

// ----------------------------------------------------------

function* changePasswordStart({ payload }) {
  const state = yield select()
  const token = state.userReducer.token
  try {
    const response = yield fetchDbPost('api/user/change_pass', token, payload)
    if (response.status) {
      toast.dismiss()
      toast.success('Password Changed Successfully')
      yield put(changePasswordSuccess())
    } else {
      throw new Error(response.msg)
    }
    // if (response.response === '200') {
    //   toast.dismiss();toast.success(response.status)
    //   yield put(forgetPasswordSuccess())
    // } else if (response.response === '500') {
    //   toast.dismiss();toast.warn(response.message)
    //   yield put(forgetPasswordFailed(response.message))
    // } else {
    //   toast.dismiss();toast.error('No Email Found')
    //   yield put(forgetPasswordFailed())
  } catch (error) {
    toast.dismiss()
    toast.error(error.message)
    yield put(changePasswordFailed(error.message))
  }
}
export function* changePassword() {
  yield takeLatest('CHANGE_PASSWORD_START', changePasswordStart)
}
// ----------------------------------------------------------

function* forgetPasswordStart({ payload }) {
  try {
    const response = yield fetchDbPost('api/forgot-password', null, payload)
    if (response.response === '200') {
      toast.dismiss()
      toast.success(response.status, {
        position: 'top-right',
        autoClose: 55000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      yield put(forgetPasswordSuccess())
    } else {
      toast.dismiss()
      toast.warn(response.message, {
        position: 'top-right',
        autoClose: 55000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      yield put(forgetPasswordFailed())
    }
  } catch (error) {
    yield put(forgetPasswordFailed(error))
  }
}
export function* forgetPassword() {
  yield takeLatest('FORGET_PASSWORD_START', forgetPasswordStart)
}
// ----------------------------------------------------------

function* passwordResetStart({ payload }) {
  try {
    const response = yield fetchDbPost('api/reset-password', null, payload)
    console.log(response)
    if (response.response === '200') {
      yield toast.dismiss()
      toast.success(response.message)
      yield put(passwordResetSuccess())
    } else {
      toast.dismiss()
      toast.error(response.message)

      yield put(passwordResetFailed(response.message))
    }
  } catch (error) {
    yield put(passwordResetFailed(error))
  }
}
export function* passwordReset() {
  yield takeLatest('PASSWORD_RESET_START', passwordResetStart)
}
// ----------------------------------------------------------
function* subscribePlanStart({ payload }) {
  const state = yield select()
  const token = state.userReducer.token
  const uid = state.userReducer.currentUser.id
  try {
    const response = yield fetchDbGet(
      `api/user/subscribe-plan/${uid}/${payload.pid}`,
      token
    )
    if (response.response === '200') {
      yield put(subscribePlanSuccess())
      toast.dismiss()
      toast.success('Plan Has Been Updated !')
    } else {
      yield put(subscribePlanFailed())
    }
  } catch (error) {
    yield put(subscribePlanFailed(error))
  }
}
export function* subscribePlan() {
  yield takeLatest('SUBSCRIBE_PLAN_START', subscribePlanStart)
}
// ----------------------------------------------------------

function* paymentInitialize({ payload }) {
  const state = yield select()
  const token = state.userReducer.token
  const uid = state.userReducer.currentUser.id
  try {
    console.log(payload)
    const response = yield fetchDbPost(`api/user/plan-payment`, token, payload)
    yield put(refreshingUser())
  } catch (error) {
    console.log(error.message)
    yield put(paymentFailed(error.message))
  }
}
export function* paymentStart() {
  yield takeLatest('PAYMENT_START', paymentInitialize)
}
// ----------------------------------------------------------
export function* addCardStart({ payload }) {
  const state = yield select()
  const token = state.userReducer.token
  try {
    const response = yield fetchDbPost(`api/user/create-card`, token, payload)
    if (response.status) {
      toast.dismiss()
      toast.success(response.message)
      yield put(refreshingUser())
    }
  } catch (error) {}
}
export function* addCard() {
  yield takeLatest('ADD_CARD_START', addCardStart)
}
