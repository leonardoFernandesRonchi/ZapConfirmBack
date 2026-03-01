const {createCustomer, updateCustomer, deleteCustomer, indexCustomer} = require('@services/customerService')

const create = async (req, res, next) => {
    try {
        const {name, phone, email} = req.body;
        const {loggedUser} = req
        const newCustomer = await createCustomer({name, phone, email, loggedUser});
        res.status(201).json({ customer: newCustomer});
    } catch (error){
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const {name, phone, email} = req.body;
        const {loggedUser} = req
        const {customerId} = req.params
        const updatedCustomer = await updateCustomer({name, phone, email, customerId, loggedUser});
        res.status(200).json({ customer: updatedCustomer});
    } catch (error){
        next(error);
    }
}

const destroy = async (req, res, next) => {
    try {
        const {loggedUser} = req
        const {customerId} = req.params
        await deleteCustomer({customerId, loggedUser})
        res.status(204).json({message: "Customer deleted"})
    } catch (error){
        next(error);
    }
}

const index = async (req, res, next) => {
    try {
        const {loggedUser} = req
        const customers = await indexCustomer({loggedUser})
        res.status(200).json({customers})
    } catch (error){
        next(error);
    }
}

module.exports = {create, update, destroy, index}