import { Button, ButtonGroup, ListItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import {  MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box } from '@mui/system';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResumatorRedux } from './resumatorRedux';
export function Work() {
    const dispatch = useDispatch();
    const dispatchTitle = React.useCallback(
        () => {
            dispatch(ResumatorRedux.actions.setCurrentPageTitle('Work Experience'));
        }, [dispatch])
    React.useEffect(dispatchTitle, []);
    const [currentIndex, setCurrentIndex] = React.useState(-1);
    const workExperience = useSelector(ResumatorRedux.selectors.selectExperience);
    const [open, setOpen] = React.useState(false);
    const [modalButtonLabel, setModalButtonLabel] = React.useState('Save');
    const [modalTitle, setModalTitle] = React.useState('Edit Work Experience');
    const [inputFieldVariant, setInputFieldVariant] = React.useState('filled');
    const [jobTitle, setJobTitle] = React.useState('');
    const [jobDescription, setJobDescription] = React.useState('');
    const [jobStartDate, setJobStartDate] = React.useState('');
    const [jobEndDate, setJobEndDate] = React.useState('');
    const [jobCompanyName, setJobCompanyName] = React.useState('');


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = (index) => {
        return () => {
            dispatch(ResumatorRedux.actions.deleteWorkExperience(index));
        };
    };
    const handleEditModal = (index) => {
        return () => {
            setInputFieldVariant('filled');
            setCurrentIndex(index);
            let curExp = workExperience[index];
            setOpen(true);
            setModalTitle('Edit Work Experience');
            setModalButtonLabel('Save');
            // set all modal variables;
            setJobTitle(curExp.title);
            setJobDescription(curExp.responsibilities);
            setJobCompanyName(curExp.company);
            setJobStartDate(curExp.start_date);
            setJobEndDate(curExp.end_date);
        }
    }
    const handleAddModal = () => {
        setCurrentIndex(-1);
        setInputFieldVariant('outlined');
        setModalTitle('Add Work Experience');
        setModalButtonLabel('Add');
        setOpen(true);
        setJobTitle('');
        setJobDescription('');
        setJobCompanyName('');
        setJobStartDate(null);
        setJobEndDate(null);
    };
    const handleModalSave = () => {
        const exp = {
            title: jobTitle,
            responsibilities: jobDescription,
            company: jobCompanyName,
            start_date: jobStartDate,
            end_date: jobEndDate
        }
        if (currentIndex > -1) {
            dispatch(ResumatorRedux.actions.putWorkExperience({ index: currentIndex, item: exp }));
        } else {
            dispatch(ResumatorRedux.actions.addWorkExperience(exp));
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
                <Table sx={{ minWidth: 650 }} aria-label="Work Experience">
                    <TableBody>
                        {workExperience.map(({ title, company, start_date, end_date }, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell component="th" scope="row">
                                    {title} - {company}
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
            <Button onClick={handleAddModal} variant="contained">Add New Experience</Button>
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
                            <TextField value={jobCompanyName}
                                onChange={(e) => {
                                    setJobCompanyName(e.target.value);
                                }}
                                label="Company" id="company" sx={{ m: 1, width: '25ch' }} variant={inputFieldVariant} />
                            <TextField value={jobTitle}
                                onChange={function (e) {
                                    setJobTitle(e.target.value)
                                }}
                                label="Job Title" id="title" sx={{ m: 1, width: '50ch' }} variant={inputFieldVariant} />
                        </div>
                        <div>

                            <MobileDatePicker
                                label="Start Date"
                                value={jobStartDate}
                                onChange={(newValue) => {
                                    setJobStartDate(newValue);
                                }}
                                renderInput={(params) => <TextField sx={{ m: 1, width: '25ch' }}  {...params} />}
                            />
                            <MobileDatePicker
                                label="End Date"
                                value={jobEndDate}

                                onChange={(newValue) => {
                                    console.log(newValue, 'end date')
                                    setJobEndDate(newValue);
                                }}
                                renderInput={(params) => <TextField sx={{ m: 1, width: '25ch' }} {...params} />}
                            />
                        </div>
                        <div>
                            <TextField
                                id="responsibilities"
                                label="Responsibilities"
                                onChange={function (e) {
                                    setJobDescription(e.target.value)
                                }}
                                value={jobDescription}
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