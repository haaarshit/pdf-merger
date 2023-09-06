const express = require('express')
const app = express()
let path = require('path')
const port = 3000
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { merge_pdfs } = require('./merge')
app.use('/static', express.static('public'))//to serve static files in js

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    console.log(req.files[0])
    console.log(req.files[1])
    let mergedFile = await merge_pdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.sendFile(path.join(__dirname, `public/${mergedFile}.pdf`))
})

app.get('/clear', async (req, res) => {
    const data = fs.readdirSync(path.resolve(__dirname, "uploads"), (err) => {
        console.log(err)
    })
    const pdfs = fs.readdirSync(path.resolve(__dirname, "public"), (err) => {
        console.log(err)
    })
    data.forEach(f=>{

        fs.unlink(path.resolve(__dirname,`uploads/${f}`),(e)=>{
          console.log(e)            
        })
    })
    pdfs.forEach(p => {
        fs.unlink(path.resolve(__dirname, `public/${p}`), (e) => {
            console.log(e)
        })
    })
    
    res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.listen(port, () => {
    console.log(`Example app listening on port  http://localhost:${port}`)
})