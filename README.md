# Helicarrier: Engineering Test

This is the solution to the given Engineering test, the project contains two parts, the [gql-server](gql-server) to acts as a server for the client side, it uses [json-graphql-server](https://www.npmjs.com/package/json-graphql-server). I choose to use this because other free solutions I could get online doesn't allow me use my data of choice.

The other part is the [client](client/) folder that contains a react-ts app created with [vite](https://vitejs.dev/).

## Set up
  * Clone the project
  * run `yarn:install` if using yarn or `npm:install` if using npm
  * run `yarn:dev` if using yarn or `npm:dev` if using npm

## Data

I used [JSON generator](https://json-generator.com/) to generate the data with the below json:

```json
[
  '{{repeat(50, 70)}}',
  {
    id: '{{objectId()}}',
    guid: '{{guid()}}',
    status: '{{bool()}}',
    amount: '{{floating(1000, 4000, 2, "$0,0.00")}}',
    accountName: function (tags) {
      var names = ["Marshall Tucker", "Baker Espinoza", "Cynthia Harrell", "Tyson Wells", "Evangeline Ortega", "Desiree Watkins"];
      return names[tags.integer(0, names.length - 1)];
    },
    transferTo: '{{company().toUpperCase()}}',
    type:  function (tags) {
      var types = ['credit', 'debit'];
      return types[tags.integer(0, types.length - 1)];
    },
    descriptions: '{{lorem(1, "paragraphs")}}',
    transactionOn: '{{date(new Date(2022, 0, 1), new Date(2022, 0, 7), "YYYY-MM-ddThh:mm:ss Z")}}'
  }
]
```
then used [this script](gql-server/script.js) to format, i fell it make sense that `accountName` and `accountNumber` etc are same across transactions, also the `transactionOn` is a week range.


## Decisions

Following the scenario given of a page of transactions history is used this data structure below because it's make the app more usable, `status` wasn't very usable has it has no context to the data.

```js
export interface Transaction {
  id: string;
  guid: string;
  status: boolean;
  amount: string;
  accountName: string;
  transferTo: string;
  description: string;
  transactionOn: string;
  phone: string;
  accountNumber: string;
  email: string;
  gender: string;
}
```

The data given from the graphql server is an array to transaction, then the data was formatted and grouped by date and transactions.

To make the search easy extensible, [data in constant](client/src/utils/constant.ts) where created to choose what can be searched through. E.g If the data changes to include `transactionMadeWith` which determines if it was Transfer or Card transaction, it every easy it make in searchable by adding it to the `searchable` export.

Same concepts works for the filters but filter can talk options and the type of input to be rendered, that why more filters can be added with needing to touch the code.