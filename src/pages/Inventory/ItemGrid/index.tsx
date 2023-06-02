// Import libraries and components
import * as React from 'react';
import styled from "@emotion/styled";
import ItemCard from "../ItemCard";
import { Item } from "../ItemList";
import { useState, useEffect } from 'react';

// Start of component styling
const Title = styled.h1({
    width: '100%',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 36,
    marginTop: '60px',
    marginBottom: '20px',
    marginLeft: '23%',
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
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '16px',
    width: '80%',
    maxWidth: '1100px',
    '@media (max-width: 1000px)': {
        gridTemplateColumns: 'repeat(3, 1fr)'
    },
    '@media (max-width: 800px)': {
        gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (max-width: 600px)': {
        gridTemplateColumns: 'repeat(1, 1fr)'
    }
});
// End of component styling


const ItemGrid = () => {
    // Assign state
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const apiUrl = "https://my-gateway-1njig8y6.uc.gateway.dev/regenquest";
        const query = "query={getItems{itemID userID taskLink itemName createdAt description image history}}";
        const requestUrl = `${apiUrl}?${query}`;

        // API call
        fetch(requestUrl, { headers: { "Content-Type": "application/json" } })
            .then((response) => response.json())
            .then(({ data }) => {
                const items = data.getItems as Item[];
                setItems(items);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <Title>Inventory</Title>
            <Container>
                <Grid>
                    {items.map((item) => (
                        <ItemCard key={item.itemID} item={item} />
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default ItemGrid;
