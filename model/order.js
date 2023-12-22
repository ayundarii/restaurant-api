const mongo = require('../db');

async function insertOrders(orders) {
    try {
        const db = await mongo.connect();
        console.log("Inserting data...");

        //mengisi data book ke table books
        await db.collection("order").insertMany(orders);
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        await mongo.disconnect()
        console.log('finished.')
    }
}

async function getOrders( searchField, search ) {
    try {
        const db = await mongo.connect();
        
        if (searchField && search) {
            return await db
            .collection("order")
            //penggunaan [] pada key di find, untuk mengekstrasi value dari variabel untuk dijadikan key
            .find( { [searchField]:  new RegExp(search, 'i')}, { projection: {} })
            .toArray();
        } else {
            return await db
            .collection("order")
            .find({}, { projection: {} })
            .toArray();
        }
        //mengambil seluruh data menu dari table menus
    } catch (error) {
        console.log(error);
    } finally {
        await mongo.disconnect()
        console.log('finished.')
      }
}

module.exports = { insertOrders, getOrders }