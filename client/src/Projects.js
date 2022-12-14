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
    const [currentIndex, setCurrentIndex] = React.useState(-1);
    const Project = useSelector(ResumatorRedux.selectors.selectProject);
    const [curProj, setCurProj] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [modalButtonLabel, setModalButtonLabel] = React.useState('Save');
    const [modalTitle, setModalTitle] = React.useState('Edit Project History');
    const [inputFieldVariant, setInputFieldVariant] = React.useState('filled');
    const [projTitle, setProjTitle] = React.useState('');
    const [projRole, setProjRole] = React.useState('');
    const [projTasks, setProjTasks] = React.useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
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
            setCurrentIndex(index);
            let curProj = Project[index];
            setOpen(true);
            setModalTitle('Edit Project');
            setModalButtonLabel('Save');
            setProjTitle(curProj.title);
            setProjRole(curProj.role);
            setProjTasks(curProj.tasks);
        }
    }
    const handleAddModal = () => {
        setCurrentIndex(-1);
        setInputFieldVariant('outlined');
        setModalTitle('Add Project');
        setModalButtonLabel('Add');
        setCurProj({});
        setOpen(true);
        setProjTitle('');
        setProjRole('');
        setProjTasks('');
    };

    const handleModalSave = () => {
        const proj = {
            title: projTitle,
            role: projRole,
            tasks: projTasks
        }
        if (currentIndex > -1) {
            dispatch(ResumatorRedux.actions.putProject({index:currentIndex, item: proj}));
        }
        else{
            dispatch(ResumatorRedux.actions.addProject(proj));
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
                            <TextField value={projTitle} 
                                onChange={(e) => {
                                    setProjTitle(e.target.value);
                                }} 
                                label="Project" id="project" sx={{ m: 1, width: '25ch' }} variant={inputFieldVariant} />
                            
                            <TextField value={projRole}
                            onChange={(e) => {
                                setProjRole(e.target.value);
                            }}   
                            label="Role" id="role" sx={{ m: 1, width: '50ch' }} variant={inputFieldVariant} />
                        </div>
                        <div>
                            <TextField
                                id="tasks"
                                label="Tasks"
                                value={projTasks}
                                onChange={(e) => {
                                    setProjTasks(e.target.value);
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

