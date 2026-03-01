const {Customer, User} = require("@models");
const {FieldRequiredError, AlreadyTakenError} = require("@helpers/customErrors")


async function createCustomer({name, phone, email, loggedUser}) {
    const userCustomer = await Customer.findOne({
        where: {
            userId: loggedUser.id,
            email: email
        }
    })
    if (userCustomer) throw new AlreadyTakenError("Customer", "try updating it instead")
    if(!name) throw new FieldRequiredError("Name")
    if(!email) throw new FieldRequiredError("Email")
    if(!phone) throw new FieldRequiredError("Phone")
    
    const customer = await Customer.create({
        email: email,
        userId: loggedUser.id,
        phone: phone,
        name: name
    })

    
    return customer

}

async function updateCustomer({name, phone, email, customerId, loggedUser}) {
    const customer = await Customer.findOne({
        where: {
            id: customerId,
            userId: loggedUser.id
        }
    });

    const updatedCustomer = await customer.update({
        name: name,
        phone: phone,
        email: email
    })

    return updatedCustomer
}

async function deleteCustomer({customerId, loggedUser})
{
    const customer = await Customer.findOne({
        where: {
            id: customerId,
            userId: loggedUser.id
        }
    });

    customer.destroy()
}

async function indexCustomer ({loggedUser})
{
    const user = await User.findOne({
        where: {
            id: loggedUser.id
        },
        include: Customer,
    })
   return user.Customers
}
module.exports = {createCustomer, updateCustomer, deleteCustomer, indexCustomer}