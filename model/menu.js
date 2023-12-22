const mongo = require('../db');

//fungsi memasukkan data ke table menus
async function insertMenu(menus) {
    try {
        const db = await mongo.connect();
        console.log("Inserting data...");

        //mengisi data menu ke table menu
        await db.collection('menu').insertMany(menus);        
    } catch (error) {
        console.log(error);
        throw error
    } finally {
        await mongo.disconnect()
        console.log('finished.')
      }
}

//fungsi mengambil data dari table menus
async function getMenu( searchField, search ) {
    try {
        const db = await mongo.connect();
        
        if (searchField && search) {
            return await db
            .collection("menu")
            //penggunaan [] pada key di find, untuk mengekstrasi value dari variabel untuk dijadikan key
            .find( { [searchField]:  new RegExp(search, 'i')}, { projection: {} })
            .toArray();
        } else {
            return await db
            .collection("menu")
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

//fungsi mengambil 1 data dari table menu
async function fetchOneMenu( id ) {
    try {
        const db = await mongo.connect();

        return await db
            .collection("menu")
            .find({id: id}, { projection: {} })
            .toArray();
        
    } catch (error) {
        console.log(error);
    } finally {
        await mongo.disconnect()
        console.log('finished.')
      }
}

//fungsi mengupdate data di table menu
async function updateMenu(menu) {

    try {
        const db = await mongo.connect();
        console.log("Update data...");

        await db.collection("menu").updateOne(
            { id: menu.id },
            {
                $set: {
                   nama: menu.nama,
                   deskripsi: menu.deskripsi,
                   harga:  menu.harga
                }
            }
        )
        return "data updated"
    } catch (error) {
        console.log(error);
    } finally {
        await mongo.disconnect()
        console.log('finished.')
      }
}

async function deleteMenu(id) {

    try {
        const db = await mongo.connect();
        console.log("Delete data...");

        await db.collection("menu").deleteOne(
            { id: id }
        )
        return "data deleted"
    } catch (error) {
        console.log(error);
    } finally {
        await mongo.disconnect()
        console.log('finished.')
      }
}

//mengekspor fungsi-fungsi agar dapat dipakai di file lain yang mengimport book
module.exports = { insertMenu, getMenu, updateMenu, fetchOneMenu, deleteMenu }