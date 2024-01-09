// Retrieve todos from database
export const getLocalStorage = (name) => {
    if (!name) {
        throw new Error("Localstorage name is missing")
    }
    return JSON.parse(localStorage.getItem(name)) || [];
}
//Store todos in the database
export const setLocalStorage = (name, newData) => {
    if (!name) {
        throw new Error(`Local storage name ${name} is missing ...`)
    }
    if (!newData) {
        throw new Error(`${newData} is missing ...`)
    }
    localStorage.setItem(name, JSON.stringify(newData))
}
