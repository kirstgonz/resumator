import { Button, ButtonGroup, ListItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box } from '@mui/system';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResumatorRedux } from './resumatorRedux';

export function Skills() {
    const dispatch = useDispatch();
    const dispatchTitle = React.useCallback(
        () => {
            dispatch(ResumatorRedux.actions.setCurrentPageTitle('Skills Languages and Awards'));
        }, [dispatch])
        React.useEffect(dispatchTitle, []);
    const [currentIndex, setCurrentIndex] = React.useState(-1);
    const Skill = useSelector(ResumatorRedux.selectors.selectSkill);
    const [curSkill, setCurSkill] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [modalButtonLabel, setModalButtonLabel] = React.useState('Save');
    const [modalTitle, setModalTitle] = React.useState('Edit Skills Languages and Awards');
    const [inputFieldVariant, setInputFieldVariant] = React.useState('filled');
    const [skillName, setSkillName] = React.useState('');
    const [languageName, setLanguageName] = React.useState('');
    const [awardName, setAwardName] = React.useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = (index) => {
        return () => {
            dispatch(ResumatorRedux.actions.deleteSkill(index));
        };
    };
    const handleEditModal = (index) => {
        return () => {
            setInputFieldVariant('filled');
            setCurrentIndex(index);
            let curSkill = Skill[index];
            setOpen(true);
            setModalTitle('Edit Skills Languages and Awards');
            setModalButtonLabel('Save');
            // set all modal variables;
            setSkillName(curSkill.skill);
            setLanguageName(curSkill.language);
            setAwardName(curSkill.award)
        }
    }
    const handleAddModal = () => {
        setCurrentIndex(-1);
        setInputFieldVariant('outlined');
        setModalTitle('Add Skills Languages and Awards');
        setModalButtonLabel('Add');
        setOpen(true);
        setSkillName('');
        setLanguageName('');
        setAwardName('');
    };
    const handleModalSave = () => {
        const skill1 = {
            skill: skillName,
            language: languageName,
            award: awardName
        }
        if (currentIndex > -1) {
            dispatch(ResumatorRedux.actions.putSkills({index: currentIndex, item:skill1}));
        } else {
            dispatch(ResumatorRedux.actions.addSkills(skill1));
        }
        handleClose();
    }
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Skills Languages and Awards">
                    <TableBody>
                        {Skill.map(({ skill, language, award}, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell component="th" scope="row">
                                    {skill} - {language} - {award}
                                </TableCell>
                                <TableCell align="right">
                                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                                        <Button onClick={handleEditModal(index)}>Edit</Button>
                                        <Button onClick={handleDelete(index)}>Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <Button onClick={handleAddModal} variant="contained">Add New Skill Language and Award</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={modalStyle}>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <h3>{modalTitle}</h3>
                        <div>
                            <TextField value={skillName} 
                                onChange={(e) => {
                                    setSkillName(e.target.value);
                                }} 
                                label="Skill" id="skill" sx={{ m: 1, width: '25ch' }} variant={inputFieldVariant} />
                            
                            <TextField value={languageName}
                            onChange={(e) => {
                                setLanguageName(e.target.value);
                            }}   
                            label="Language" id="Language" sx={{ m: 1, width: '50ch' }} variant={inputFieldVariant} />
                        </div>
                        <div>
                            <TextField
                                id="tasks"
                                label="Tasks"
                                value={awardName}
                                onChange={(e) => {
                                    setAwardName(e.target.value);
                                }} 
                                multiline
                                rows={8}
                                sx={{ m: 1, width: '50ch' }}
                                variant={inputFieldVariant}
                            />
                        </div>
                        <Button onClick={handleModalSave} variant="contained">{modalButtonLabel}</Button>
                    </LocalizationProvider>
                </Box>
            </Modal>
        </div>
    )

}
