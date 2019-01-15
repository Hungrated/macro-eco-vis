import request from '../utils/request';

export async function getOverviewData () {
  return request('/mock/overview_data.json');
}

export async function getFinanceData () {
  return request('/mock/finance_data.json');
}

export async function getLocalData () {
  return request('/mock/local_data.json');
}
