/* ============================================================
   📦 LOCAL STORAGE UTIL for SAVED ADDRESSES
   Key: pharma_addresses
   ============================================================ */

const STORAGE_KEY = "pharma_addresses";

/* -------------------- LOAD -------------------- */
export function loadAddresses() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

/* -------------------- SAVE -------------------- */
export function saveAddresses(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("storage"));
}

/* -------------------- ADD -------------------- */
export function addAddressLocal(addr) {
  const list = loadAddresses();
  list.unshift(addr); // newest first
  saveAddresses(list);
}

/* -------------------- UPDATE -------------------- */
export function updateAddressLocal(id, data) {
  const list = loadAddresses().map((a) =>
    a.id === id ? { ...a, ...data } : a
  );
  saveAddresses(list);
}

/* -------------------- DELETE -------------------- */
export function removeAddress(id) {
  const list = loadAddresses().filter((a) => a.id !== id);
  saveAddresses(list);
}

/* -------------------- SET PRIMARY -------------------- */
export function setPrimaryAddress(id) {
  let list = loadAddresses();

  list = list.map((a) => ({
    ...a,
    primary: a.id === id,
  }));

  saveAddresses(list); // ✅ FIXED
}

/* -------------------- GET PRIMARY -------------------- */
export function getPrimaryAddress() {
  const list = loadAddresses();
  return list.find((a) => a.primary) || list[0] || null;
}

/* ============================================================
   TEMP STORAGE FOR LAST MAP LOCATION
============================================================ */

const MAP_KEY = "pharma_last_map_location";

export function saveLastMapLocation(loc) {
  localStorage.setItem(MAP_KEY, JSON.stringify(loc));
}

export function loadLastMapLocation() {
  return JSON.parse(localStorage.getItem(MAP_KEY)) || null;
}


/* ============================================================
   🎤 VOICE INSTRUCTION TEMP STORAGE
   Key: pharma_voice_instructions
   ============================================================ */

const VOICE_KEY = "pharma_voice_instructions";

/* Save voice text */
export function saveVoiceInstruction(text) {
  localStorage.setItem(VOICE_KEY, text);
  window.dispatchEvent(new Event("storage"));
}

/* Load voice text */
export function loadVoiceInstruction() {
  return localStorage.getItem(VOICE_KEY) || "";
}

/* Clear voice text after use */
export function clearVoiceInstruction() {
  localStorage.removeItem(VOICE_KEY);
}
