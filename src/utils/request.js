import { URL } from "../components/variables"

//---------------GetData-function---------------
export async function GET({ url }) {
  const token = localStorage.getItem('token')
  const headers = {
    Accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  const response = await fetch(`${URL}api/${url}`, {
    method: 'GET',
    headers,
  })

  const responseData = await response.json()

  return {
    response: responseData,
    statusCode: response.status,
  }
}

//---------------PostData-function---------------
export async function POST({ url, body }) {
  const token = localStorage.getItem('token')
  const headers = {
    Accept: 'application/json',
    ...(typeof body === 'string' && { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  const response = await fetch(`${URL}api/${url}`, {
    method: 'POST',
    headers,
    body
  })

  const responseData = await response.json()

  return {
    response: responseData,
    statusCode: response.status,
  }
}

//---------------PutData-function---------------
export async function PUT({ url, body }) {
  const token = localStorage.getItem('token')
  const headers = {
    Accept: 'application/json',
    ...(typeof body === 'object' && { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  const response = await fetch(`${URL}api/${url}`, {
    method: 'PUT',
    headers,
    body
  })

  const responseData = await response.json()

  return {
    response: responseData,
    statusCode: response.status,
  }
}

//---------------DeleteData-function---------------
export async function DELETE({ url }) {
  const token = localStorage.getItem('token')
  const headers = {
    Accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  const response = await fetch(`${URL}api/${url}`, {
    method: 'DELETE',
    headers,
  })

  const responseData = await response.json()

  return {
    response: responseData,
    statusCode: response.status,
  }
}