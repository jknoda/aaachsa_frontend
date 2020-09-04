import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import consts from '../consts'
const BASE_URL = consts.API_URL // 'http://localhost:3003/api'
const EmpIdf = {EmpIdf:1}

export function getSummary() {
    const request = axios.post(`${BASE_URL}/general/summary`, EmpIdf)
    return {
        type: 'AAACHSA_SUMMARY_FETCHED',
        payload: request
    }
}

