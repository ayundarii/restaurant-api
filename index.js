// ctrl + ` => memunculkan terminal

const express = require('express')
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const menu = require('./model/menu')
const order = require('./model/order')

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/menus", async (req, res) => {
    const { searchField, search } = req.query

    const menus = await menu.getMenu(searchField, search);

    res.json(menus);
})

app.get("/menus/:id", async (req, res) => {
    const id = parseInt(req.params.id)

    const _menu = await menu.fetchOneMenu(id);

    //jika menu tidak ada
    if (_menu === null) {
        res.status(404)
        res.json('Menu tidak ditemukan')
        return
    }

    res.json(_menu);
})

app.put("/menus/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    console.log(req.body)
    const { nama, harga, deskripsi } = req.body
    
    try {

        //pengecekan
        if (nama === "") {
            res.status(422)
            res.json("Nama tidak boleh kosong!")
            return
        }

        if (deskripsi === "") {
            res.status(422)
            res.json("Deskripsi tidak boleh kosong!")
            return
        }

        if (harga === null) {
            res.status(422)
            res.json("Harga tidak boleh kosong!")
            return
        }

        // mencari menu terlebih dahulu yang mau diupdate
        const thatMenu = await menu.fetchOneMenu(id)

        //cek jika menunya tidak ada, memakai array indeks pertama karena hasil fetch data berupa to array
        if (thatMenu[0] === null) {
            res.status(404)
            res.json("Menu tidak ditemukan.")
            return
        }

        // di validasi dulu
        if (nama) {
            thatMenu[0].nama = nama
        }

        if (deskripsi) {
            thatMenu[0].deskripsi = deskripsi
        }

        if (harga) {
            thatMenu[0].harga = harga
        }

        await menu.updateMenu(thatMenu[0])

        res.json(thatMenu[0]);
    } catch (error) {
        console.log(error)
        res.status(422)
        res.json('tidak dapat update')
    }

})

app.put("/menus/:id/discount", async (req, res) => {
    const id = parseInt(req.params.id)
    console.log(req.body)
    const { discount } = req.body
    console.log(discount)
    
    try {
        if (discount === null) {
            res.status(422)
            res.json("Discount tidak boleh kosong!")
            return
        }

        // mencari menu terlebih dahulu yang mau diupdate
        const thatMenu = await menu.fetchOneMenu(id)

        //cek jika menunya tidak ada, memakai array indeks pertama karena hasil fetch data berupa to array
        if (thatMenu[0] === null) {
            res.status(404)
            res.json("Menu tidak ditemukan.")
            return
        }

        // di validasi dulu
        if (discount != null) {
            console.log(thatMenu[0].harga)
            thatMenu[0].harga *= (100 - discount) / 100;
        }

        console.log("Diskon sebesar "+ discount + "% diberikan.")
        await menu.updateMenu(thatMenu[0])

        res.json(thatMenu[0]);
    } catch (error) {
        console.log(error)
        res.status(422)
        res.json('tidak dapat update')
    }

})

app.post("/menus", async (req, res) => {
    try {
        const menus = req.body

        for (let i = 0; i < menus.length; i++) {
            const nama = menus[i].nama
            if (!nama || nama === "") {
                res.status(422).send("Nama harus diisi!")
                return
            }
            const deskripsi = menus[i].deskripsi
            if (!deskripsi || deskripsi === "") {
                res.status(422).send("Deskripsi harus diisi!")
                return
            }
            const harga = menus[i].harga
            if (!harga || harga === "") {
                res.status(422).send("Harga harus diisi!")
                return
            }
        }

        const _menus = await menu.insertMenu(menus)
        res.status(201)
        res.json(_menus);
        console.log("Menu berhasil dibuat.")
    } catch (error) {
        res.status(422)
        res.json(`Menu dengan id tersebut sudah ada`)
    }
})

app.delete("/menus/:id", async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        // mencari buku terlebih dahulu yang mau diupdate
        const thatMenu = await menu.fetchOneMenu(id)

        //cek jika bukunya tidak ada, memakai array indeks pertama karena hasil fetch data berupa to array
        if (thatMenu[0] === null) {
            res.status(404)
            res.json("Menu tidak ditemukan!")
            return
        }

        await menu.deleteMenu(id)
        res.json("Menu berhasil di delete.");
        console.log("Menu berhasil di delete.")
    } catch (error) {
        res.status(422)
        res.json('Tidak dapat delete menu')
    }

})

app.post("/orders", async (req, res) => {
    try {
        const orders = req.body

        for (let i = 0; i < orders.length; i++) {
            const customerID = orders[i].customerID
            if (!customerID || customerID === "") {
                res.status(422).send("CustomerID tidak boleh kosong")
                return
            }
           
            const menus = orders[i].menus
            if (menus.length === 0) {
                res.status(422).send("Menus tidak boleh kosong")
                return
            }
        }

        const _orders = await order.insertOrders(orders)
        res.status(201)
        res.json(_orders);
    } catch (error) {
        res.status(422)
        res.json(`Menu dengan id tersebut sudah ada`)
    }
})

app.get("/orders", async (req, res) => {
    const { searchField, search } = req.query

    const orders = await order.getOrders(searchField, search);

    res.json(orders);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});