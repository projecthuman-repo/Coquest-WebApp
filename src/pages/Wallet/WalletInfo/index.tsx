// Import all libraries and components
import * as React from 'react';
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import { Wallet, Transaction } from '../WalletData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

// Start of component styling
const InfoCard = styled(Card)({
    height: 723,
    width: 642,
    padding: "24px 24px",
    position: "relative"
});
const WalletType = styled(Typography)({
    fontWeight: 400,
    fontSize: 12
});
const WalletName = styled(Typography)({
    fontWeight: 600,
    fontSize: 20,
    marginRight: 20
});
const MainText = styled(Typography)({
    fontWeight: 400,
    fontSize: 12,
    marginTop: 10
});
const Balance = styled(Typography)({
    fontWeight: 500,
    fontSize: 36
});
const TransactionHistory = styled(Typography)({
    fontWeight: 600,
    fontSize: 16,
    marginTop: 20
});
const TableHeader = styled(TableCell)({
    fontWeight: 600,
    fontSize: 12
});
const TableData = styled(TableCell)({
    fontWeight: 400,
    fontSize: 12
});
const StyledButton = styled(Button)({
    color: "#000000",
    textTransform: "none",
    border: "2px solid #000000",
    borderRadius: "20px",
    fontWeight: 500,
    fontSize: 16,
    width: 175,
    height: 40,
    position: "absolute",
    top: 30,
    right: 30,
    '&:hover': {
        border: "2px solid #000000"
    }
});
const BarcodeText = styled(Typography)({
    fontWeight: 500,
    fontSize: 12
});
const Barcode = styled.div({
    display: 'flex',
    alignItems: 'center',
});
const EyeIcon = styled(RemoveRedEyeIcon)({
    color: "#666666",
    marginRight: 10
});
// End of component styling

type WalletInfoProps = {
    wallet: Wallet
}
const WalletInfo = ({
    wallet
}: WalletInfoProps) => {
    return (
        <InfoCard>
            <StyledButton variant="outlined">Transfer Money</StyledButton>
            <WalletType>{wallet.walletType}</WalletType>
            <Barcode>
                <WalletName>{wallet.walletName}</WalletName>
                <EyeIcon />
                <BarcodeText>Show Barcode</BarcodeText>
            </Barcode>
            <MainText>Balance:</MainText>
            <Balance>${wallet.balance}</Balance>
            <TransactionHistory>Transaction History</TransactionHistory>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableHeader>Account Name</TableHeader>
                            <TableHeader align="center">Date</TableHeader>
                            <TableHeader align="right">Amount</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {wallet.transactions.map((transaction: Transaction, index) => (
                            <TableRow key={index}>
                                <TableData>{wallet.userId}</TableData>
                                <TableData align="center">{transaction.date}</TableData>
                                <TableData align="right">
                                    {transaction.amount >= 0 ? '+ ' : '- '} {/* Set the sign for each transaction */}
                                    ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </InfoCard >
    );
};

export default WalletInfo;