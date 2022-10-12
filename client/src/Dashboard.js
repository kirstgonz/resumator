import { Button, ButtonGroup, Checkbox, FormControlLabel, FormGroup, ListItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResumatorRedux } from './resumatorRedux';
import { Public, PublicOff } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const dispatch = useDispatch();
    const dispatchTitle = React.useCallback(
        () => {
            dispatch(ResumatorRedux.actions.setCurrentPageTitle('Dashboard'));
        }, [dispatch])
    React.useEffect(dispatchTitle, []);
    const [currentIndex, setCurrentIndex] = React.useState(-1);
    const resumes = useSelector(ResumatorRedux.selectors.selectResumes);
    const [open, setOpen] = React.useState(false);
    const [modalButtonLabel, setModalButtonLabel] = React.useState('Save');
    const [modalTitle, setModalTitle] = React.useState('Edit Work Experience');
    const [inputFieldVariant, setInputFieldVariant] = React.useState('filled');
    const [title, setTitle] = React.useState('');
    const [introduction, setIntroduction] = React.useState('');
    const [nickName, setNickName] = React.useState('');
    const [isPublic, setIsPublic] = React.useState('');
    const navigate = useNavigate();


    const handleViewResume = (index) => {
        return () => {
            navigate('/resumes/'+index)
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = (index) => {
        return () => {
            dispatch(ResumatorRedux.actions.deleteResume(index));
        };
    };
    const handleEditModal = (index) => {
        return () => {
            setInputFieldVariant('filled');
            setCurrentIndex(index);
            let curResume = resumes[index];
            setOpen(true);
            setModalTitle('Edit Work Experience');
            setModalButtonLabel('Save');
            // set all modal variables;
            setTitle(curResume.title);
            setNickName(curResume.nickName);
            setIntroduction(curResume.intro);
            setIsPublic(curResume.isPublic);
        }
    }
    const handleAddModal = () => {
        setCurrentIndex(-1);
        setInputFieldVariant('outlined');
        setModalTitle('Add Work Experience');
        setModalButtonLabel('Add');
        setOpen(true);
        setTitle('');
        setNickName('');
        setIntroduction('');
        setIsPublic(false);
    };
    const handleModalSave = () => {
        const exp = {
            title: title,
            nickName: nickName,
            intro: introduction,
            isPublic: isPublic
        }
        if (currentIndex > -1) {
            dispatch(ResumatorRedux.actions.putResume({ index: currentIndex, item: exp }));
        } else {
            dispatch(ResumatorRedux.actions.addResume(exp));
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
    const showPublicIcon = (shouldShow) => {
        if (shouldShow) {
            return (<Public />);
        }
        return (<PublicOff />);
    };
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Work Experience">
                    <TableBody>
                        {resumes.map(({ title, nickName, intro, isPublic }, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell component="th" scope="row">
                                    {showPublicIcon(!!isPublic)} {nickName} - {title}
                                </TableCell>
                                <TableCell align="right">
                                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                                        <Button onClick={handleViewResume(index)}>View</Button>
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

                    <h3>{modalTitle}</h3>
                    <div>
                        <FormGroup>
                            <TextField value={nickName}
                                onChange={(e) => {
                                    setNickName(e.target.value);
                                }}
                                label="Resume Nickname" id="nickName" sx={{ m: 1, width: '25ch' }} variant={inputFieldVariant} />
                        </FormGroup>
                        <TextField value={title}
                            onChange={function (e) {
                                setTitle(e.target.value)
                            }}
                            label="Canidate Title" id="title" sx={{ m: 1, width: '50ch' }} variant={inputFieldVariant} />
                    </div>
                    <div>
                        <TextField
                            id="intro"
                            label="Introduction"
                            onChange={function (e) {
                                setIntroduction(e.target.value)
                            }}
                            value={introduction}
                            multiline
                            rows={8}
                            sx={{ m: 1, width: '50ch' }}
                            variant={inputFieldVariant}
                        />
                    </div>
                    <div>
                        <FormControlLabel control={<Checkbox onChange={(e)=>{setIsPublic(e.target.value)}} checked={!!isPublic} />} label="Is Public" />
                    </div>
                    <Button onClick={handleModalSave} variant="contained">{modalButtonLabel}</Button>
                </Box>
            </Modal>
        </div>
    )
}