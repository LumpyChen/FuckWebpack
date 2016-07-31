import { takeLatest } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'

export function getData() {
  console.log('getData begins')
  return fetch('/api/chipData')
    .then(res => res.json())
}

export function* fetchChipData() {
  try {
    const res = yield call(getData)
    console.log(res)
    yield put({ type: 'CHIPDATA_RECEIVED', chipData: res })
  } catch (err) {
    yield put({ type: 'CHIPDATA_RECEIVED', chipData: [{
      key: 0,
      label: err.toString(),
    }] })
  }
}

function* watchResetData() {
  yield takeLatest('RESET_DATA', fetchChipData)
}

export function* helloSaga() {
  console.log('Sagas begin!')
}

export default function* rootSaga() {
  yield [
    helloSaga(),
    watchResetData(),
  ]
}
