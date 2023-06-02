// Import all libraries and components
import * as React from "react";

// Sets the data type for each variable
export interface Wallet {
    walletId: string,
    walletName: string,
    walletType: string,
    description: string,
    balance: number,
    userId: string,
    transactions: Transaction[],
}

// Sets the data type for each transaction
export interface Transaction {
    date: string,
    amount: number;
}

// Wallet array
export const Wallets: Wallet[] = [
    {
        walletId: "1",
        walletName: "Wallet name 1",
        walletType: "PERSONAL",
        userId: "Jane",
        description: "Description. Lorem ipsum dolor sit amet consectetur. Nisl sollicitudin aliquam quam. ",
        balance: 400,
        transactions: [
            {
                date: "Jan 25, 2023",
                amount: +200
            },
            {
                date: "Feb 10, 2020",
                amount: -100
            },
            {
                date: "Apr 3, 2021",
                amount: +530
            },
            {
                date: "Oct 4, 2020",
                amount: -50
            },
            {
                date: "Feb 10, 2020",
                amount: -100
            },
            {
                date: "Apr 3, 2021",
                amount: +530
            },
            {
                date: "Oct 4, 2020",
                amount: -50
            },
            {
                date: "Feb 10, 2020",
                amount: -100
            }
        ]
    },
    {
        walletId: "2",
        walletName: "Wallet name 2",
        walletType: "PROGRAM NAME",
        userId: "John",
        description: "Description. Lorem ipsum dolor sit amet consectetur. Nisl sollicitudin aliquam quam. ",
        balance: 230,
        transactions: [
            {
                date: "Dec 4, 2021",
                amount: +100
            },
            {
                date: "May 18, 2019",
                amount: -20
            }
        ]
    },
    // Add more wallets with transactions as needed
]
