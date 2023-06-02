// Import all libraries and components
import * as React from 'react';
import styled from "@emotion/styled";
import WalletCard from '../WalletCard';
import WalletInfo from '../WalletInfo';
import { Wallet, Wallets } from '../WalletData'

// Start of component styling
const Title = styled.h1({
    width: '100%',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 36,
    marginTop: '60px',
    marginBottom: '20px',
    marginLeft: '15%',
    fontFamily: 'Poppins'
});
const Container = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
});
const Grid = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    gridGap: '20px',
    width: '80%',
    maxWidth: '1100px',
});
const WalletColumn = styled.div({
    gridColumn: 1,
})
// End of component styling


type WalletPageProps = {};
const WalletPage = ({ }: WalletPageProps) => {
    // Set the state of the selected wallet
    const [selectedWallet, setSelectedWallet] = React.useState<Wallet | null>(null);

    const handleSelectedWallet = (wallet: Wallet) => {
        setSelectedWallet(wallet);
    };
    return (
        // Grid layout to display the wallets in a column
        <>
            <Title>Wallet</Title>
            <Container>
                <Grid>
                    <WalletColumn>
                        {Wallets.map((wallet, walletId) => (
                            <WalletCard
                                key={wallet.walletId}
                                wallet={wallet}
                                onSelect={handleSelectedWallet}
                            />
                        ))}
                    </WalletColumn>
                    {selectedWallet && <WalletInfo wallet={selectedWallet} />} {/* State management of the selected wallet */}
                </Grid>
            </Container>
        </>
    );
};

export default WalletPage;
