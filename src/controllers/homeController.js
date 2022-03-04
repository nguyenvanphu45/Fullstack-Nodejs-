import db from '../models/index'
import CRUDSevice from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch(e) {
        console.log(e)
    }
        
}

let getCRUD = async (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDSevice.createNewUser(req.body)
    console.log(message)
    return res.send('Helloooo')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDSevice.getAllUser()
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDSevice.getUserInfoById(userId)
        
        return res.render('editCRUD.ejs', {
            user: userData
        })
    } else {
        return res.send('User not found!')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUser = await CRUDSevice.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await CRUDSevice.deleteUserById(id)
        return res.send('Delele the user success')
    }else {
        return res.send('User not found')
    }
    
    
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}