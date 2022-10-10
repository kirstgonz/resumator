import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';

const categories = [
    {
        id: 'Profile',
        children: [
            { id: 'contact-info', title: 'Contact Information', icon: <DnsRoundedIcon /> },
            { id: 'work', title: 'Work Experience', icon: <SettingsEthernetIcon /> },
            { id: 'education', title: 'Education', icon: <SettingsEthernetIcon /> },
            { id: 'projects', title: 'Projects', icon: <PermMediaOutlinedIcon /> },
            { id: 'skills', title: 'Skills', icon: <PublicIcon /> },
            { id: 'awards', title: 'Awards', icon: <SettingsEthernetIcon /> },
            { id: 'languages', title: 'Languages', icon: <SettingsEthernetIcon /> },
            { id: 'interests', title: 'Interests', icon: <SettingsEthernetIcon /> }
        ],
    },
    {
        id: 'Resumes',
        children: [
            { id: 'view-all-resumes', title: 'View All Resumes', icon: <SettingsIcon /> },
            { id: 'create-resume', title: 'Create New Resume', icon: <SettingsIcon /> }
        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const { ...other } = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    Resumator
                </ListItem>
                <NavLink to={`/resumator`}>
                    <ListItem sx={{ ...item, ...itemCategory }}>
                        <ListItemIcon>
                            <HomeIcon /> Home
                        </ListItemIcon>
                    </ListItem>
                </NavLink>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#101F33' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, title, icon, active }) => (
                            <NavLink key={childId} to={`/resumator/${childId}`}>
                                <ListItem disablePadding key={childId}>
                                    <ListItemButton selected={active} sx={item}>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText>{title}</ListItemText>

                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        ))}

                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}