// Import libraries and components
import * as React from 'react';
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardMedia from '@mui/material/CardMedia';
import CardHeader from "@mui/material/CardHeader";
import Typography from '@mui/material/Typography';
import ItemMenu from '../ItemMenu';
import ItemModal from '../ItemModal';
import { Item } from '../ItemList';

// Start of component styling
const CardImage = styled(CardMedia)({
    height: 185.87,
    cursor: 'pointer'
});
const ItemHeader = styled(CardHeader)({
    padding: '10px 18px'
});
const TaskName = styled(Typography)({
    fontWeight: 400,
    fontSize: 12
});
const ItemName = styled(Typography)({
    fontWeight: 600,
    fontSize: 16
});
const CustomCard = styled(Card)({
    height: 254,
    width: 248.43,
});
// End of component styling


type ItemCardProps = {
    item: Item,
};
const ItemCard = ({
    item,
}: ItemCardProps) => {
    // State of the item modal, same as in the ItemMenu component
    const [isItemModalOpen, setIsItemModalOpen] = React.useState<boolean>(false);
    return (
        <CustomCard>
            {/* Item modal and assign state */}
            <ItemModal
                key={item.itemID}
                item={item}
                open={isItemModalOpen}
                onClose={() => setIsItemModalOpen(false)}
            />
            {/* Item image */}
            <CardImage
                onClick={() => setIsItemModalOpen(true)}>
                <img src={item.image}
                    height="185"
                    alt={item.itemName}
                />
            </CardImage>
            <ItemHeader
                action={
                    <ItemMenu
                        item={item}
                    />
                }
                title={<TaskName>PROGRAM OR TASK NAME</TaskName>}
                subheader={<ItemName>{item.itemName}</ItemName>}
            />
        </CustomCard>
    );
}

export default ItemCard;


