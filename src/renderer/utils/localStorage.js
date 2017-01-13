function getStorage(name) {
  const storage = window.localStorage;
  if (storage.getItem(name)) {
    return JSON.parse(storage.getItem(name));
  } else {
    return false;
  }
}

function setStorage(name, storage) {
  window.localStorage.setItem(name, JSON.stringify(storage));
}

function resetStorage(name) {
  const storage = window.localStorage.getItem(name);

  if (storage) {
    window.localStorage.removeItem(name);
  }
}

export {
  getStorage,
  setStorage,
  resetStorage,
};
