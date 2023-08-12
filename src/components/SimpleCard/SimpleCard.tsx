import styled from "@emotion/styled";
import {
  Card,
  CardHeader,
  Divider,
  IconButton,
  Tabs,
  Typography,
} from '@mui/material';
import Link from '@mui/material/Link';
import Tab from '@mui/material/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import { useEffect, useState } from "react";
import { List } from '@material-ui/core';
import TaskCardComponent from '../../components/TaskCard/TaskCardComponent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface tabContext {
  taskName: string,
  type: string,
  communityName: string,
  location: string,
  description: string,
  projectName: string,
  projectDescription: string
  userName: string,
  recommendationText: string
}
//uses props to take card label 
type SimpleCardProps = {
  cardProperty: {
    label: string,
    tabProps: {
      tabLabels: String[],
      tabContexts: tabContext[],
    }
  };
};

const CardStyle = styled(Card)({
  width: '90%',
  borderColor: 'divider',
  height: 'fit-content',

})
const SeeAllLink = styled(Typography)({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "18px",
  color: "#000000",
  marginTop: -25,
  textAlign: 'right'
})


//places all the elements inside the card 
const SimpleCard = ({ cardProperty }: SimpleCardProps) => {
  let counter = 0;
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    console.log(cardProperty.tabProps.tabContexts.at(0));

  });
  const handleRecommendations = (title: string) => {
    return (
      <div>
        {title}
        <IconButton aria-label="help">
          <AddCircleOutlineIcon style={{ height: 35, width: 40 }} />
        </IconButton>

      </div>)
  }

  const HandleTasks = () => {
    if (cardProperty.label == 'Tasks') {
      return (
        <CardStyle
        >
          <CardHeader
            title={cardProperty.label}
            style={{ textAlign: 'left' }}
            subheader={
              <SeeAllLink
              >
                <Link href="#" color="#000000">
                  See all
                </Link>
              </SeeAllLink>}
          >
          </CardHeader>

          <TabContext value={value}>
            <Tabs
              variant='fullWidth'
              onChange={handleChange}
              style={{
                width: '100%',
              }}
              value={value}
              centered
            >
              <Tab label={`${cardProperty.tabProps.tabLabels.at(0)}`} value='1' />
              <Tab label={cardProperty.tabProps.tabLabels.at(1)} value='2' />

            </Tabs>
            <Divider variant="middle" />
            <TabPanel value='1' style={{ padding: 0 }}>

              <List>
                {cardProperty.tabProps.tabContexts.map((item, index) => (item.type === 'Ongoing') ? <TaskCardComponent key={`${cardProperty.tabProps.tabContexts.at(index)?.taskName}${index}`} name={`${cardProperty.tabProps.tabContexts.at(index)?.taskName}`} community={`${cardProperty.tabProps.tabContexts.at(index)?.communityName}`} location={`${cardProperty.tabProps.tabContexts.at(index)?.location}`} description={`${cardProperty.tabProps.tabContexts.at(index)?.description}`} hasButton={true} /> : null)}
              </List>
            </TabPanel>
            <TabPanel value='2' style={{ padding: 0 }}>
              <List>
                {cardProperty.tabProps.tabContexts.map((item, index) => (item.type === 'Completed') ? <TaskCardComponent key={`${cardProperty.tabProps.tabContexts.at(index)?.taskName}${index}`} name={`${cardProperty.tabProps.tabContexts.at(index)?.taskName}`} community={`${cardProperty.tabProps.tabContexts.at(index)?.communityName}`} location={`${cardProperty.tabProps.tabContexts.at(index)?.location}`} description={`${cardProperty.tabProps.tabContexts.at(index)?.description}`} hasButton={false} /> : null)}
              </List>
            </TabPanel>
          </TabContext>
        </CardStyle>
      )
    }
    else if (cardProperty.label == 'Your Groups') {
      return (
        <CardStyle
        >
          <CardHeader
            title={cardProperty.label}
            style={{ textAlign: 'left' }}
            subheader={
              <SeeAllLink
              >
                <Link href="#" color="#000000">
                  See all
                </Link>
              </SeeAllLink>}
          >
          </CardHeader>
          <TabContext value={value}>
            <Tabs
              variant='fullWidth'
              onChange={handleChange}
              style={{
                width: '100%',
              }}
              value={value}
              centered
            >
              <Tab label={cardProperty.tabProps.tabLabels.at(0)} value='1' />
              <Tab label={cardProperty.tabProps.tabLabels.at(1)} value='2' />
              <Tab label={cardProperty.tabProps.tabLabels.at(2)} value='3' />

            </Tabs>
            <Divider variant="middle" />
            <TabPanel value='1' style={{ padding: 0 }}>

              <List>

                {cardProperty.tabProps.tabContexts.map((item, index) => (item.type === 'Project') ? <TaskCardComponent key={`${cardProperty.tabProps.tabContexts.at(index)?.projectName}${index}`} name={`${cardProperty.tabProps.tabContexts.at(index)?.projectName}`} community={``} location={``} description={`${cardProperty.tabProps.tabContexts.at(index)?.projectDescription}`} hasButton={true} /> : null)}

              </List>
            </TabPanel>
            <TabPanel value='2' style={{ padding: 0 }}>
              <List>

                {cardProperty.tabProps.tabContexts.map((item, index) => (item.type === 'Program') ? <TaskCardComponent key={`${cardProperty.tabProps.tabContexts.at(index)?.projectName}${index}`} name={`${cardProperty.tabProps.tabContexts.at(index)?.projectName}`} community={``} location={``} description={`${cardProperty.tabProps.tabContexts.at(index)?.projectDescription}`} hasButton={true} /> : null)}

              </List>
            </TabPanel>
            <TabPanel value='3' style={{ padding: 0 }}>
              <List>

                {cardProperty.tabProps.tabContexts.map((item, index) => (item.type === 'Co-op') ? <TaskCardComponent key={`${cardProperty.tabProps.tabContexts.at(index)?.projectName}${index}`} name={`${cardProperty.tabProps.tabContexts.at(index)?.projectName}`} community={``} location={``} description={`${cardProperty.tabProps.tabContexts.at(index)?.projectDescription}`} hasButton={true} /> : null)}

              </List>
            </TabPanel>
          </TabContext>
        </CardStyle>
      )
    }
    else if (cardProperty.label == 'Recommendations') {
      return (
        <CardStyle
        >
          <CardHeader
            title={handleRecommendations(cardProperty.label)}
            style={{ textAlign: 'left' }}
          >
          </CardHeader>

          <TabContext value={value}>
            <Tabs
              variant='fullWidth'
              onChange={handleChange}
              style={{
                width: '100%',
              }}
              value={value}
              centered
            >
              <Tab label={cardProperty.tabProps.tabLabels.at(0)} value='1' />
              <Tab label={cardProperty.tabProps.tabLabels.at(1)} value='2' />

            </Tabs>
            <Divider variant="middle" />
            <TabPanel value='1' style={{ padding: 0 }}>

              <List>

                {cardProperty.tabProps.tabContexts.map((item, index) => (item.type === 'Given') ? <TaskCardComponent key={`${cardProperty.tabProps.tabContexts.at(1)?.userName}${index}`} name={`${cardProperty.tabProps.tabContexts.at(index)?.userName}`} community={``} location={``} description={`${cardProperty.tabProps.tabContexts.at(index)?.recommendationText}`} hasButton={false} /> : null)}

              </List>
            </TabPanel>
            <TabPanel value='2' style={{ padding: 0 }}>
              <List>

                {cardProperty.tabProps.tabContexts.map((item, index) => (item.type === 'Received') ? <TaskCardComponent key={`${cardProperty.tabProps.tabContexts.at(1)?.userName}${index}`} name={`${cardProperty.tabProps.tabContexts.at(index)?.userName}`} community={``} location={``} description={`${cardProperty.tabProps.tabContexts.at(index)?.recommendationText}`} hasButton={false} /> : null)}

              </List>
            </TabPanel>
          </TabContext>
        </CardStyle>
      )
    }
    else {
      return null;
    }
  }
  return (
    <HandleTasks />
  );
};

export default SimpleCard;
