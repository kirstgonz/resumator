import { Button, ButtonGroup, ListItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box } from '@mui/system';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResumatorRedux } from './resumatorRedux';

export function Projects() {
    const dispatch = useDispatch();
    const dispatchTitle = React.useCallback(
        () => {
            dispatch(ResumatorRedux.actions.setCurrentPageTitle('Projects'));
        }, [dispatch])
        React.useEffect(dispatchTitle, []);
    let currentIndex = -1;
    const Project = useSelector(ResumatorRedux.selectors.selectProject);
    const [curProj, setCurProj] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [modalButtonLabel, setModalButtonLabel] = React.useState('Save');
    const [modalTitle, setModalTitle] = React.useState('Edit Project History');
    const [inputFieldVariant, setInputFieldVariant] = React.useState('filled');
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        currentIndex = -1;
        setOpen(false);
    };
    const handleDelete = (index) => {
        return () => {
            dispatch(ResumatorRedux.actions.deleteProject(index));
        };
    };
    const handleEditModal = (index) => {
        return () => {
            setInputFieldVariant('filled');
            currentIndex = index;
            setCurProj(Project[index])
            setOpen(true);
            setModalTitle('Edit Project');
            setModalButtonLabel('Save');
        }
    }
    const handleAddModal = () => {
        currentIndex = -1;
        setInputFieldVariant('outlined');
        setModalTitle('Add Project');
        setModalButtonLabel('Add');
        setCurProj({});
        setOpen(true);
    };
    const handleModalClick = () => {
        curProj()
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
                <Table sx={{ minWidth: 650 }} aria-label="Projects">
                    <TableBody>
                        {Project.map(({ title, role, tasks}, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell component="th" scope="row">
                                    {title} - {role} - {tasks}
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
            <Button onClick={handleAddModal} variant="contained">Add New Project</Button>
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
                            <TextField value={curProj.title} label="Project" id="project" sx={{ m: 1, width: '25ch' }} variant={inputFieldVariant} />
                            <TextField value={curProj.role}  label="Role" id="role" sx={{ m: 1, width: '50ch' }} variant={inputFieldVariant} />
                        </div>
                        <div>
                            <TextField
                                id="tasks"
                                label="Tasks"
                                value={curProj.tasks}
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

