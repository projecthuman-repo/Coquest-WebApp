// Import all libraries and components
import * as React from 'react';
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Wallet } from '../WalletData';

// Start of component styling
const CustomCard = styled(Card)({
    height: 140,
    width: 389,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    "&:hover": {
        cursor: "pointer",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    }
});
const CardContainer = styled(Typography)({
    padding: "20px 24px",
});
const WalletType = styled(Typography)({
    fontWeight: 400,
    fontSize: 12
});
const WalletName = styled(Typography)({
    fontWeight: 600,
    fontSize: 20
});
const Description = styled(Typography)({
    fontWeight: 400,
    fontSize: 14,
    width: 311
});
const SelectArrow = styled(ArrowForwardIosIcon)({
    height: 14,
    width: 20,
    color: "#666666",
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)"
});
// End of component styling

// Props and state management for the wallet card
type WalletCardProps = {
    wallet: Wallet;
    onSelect: (wallet: Wallet) => void;
};
const WalletCard = ({ wallet, onSelect }: WalletCardProps) => {
    const handleClick = () => {
        onSelect(wallet);
    };
    return (
        <CustomCard onClick={handleClick}>
            <CardContainer>
                <WalletType>{wallet.walletType}</WalletType>
                <WalletName>{wallet.walletName}</WalletName>
                <Description>{wallet.description}</Description>
                <SelectArrow />
            </CardContainer>
        </CustomCard>
    );
};

export default WalletCard;