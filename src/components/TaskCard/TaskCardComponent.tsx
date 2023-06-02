import { useEffect, useState } from 'react';
import { RxChevronDown, RxChevronRight } from 'react-icons/rx';
import styled from '@emotion/styled';
import { ListItem, ListItemText } from '@material-ui/core';
import { Button, Card, CardContent, CardHeader, CardProps, Collapse, Divider, List, Typography } from '@mui/material';


//task card feature
//styles for this feature
type TaskCardProps = CardProps & {
    name: string;
    community: string;
    location: string;
    description: string;
    hasButton: boolean;

};

const TaskBarContainer = styled.div({
    width: '100%',

})
const TaskListItem = styled(ListItem)({
    width: '100%',
})
const ChevronRight = styled(RxChevronRight)({
    color: 'black',
    fontSize: 16,
});
const ChevronDown = styled(RxChevronDown)({
    color: 'black',
    fontSize: 16,
});
const Name = styled(Typography)({
    fontWeight: 600,
    fontSize: 16,
    color: 'black',
    lineHeight: '24px',
});
const JoinButton = styled(Button)({
    backgroundColor: 'rgb(0, 114, 3)',
    color: 'white',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 16,
    borderRadius: 30,
    paddingLeft: 40,
    paddingRight: 40,
    float: 'right',
})
const Body = styled(Typography)({
    fontWeight: 400,
    fontSize: 5,
    lineHeight: '8px',
});
const Spacer = styled.div({
    height: 8,
});
const TaskCardComponent = ({
    name,
    community,
    location,
    description,
    hasButton,
    ...rest
}: TaskCardProps) => {
    const [nameT, setnameT] = useState(name)
    const [communityT, setcommunityT] = useState(community)
    const [locationT, setlocationT] = useState(location)
    const [descriptionT, setdescriptionT] = useState(description)
    const CustomCard = styled(Card)({
        height: 'fit-content',
        width: '100%',
    });
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    useEffect(() => {
        console.log(name);
    });
    return (
        <TaskBarContainer>
            <TaskListItem button={true} onClick={handleClick}>
                <ListItemText primary={nameT.length > 0 ? (nameT) : (null)} secondary={description.length > 0 ? (description) : (null)} />

                {open ? (
                    <ChevronDown />
                ) : (
                    <ChevronRight />
                )}

            </TaskListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <CustomCard>
                        <CardHeader
                            style={{ textAlign: 'left' }}
                            subheader={
                                <>

                                    <CardContent>
                                        <Typography paragraph>
                                            {nameT.length > 0 ? (<Name>{nameT}</Name>) : (null)}
                                        </Typography>
                                        <Typography paragraph>
                                            {communityT.length > 0 ? (<Name>{communityT}</Name>) : (null)}
                                        </Typography>
                                        <Typography paragraph>
                                            {locationT.length > 0 ? (<Name>{locationT}</Name>) : (null)}
                                        </Typography>
                                        <Typography paragraph>
                                            {description.length > 0 ? (<Name>{descriptionT}</Name>) : (null)}
                                        </Typography>
                                        <JoinButton style={hasButton ? { display: 'inline' } : { display: 'none' }} sx={{
                                            ':hover': {
                                                bgcolor: 'rgb(0, 130, 3)',

                                            },
                                        }}>Join</JoinButton>
                                    </CardContent>

                                </>
                            }
                        />

                    </CustomCard>
                </List>
            </Collapse>
            <Divider variant="middle" />
        </TaskBarContainer>
    )
}

export default TaskCardComponent