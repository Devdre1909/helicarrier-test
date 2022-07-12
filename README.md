# Helicarrier: Engineering Test

This is the solution to the given Engineering test, the project contains two parts, the [gql-server](gql-server) to act as a server for the client side, it uses [json-graphql-server](https://www.npmjs.com/package/json-graphql-server). I chose to use this because other free solutions I could get online don't allow me use my data of choice.

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
then used [this script](gql-server/script.js) to format, I felt it made sense that `accountName` and `accountNumber` etc are same across transactions, also the `transactionOn` is a week range.


## Decisions

Following the scenario given, a page of transaction history uses the data structure below because it makes the app more usable, `status` wasn't very usable as it has no context to the data.

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

The data given from the graphql server is an array of transactions, then the data was formatted and grouped by date.

To make the search easily extensible, [data in constant](client/src/utils/constant.ts) was created to choose what can be searched through. E.g If the data changes to include `transactionMadeWith` which determines if the transaction was made by transfer or card, it becomes very easy to make it searchable by adding it to the `searchable` export.

Same concepts works for the filters but a filter can take options and the type of input to be rendered, that way more filters can be added without needing to touch the code.

### NB;

While **filter** uses a form of *AND conditional checking* and the values has to fully match e.g filtering `accountNumber` by 3112 won't show any match because it checks for full match, unlike **search**. That will also mean if ``male`` is searched ``female`` will show up since there is ``male`` in ``female``.