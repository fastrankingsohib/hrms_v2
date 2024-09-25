import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import auth_routes from './routes/auth_routes.js'
import hr_routes from './routes/job_post_routes.js'
const app =express()
const port = 4040
app.use(cookieParser())

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',auth_routes)
app.use('/',hr_routes)




app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})