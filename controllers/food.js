const User = require('../models/user');


const index = async (req, res) => {

    try {
        const currentUser = await User.findById(req.params.userId);
        res.render('foods/index.ejs', {
            title: "My Pantry", pantry: currentUser.pantry
        })


    } catch (error) {
        console.log(error);
        res.redirect('/')
    }

}
const newFood = (req, res) => {
    try {

        res.render('foods/new.ejs', {

            title: "Add new food"
        })



    } catch (error) {
        console.log(error);
        res.redirect('/')
    }



}

const createfood = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);

    }

    catch (error) {
        console.log(error);
        res.redirect('/');

    }


}

const showPantry = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const itemId = await currentUser.pantry.id(req.params.itemId)
        res.render('foods/show.ejs', {
            title: 'your pantry',
            itemId
        })

    } catch (error) {
        console.log(error);
    }


}

const deleteFood = async (req, res) => {
    try {


        const currentUser = await User.findById(req.params.userId);
        currentUser.pantry.id(req.params.itemId).deleteOne();
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`);
    }
    catch (error) {
        console.log(error)
        res.redirect('/')
    }

}

const edit = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const itemId = currentUser.pantry.id(req.params.itemId);
        res.render('foods/edit.ejs', {
            title: "edit your food",
            itemId,

        })
    }
    catch (error) {
        console.log(error)
        res.redirect('/');
    }



}

const updateFood = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const updatedFood = await currentUser.pantry.id(req.params.itemId)
        updatedFood.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods/${req.params.itemId}`);
    }
    catch (error) {
        console.log(error);
        res.redirect('/');
    }

}

module.exports = {
    index,
    createfood,
    newFood,
    showPantry,
    deleteFood,
    edit,
    updateFood,

}