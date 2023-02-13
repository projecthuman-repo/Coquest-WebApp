import styled from "@emotion/styled";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    CardProps,
    Checkbox,
    Chip,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    MenuItem,
    Radio,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import Search from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import Done from "@mui/icons-material/Done";
import TaskCard from "../../components/TaskCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fontWeight } from "@mui/system";
import GoogleMaps from "./googlemap";

type TextProps = {
    text: string;
};

const Header = ({ text }: TextProps) => (
    <Typography fontSize={30} fontWeight={600} lineHeight={1.5} variant="h1">
        {text}
    </Typography>
);

const categories = [
    {
        label: "Community Gardens - Food and Agriculture",
    },
    {
        label: "Food Processing Co-ops - Food and Agriculture",
    },
    {
        label: "(Raw and Processed) Food Delivery System - Agriculture",
    },
    {
        label: "Green Powered Micro-Grids - Energy",
    },
    {
        label: "Goods and Craft collectives - Community Art ",
    },
];

const Page = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
    // border: "1px solid",
});

const Form = styled.div({
    // border: "1px solid",
    display: "flex",
    alignItem: "start",
    justifyContent: "center",
    flexDirection: "column",
    gap: 20,
    width: 700,
});

function Categories() {
    return (
        <TextField
            select
            label="Select a category"
            style={{
                width: 500,
            }}
        >
            {categories.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
}

function Summary() {
    return <TextField label="Co-op Summary" multiline rows={4} fullWidth />;
}

function Mission() {
    return <TextField label="Mission" multiline rows={5} fullWidth />;
}

function Hashtags() {
    const [hashtag, setHashTag] = useState([
        { key: 0, label: "communitygarden", active: false },
        { key: 1, label: "hashtag", active: false },
        { key: 2, label: "hashtag", active: false },
        { key: 3, label: "hashtag", active: false },
        { key: 4, label: "hashtag", active: false },
        { key: 5, label: "hashtag", active: false },
    ]);

    // const [hashtag, setHashtag] = useState("");
    const [numberOfHashtags, setNumberOfHashtags] = useState(0);
    const [arrayOfHashtags, addHashtag] = useState([]);

    const Hashtags = arrayOfHashtags.map((data, index) => (
        <ListItem key={data}>
            <Chip
                size="small"
                avatar={<Avatar>#</Avatar>}
                label={data}
                key={index}
                onDelete={onDelete(data)}
            />
        </ListItem>
    ));

    const newHashtag = () => {
        if (numberOfHashtags < 3) {
            setNumberOfHashtags(numberOfHashtags + 1);
            addHashtag((arrayOfHashtags) => arrayOfHashtags.concat());
        } else {
            console.log("Too much hashtags");
        }
    };

    const onDelete = (chipToDelete: { key: any; label?: string }) => () => {
        setHashTag((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        );
    };

    const Container = styled.div({
        // border: "1px solid",
        display: "flex",
        paddingTop: 10,
    });

    return (
        <div>
            <TextField label="Hashtags" fullWidth />
            <Container>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        // border: "1px solid",
                        alignItems: "start",
                        flexDirection: "column",
                        width: 600,
                    }}
                ></div>
                <Button
                    variant="outlined"
                    size="small"
                    color="inherit"
                    onClick={newHashtag}
                    style={{
                        background: "#F0F0F0",
                        textTransform: "none",
                        width: 110,
                        height: 30,
                    }}
                >
                    Add Hashtag
                </Button>
            </Container>
        </div>
    );
}

function CheckBox() {
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<RadioButtonCheckedIcon />}
                        size="small"
                        color="default"
                    />
                }
                label="Allow for location information"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<RadioButtonCheckedIcon />}
                        size="small"
                        color="default"
                    />
                }
                label="Notification ON/OFF"
            />
        </FormGroup>
    );
}

function SearchBar() {
    const SearchBox = styled(TextField)(() => ({
        "& fieldset": {
            borderRadius: "25px",
        },
    }));

    const Container = styled.div({
        display: "flex",
        flexDirection: "column",
        gap: 15,
    });

    return (
        <Container>
            <Typography variant="body2">
                Search for similar co-ops in area:
            </Typography>
            <SearchBox
                placeholder="Search…"
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <Stack direction="row" spacing={1}>
                <Chip icon={<DoneIcon />} label="Co-op" size="small" />
                <Chip icon={<DoneIcon />} label="Co-op name" size="small" />
            </Stack>
            <GoogleMaps />
        </Container>
    );
}

function CoopCard() {
    return (
        <Card
            style={{
                width: 215,
                height: 225,
            }}
        >
            <CardMedia
                sx={{ height: 160, width: 230 }}
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                title="photo"
            />
            <CardHeader
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
                titleTypographyProps={{
                    fontSize: 10,
                    fontWeight: 400,
                }}
                subheaderTypographyProps={{
                    fontSize: 16,
                    fontWeight: 600,
                }}
                title="LOCATION"
                subheader="Co-op name"
            ></CardHeader>
        </Card>
    );
}

const CardContainer = styled.div({
    display: "flex",
    justifyContent: "space-between",
    alightItem: "center",
    flexWrap: "wrap",
    gap: 25,
});

function CreateCoop() {
    return (
        <Page>
            <Form>
                <Header text="Create co-op"></Header>
                <TextField label="Co-op name" />
                <Categories />
                <Summary />
                <Mission />
                <Hashtags />
                <CheckBox />
                <SearchBar />
                <CardContainer>
                    <CoopCard />
                    <CoopCard />
                    <CoopCard />
                    <CoopCard />
                    <CoopCard />
                    <CoopCard />
                </CardContainer>
            </Form>
        </Page>
    );
}

export default CreateCoop;
