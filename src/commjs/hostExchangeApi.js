const serviceModule = {
  exchangeFCR: {
    url: '/HostExchange/exchangeFCR',
    method: 'post'
  },
  exchangeZJYWSOAP: {
    url: '/HostExchange/exchangeZJYWSOAP',
    method: 'post'
  }
}
const hostExchangeApi = { ...serviceModule }
export default hostExchangeApi

