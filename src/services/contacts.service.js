function makeContactsService() {
  const baseUrl = "/api/contacts";
  const headers = {
    "Content-Type": "application/json",
  };
  async function getContacts(page, limit = 5) {
    let url = `${baseUrl}?page=${page}&limit=${limit}`;
    return await fetch(url).then((res) => {
      return res.json();
    });
  }
  async function createContact(contact) {
    return await fetch(baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(contact),
    }).then((res) => res.json());
  }
  async function deleteAllContacts() {
    return await fetch(baseUrl, {
      method: "DELETE",
    }).then((res) => res.json());
  }
  async function getContact(id) {
    return await fetch(`${baseUrl}/${id}`).then((res) => res.json());
  }
  async function updateContact(id, contact) {
    return await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(contact),
    }).then((res) => res.json());
  }
  async function deleteContact(id) {
    return await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }
  return {
    getContacts,
    deleteAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
  };
}
export default makeContactsService();
