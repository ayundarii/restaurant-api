const mongo = require('../db');

// untuk menambahkan data atau seeding
async function seedMenu() {
    try {
        const db = await mongo.connect();
        console.log("Inserting data...");

        //fill data
        await db
            .collection("menu")
            .insertMany([
                {
                    id: 1,
                    nama: "Nasi Goreng",
                    deskripsi: "Nasi goreng enak!",
                    harga: 7000
                },
                {
                    id: 2,
                    nama: "Ayam Goreng",
                    deskripsi: "Ayam Goreng enak!",
                    harga: 8000
                },
                {
                    id: 3,
                    nama: "Capcay",
                    deskripsi: "Capcay enak!",
                    harga: 6000
                },
                {
                    id: 4,
                    nama: "Es Teh",
                    deskripsi: "Minuman segar",
                    harga: 3000
                },
            ]);

        //close koneksi db 
        await mongo.disconnect()
    } catch (error) {
        console.log(error);
    }
}

async function seedUser() {
    try {
        const db = await mongo.connect();
        console.log("Inserting data...");

        //fill data
        await db
            .collection("user")
            .insertMany([
                {
                    id: 1,
                    role: 1,
                    username: "admin"
                },
                {
                    id: 2,
                    role: 2,
                    username: "customer",
                    saldo: 0
                },
                {
                    id: 3,
                    role: 3,
                    username: "waiter"
                },
            ]);

        //close koneksi db 
        await mongo.disconnect()
    } catch (error) {
        console.log(error);
    }
}

async function seedOrder() {
    try {
        const db = await mongo.connect();
        console.log("Inserting data...");

        //fill data
        await db
            .collection("order")
            .insertMany([
                {
                    id: 1,
                    customerID: 2,
                    menuID: 1,
                    menu: [
                        
                    ]
                },
                {
                    id: 1,
                    customerID: 2,
                    menuID: 4,
                    menu: []
                }
            ]);

        //close koneksi db 
        await mongo.disconnect()
    } catch (error) {
        console.log(error);
    }
}

// seedMenu()
// seedUser()