import { Button, ButtonGroup, ListItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
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
    let currentIndex = -1;
    const workExperience = useSelector(ResumatorRedux.selectors.selectExperience);
    const [curExp, setCurExp] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [modalButtonLabel, setModalButtonLabel] = React.useState('Save');
    const [modalTitle, setModalTitle] = React.useState('Edit Work Experience');
    const [inputFieldVariant, setInputFieldVariant] = React.useState('filled');
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        currentIndex = -1;
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
            currentIndex = index;
            setCurExp(workExperience[index])
            setOpen(true);
            setModalTitle('Edit Work Experience');
            setModalButtonLabel('Save');
        }
    }
    const handleAddModal = () => {
        currentIndex = -1;
        setInputFieldVariant('outlined');
        setModalTitle('Add Work Experience');
        setModalButtonLabel('Add');
        setCurExp({});
        setOpen(true);
    };
    const handleModalClick = () => {
        curExp()
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
                            <TextField value={curExp.company} label="Company" id="company" sx={{ m: 1, width: '25ch' }} variant={inputFieldVariant} />
                            <TextField value={curExp.title}
                                onChange={(newValue) => {
                                    curExp.start_date = newValue;
                                }}
                                label="Job Title" id="title" sx={{ m: 1, width: '50ch' }} variant={inputFieldVariant} />
                        </div>
                        <div>

                            <MobileDatePicker
                                label="Start Date"
                                value={curExp.start_date}
                                onChange={(newValue) => {
                                    curExp.start_date = newValue;
                                }}
                                renderInput={(params) => <TextField sx={{ m: 1, width: '25ch' }}  {...params} />}
                            />
                            <MobileDatePicker
                                label="End Date"
                                value={curExp.end_date}

                                onChange={(newValue) => {
                                    // setValue(newValue);
                                }}
                                renderInput={(params) => <TextField sx={{ m: 1, width: '25ch' }} {...params} />}
                            />
                        </div>
                        <div>
                            <TextField
                                id="responsibilities"
                                label="Responsibilities"
                                value={curExp.responsibilities}
                                multiline
                                rows={8}
                                sx={{ m: 1, width: '50ch' }}
                                variant={inputFieldVariant}
                            />
                        </div>
                        <Button onClick={handleModalClick} variant="contained">{modalButtonLabel}</Button>
                    </LocalizationProvider>
                </Box>
            </Modal>
        </div>
    )
}