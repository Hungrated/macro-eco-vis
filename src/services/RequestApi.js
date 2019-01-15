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

export async function getTechChartData () {
  return request('/mock/tech_data.json');
}

export async function searchWithParams () {
  return request('/mock/finance_data.json');
}
