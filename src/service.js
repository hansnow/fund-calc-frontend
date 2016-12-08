import axios from 'axios'

export const getSum = (funds) => {
  return axios.post('/api', {funds})
}

export const getFundName = (fund) => {
  return axios.post('/api/get_fund_name', {fund})
}
