export const searchable = [
  "amount",
  "accountName",
  "transferTo",
  "type",
  "descriptions",
  "transactionOn",
  "email",
  "gender",
  "accountNumber",
];

export const filterable = [
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
  {
    name: "Type",
    key: "type",
    type: "select",
    options: [
      {
        title: "Credit",
        value: "credit",
      },
      {
        title: "Debit",
        value: "debit",
      },
    ],
  },
];
