/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL = "https://testing-vv1b.onrender.com"
  //process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

//lists tables
export async function listTables(signal){
  const url = `${API_BASE_URL}/tables`;
  return await fetchJson(url,{
    method:"GET",
    headers,
    signal
  })
}

// creats new reservation
export async function createReservation(reservation,signal){
  reservation = formatReservationDate(reservation);
  reservation = formatReservationTime(reservation);
    const json = {
      "first_name":reservation.first_name,
      "last_name":reservation.last_name,
      "mobile_number":reservation.mobile_number,
      "reservation_date":reservation.reservation_date,
      "reservation_time":reservation.reservation_time,
      "people":Number(reservation.people)
    }
    const url = `${API_BASE_URL}/reservations`;
    return await fetchJson(url,
      {
        method: "POST",
        headers,
        body:JSON.stringify({data:json}),
        signal
      },{});
    }


// creates new table
export async function createTable(table,signal){
  let json = {"table_name":table.table_name,"capacity":Number(table.capacity)}
  const url = `${API_BASE_URL}/tables`
  return await fetchJson(url,{
    method:"POST",
    headers,
    body: JSON.stringify({data:json}),
    signal
  },{});
}


// gets reservation baced on id
export async function getReservation(reservationId,signal){
  const url =`${API_BASE_URL}/reservations/${reservationId}`
  return await fetchJson(url,{signal});
}


//seats the table 
export async function seatTable(table_id,reservation_id,signal){
  const url =`${API_BASE_URL}/tables/${table_id}/seat`
  let json = {"reservation_id":Number(reservation_id)};
  return await fetchJson(url,{
    method:"PUT",
    headers,
    body:JSON.stringify({data:json}),
    signal
  })
}

// un seats table
export async function finishTable(table_id,signal){
  const url =`${API_BASE_URL}/tables/${table_id}/seat`;
  return await fetchJson(url,{
    method:"DELETE",
    signal
  })
}

//updates the reservation
export async function updateReservation(reservation,signal){
  reservation = {...reservation, people:Number(reservation.people)}
  const url = `${API_BASE_URL}/reservations/${reservation.reservation_id}`;
  return await fetchJson(url,{
    method:"PUT",
    headers,
    body:JSON.stringify({data:reservation}),
    signal
  })
}

//deletes the reservation
export async function deleteReservation(reservation_id,signal){
  const url = `${API_BASE_URL}/reservations/${reservation_id}`
  return await fetchJson(url,{
    method:"DELETE",
    headers,
    signal
  })
}

export async function setStatus(reservation_id,status,signal){
  const url =`${API_BASE_URL}/reservations/${reservation_id}/status`;
  return await fetchJson(url,{
    method:"PUT",
    headers,
    body: JSON.stringify({data:{status}}),
    signal
  })
}