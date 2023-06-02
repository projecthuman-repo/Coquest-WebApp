import styled from '@emotion/styled';
import { Button, FormControlLabel } from '@mui/material';
import React, { useState } from 'react'

const ButtonStyle = styled(Button)({
    backgroundColor: 'rgb(138, 220, 148)',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: 16,
    borderRadius: 30,
    height: 42,
});
const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',

})
export interface SkillSearchProps {
    skills: string[];
}
const HandleSkillType = (() => { });
const ListOfSkills = ({ skills }: SkillSearchProps): React.ReactElement[] => {
    const [selectedSkill, setselectedSkill] = useState(String);

    // const handleSelectedSkillClick: HandleSkillType = (skill) => {
    //     setselectedSkill(skill);
    // };

    return (
        skills.map((skill) => <ButtonStyle> {skill}

        </ButtonStyle>)
    )

};

export default ListOfSkills;