import axios from 'axios'

export const getSum = (funds) => {
  return axios.post('http://fund.vmvmvm.me/api', {funds})
}

export const getFundName = (fund) => {
  return axios.post('http://fund.vmvmvm.me/api/get_fund_name', {fund})
}

export const getFundNav = (fund) => {
  return axios.post('http://fund.vmvmvm.me/api/get_fund_nav', {fund})
}

export const getFund = (fund) => {
  return axios.post('/api/get_fund', {fund})
}
