import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { Resumes } from "./Resumes";
import { Signup } from "./Signup";
import Resumator from "./Resumator";
import { ContactInfo } from './ContactInfo';
import { Work } from './Work';
import { Projects } from './Projects';
import { Skills } from './Skills';
import { Interests } from './Interests';
import { Languages } from './Languages';
import { Awards } from './Awards';
import { Dashboard } from './Dashboard';
import { Education } from './Education';

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resumator" element={<Resumator />}>
                <Route index={true} element={<Dashboard />} />
                <Route path="contact-info" element={<ContactInfo />} />
                <Route path="work" element={<Work />} />
                <Route path="education" element={<Education />} />
                <Route path="projects" element={<Projects />} />
                <Route path="skills" element={<Skills />} />
                <Route path="awards" element={<Awards />} />
                <Route path="interests" element={<Interests/> } />
                <Route path="languages" element={<Languages/> } />
            </Route>
            <Route path="/resumes" element={<Resumes />} />
        </Routes>
    )
}