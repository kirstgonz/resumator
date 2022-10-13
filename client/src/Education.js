import { Button, ButtonGroup, ListItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import {  MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box } from '@mui/system';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResumatorRedux } from './resumatorRedux';

export function Education() {
    const dispatch = useDispatch();
    const dispatchTitle = React.useCallback(
        () => {
            dispatch(ResumatorRedux.actions.setCurrentPageTitle('Education'));
        }, [dispatch])
    React.useEffect(dispatchTitle, []);
    const [currentIndex, setCurrentIndex] = React.useState(-1);
    const Education = useSelector(ResumatorRedux.selectors.selectEducation);
    const [open, setOpen] = React.useState(false);
    const [modalButtonLabel, setModalButtonLabel] = React.useState('Save');
    const [modalTitle, setModalTitle] = React.useState('Edit Education');
    const [inputFieldVariant, setInputFieldVariant] = React.useState('filled');
    const [educationDegree, setEducationDegree] = React.useState('');
    const [educationSchool, setEducationSchool] = React.useState('');
    const [educationStartDate, setEducationStartDate] = React.useState('');
    const [educationEndDate, setEducationEndDate] = React.useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = (index) => {
        return () => {
            dispatch(ResumatorRedux.actions.deleteEducation(index));
        };
    };
    const handleEditModal = (index) => {
        return () => {
            setInputFieldVariant('filled');
            setCurrentIndex(index);
            let curEdu = Education[index];
            setOpen(true);
            setModalTitle('Edit Education');
            setModalButtonLabel('Save');
            // set all modal variables;
            setEducationDegree(curEdu.title);
            setEducationSchool(curEdu.responsibilities);
            setEducationStartDate(curEdu.start_date);
            setEducationEndDate(curEdu.end_date);
        }
    }
    const handleAddModal = () => {
        setCurrentIndex(-1);
        setInputFieldVariant('outlined');
        setModalTitle('Add Education');
        setModalButtonLabel('Add');
        setOpen(true);
        setEducationDegree('');
        setEducationSchool('');
        setEducationStartDate(null);
        setEducationEndDate(null);
    };
    const handleModalSave = () => {
        const edu = {
            Degree: educationDegree,
            School: educationSchool,
            start_date: educationStartDate,
            end_date: educationEndDate
        }
        if (currentIndex > -1) {
            dispatch(ResumatorRedux.actions.putEducation({ index: currentIndex, item: edu }));
        } else {
            dispatch(ResumatorRedux.actions.addEducation(edu));
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
                <Table sx={{ minWidth: 650 }} aria-label="Education">
                    <TableBody>
                        {Education.map(({ degree, school, start_date, end_date }, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell component="th" scope="row">
                                    {degree} - {school}
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
            <Button onClick={handleAddModal} variant="contained">Add New Education</Button>
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
                            <TextField value={educationDegree}
                                onChange={(e) => {
                                    setEducationDegree(e.target.value);
                                }}
                                label="Degree" id="degree" sx={{ m: 1, width: '25ch' }} variant={inputFieldVariant} />
                            <TextField value={educationSchool}
                                onChange={function (e) {
                                    setEducationSchool(e.target.value)
                                }}
                                label="School" id="school" sx={{ m: 1, width: '50ch' }} variant={inputFieldVariant} />
                        </div>
                        <div>

                            <MobileDatePicker
                                label="Start Date"
                                value={educationStartDate}
                                onChange={(newValue) => {
                                    setEducationStartDate(newValue);
                                }}
                                renderInput={(params) => <TextField sx={{ m: 1, width: '25ch' }}  {...params} />}
                            />
                            <MobileDatePicker
                                label="End Date"
                                value={educationEndDate}

                                onChange={(newValue) => {
                                    console.log(newValue, 'end date')
                                    setEducationEndDate(newValue);
                                }}
                                renderInput={(params) => <TextField sx={{ m: 1, width: '25ch' }} {...params} />}
                            />
                        </div>

                        <Button onClick={handleModalSave} variant="contained">{modalButtonLabel}</Button>
                    </LocalizationProvider>
                </Box>
            </Modal>
        </div>
    )
}