import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Home } from "./Home";
import { Resumes } from "./Resumes";
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
import Login from './Pages/Login';
import Signup from './Pages/Signup';


const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

export function App() {
    return (
        <ApolloProvider client={client}>
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
        </ApolloProvider>
    )
}