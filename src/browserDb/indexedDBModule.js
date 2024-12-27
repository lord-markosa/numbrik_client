import {
    ADMIN_QUESTION_IDB_STORE,
    PROGRESS_IDB_STORE,
    RESPONSES_IDB_STORE,
    SOLVED_IDB_STORE,
    UNSOLVED_IDB_STORE,
} from "../constants/constants";

// This function opens a connection to the IndexedDB
function openDB(dbName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 6);

        request.onupgradeneeded = (event) => {
            let db = event.target.result;
            [
                SOLVED_IDB_STORE,
                UNSOLVED_IDB_STORE,
                RESPONSES_IDB_STORE,
                PROGRESS_IDB_STORE,
                ADMIN_QUESTION_IDB_STORE,
            ].forEach((storeName) => {
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName);
                }
            });
        };

        request.onerror = (event) => {
            reject(new Error(`IndexedDB error: ${event.target.errorCode}`));
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

// Write data to the IndexedDB
async function addToDB(
    dbName,
    storeName,
    objects /* [{object: {}, key: "xyz"}] */
) {
    const db = await openDB(dbName);
    const transaction = db.transaction([storeName], "readwrite");
    const objectStore = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
        objects.forEach(({ key, object }) => {
            objectStore.put(object, key);
        });

        transaction.onerror = (event) => {
            reject(event.target.error);
        };

        transaction.oncomplete = () => {
            resolve();
        };
    });
}

// Get data from the IndexedDB using a cursor
async function getFromDBWithCursor(dbName, storeName, boundKeyRange) {
    const db = await openDB(dbName);
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
        const request = store.openCursor(boundKeyRange);
        const objects = [];

        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                objects.push(cursor.value);
                cursor.continue();
            } else {
                resolve(objects);
            }
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

// Get all data from the IndexedDB
async function getAllFromDB(dbName, storeName) {
    const db = await openDB(dbName);
    const transaction = db.transaction([storeName], "readonly");
    const objectStore = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
        const request = objectStore.getAll();
        request.onerror = (event) => {
            reject(new Error(`Read error: ${event.target.errorCode}`));
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

// Get data from the IndexedDB by ID
async function getByIdFromDB(dbName, storeName, id) {
    const db = await openDB(dbName);
    const transaction = db.transaction([storeName], "readonly");
    const objectStore = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
        const request = objectStore.get(id);
        request.onerror = (event) => {
            reject(new Error(`Read error: ${event.target.errorCode}`));
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

// Remove data from the IndexedDB by ID
async function removeFromDB(dbName, storeName, id) {
    const db = await openDB(dbName);
    const transaction = db.transaction([storeName], "readwrite");
    const objectStore = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
        const request = objectStore.delete(id);
        request.onerror = (event) => {
            reject(new Error(`Delete error: ${event.target.errorCode}`));
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

export function clearIndexedDB(dbName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(dbName);

        request.onsuccess = () => {
            console.log(`Database ${dbName} deleted successfully`);
            resolve();
        };

        request.onerror = (event) => {
            console.error(
                `Error deleting database ${dbName}:`,
                event.target.errorCode
            );
            reject(
                new Error(
                    `Error deleting database ${dbName}: ${event.target.errorCode}`
                )
            );
        };

        request.onblocked = () => {
            console.warn(`Deletion of database ${dbName} is blocked`);
            reject(new Error(`Deletion of database ${dbName} is blocked`));
        };
    });
}

// Modify data in the IndexedDB by ID
// async function updateInDB(dbName, storeName, data) {
//     const db = await openDB(dbName, storeName);
//     const transaction = db.transaction([storeName], "readwrite");
//     const objectStore = transaction.objectStore(storeName);

//     return new Promise((resolve, reject) => {
//         const request = objectStore.put(data);
//         request.onerror = (event) => {
//             reject(new Error(`Update error: ${event.target.errorCode}`));
//         };
//         request.onsuccess = (event) => {
//             resolve(event.target.result);
//         };
//     });
// }

export {
    addToDB,
    getByIdFromDB,
    getAllFromDB,
    getFromDBWithCursor,
    removeFromDB,
    // updateInDB,
};
