const API_BASE_URL =
   process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

   const headers = new Headers();
 headers.append("Content-Type", "application/json");

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

  export async function listproperties( signal ) {
    const url = new URL(`${API_BASE_URL}/properties`);
    return await fetchJson(url, { headers, signal }, [])
  }

  export async function updatepropertytobuy( property_Id, signal) {
    const url = `${API_BASE_URL}/properties/${property_Id}`;
    const options = {
      method: "PUT",
      headers,
      body: JSON.stringify({ data: {status: 'buy'} }),
      signal,
    };
    let result = await fetchJson(url, options, {});
    return result
  }

  export async function updatepropertytonobuy( property_Id, signal) {
    const url = `${API_BASE_URL}/properties/${property_Id}`;
    const options = {
      method: "PUT",
      headers,
      body: JSON.stringify({ data: {status: 'notbuy'} }),
      signal,
    };
    let result = await fetchJson(url, options, {});
    return result
  }

  export async function updatepropertytomaybe( property_Id, signal) {
    const url = `${API_BASE_URL}/properties/${property_Id}`;
    const options = {
      method: "PUT",
      headers,
      body: JSON.stringify({ data: {status: 'maybe'} }),
      signal,
    };
    let result = await fetchJson(url, options, {});
    return result
  }