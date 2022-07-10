export const searchable = [
  "amount",
  "accountName",
  "transferTo",
  "type",
  "descriptions",
  "transactionOn",
  "email",
  "accountNumber",
];

export const filterable = [
  {
    name: "Amount",
    key: "amount",
    type: "text",
  },
  {
    name: "Account Number",
    key: "accountNumber",
    type: "number",
  },
  {
    name: "Transfer To",
    key: "transferTo",
    type: "text",
  },
  {
    name: "Gender",
    key: "gender",
    type: "select",
    options: [
      {
        title: "Male",
        value: "male",
      },
      {
        title: "Female",
        value: "female",
      },
    ],
  },
];
