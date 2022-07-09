const fs = require("fs");
const path = require("path");
const jsonTransactions = require("./graphql-server.json");

const account = {
  "Marshall Tucker": {
    accountNumber: 4088978422,
    email: "marvajustice@isosure.com",
    gender: "Female",
    phone: 09123945623,
  },
  "Baker Espinoza": {
    accountNumber: 7165405534,
    email: "serenadillon@zounds.com",
    gender: "Male",
    phone: 08034921121,
  },
  "Cynthia Harrell": {
    accountNumber: 5072026701,
    email: "angelitajohns@speedbolt.com",
    gender: "Female",
    phone: 091880234212,
  },
  "Tyson Wells": {
    accountNumber: 8232293491,
    email: "gallagheroconnor@geekwagon.co",
    gender: "Male",
    phone: 09199331423,
  },
  "Evangeline Ortega": {
    accountNumber: 2303696901,
    email: "glendalawson@zoxy.com",
    gender: "Female",
    phone: 09199332423,
  },
  "Desiree Watkins": {
    accountNumber: 3317162382,
    email: "morenoestes@centrexin.com",
    gender: "Male",
    phone: 08065349232,
  },
};

const updatedTransactions = jsonTransactions.map((value) => ({
  ...value,
  accountNumber: account[value.accountName].accountNumber,
  email: account[value.accountName].email,
  gender: account[value.accountName].gender,
  phone: account[value.accountName].phone,
}));

fs.writeFileSync(
  path.resolve("./graphql-server.js"),
  `module.exports={
    transactions: ${JSON.stringify(updatedTransactions)}
  }`
);
