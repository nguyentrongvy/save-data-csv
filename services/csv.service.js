const axios = require('axios');
const Customer = require('../models/Customer');
const { dataCSV } = require('../constants');

exports.saveDataCSV = async () => {
    const url = '';
    let result = await axios.get(url);

    let promises = [];
    for (const cus of result) {
        const customer = new Customer();
        customer.customer_id = cus.customer_id;

        promises.push(customer.save());

        if (promises.length === 100) {
            await Promise.all(promises);
            promises = [];
        }
    }

    if (promises.length === 0) return;
    
    return Promise.all(promises);
};