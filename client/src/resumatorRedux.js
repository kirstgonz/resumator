import { configureStore, createSlice } from '@reduxjs/toolkit'
const slice = createSlice({
    name: 'resumator',
    initialState: {
        currentPageTitle: 'not set yet',
        candidate: {
            "firstName": "Kate",
            "middleName": "Thao",
            "lastName":"Lam",
            "description": "I am a recent college graduate of Austin Community College and enrolled in the Full Stack Web Development Coding bootcamp at the University of Texas. I am looking for opportunities in web development. I have over 10 years work experience with various retail corporations, both in Vietnam and the US. During this time I have developed the following skills: customer service, team management, task priortization, and data analytics.",
            "email": "kate.lam.austin@gmail.com",
            "location": "Round Rock, TX",
            "phoneNumber": "737 203 1148",
            "linkedIn": "linkedin.com/in/kate-thao-lam",
            "gitHub": "github.com/Kate-github",
            "experience": [
                {
                    "company": "Swarovski North America, Ltd",
                    "title": "Assistant Store Manager",
                    "location": "Round Rock, TX",
                    "start_date": "Nov 2018",
                    "end_date": "Jul 2021",
                    "responsibilities": [
                        "Contributed 20%-25% to total store sales.",
                        "Worked with Store Manager on operating strategies to ensure the store meet monthly sales targets.",
                        "Customer service: Utilizing 'clientelling' skills to establish customer relationships and maintain customer loyalty. Handled customer complaints effectively.",
                        "Visual merchandising: Making sure to update the displays periodically following brand’s standards and promotional strategies.",
                        "Team management and development: Trained new sale staff on product knowledge, selling skills, and POS proficiency. Troubleshooted issues for the team in store and on phone. Communicated the “hurdles” to the team right before the shifts start to ensure daily sales targets will be achieved.",
                        "Loss prevention/Inventory Management: managing and arranging the stock on a regular basis, daily checking returned stock, weekly checking damaged stock, making sure shipment receiving processes are accurate."
                    ]
                },
                {
                    "company": "DFS Group, Ltd",
                    "title": "Senior Key Account Assistant - Beauty Category",
                    "location": "Ho Chi Minh City, Vietnam",
                    "start_date": "Mar 2013",
                    "end_date": "Apr 2016",
                    "responsibilities": [
                        "Account Management for multiple luxury cosmetic and fragrance brands such as Christian Dior, Estee Lauder, Shiseido, SKII, L'occitane and other brands for Vietnam region.",
                        "Inventory Management: Responsible for tracking inventory levels, delivering proper and prompt actions for slow and best selling skus as well as to be expired stocks.",
                        "Brand Development and Strategy: Responsible for product assortments, requesting and setting up promotions/ events, sales targets, sales staffs commission structures, visual merchandising, and monthly/seasonal markdowns implementation.",
                        "Sales management: Duties included coordination with operations team to ensure sales targets are met."
                    ]
                },
                {
                    "company": "DANH GIA Co., Ltd",
                    "title": "Assistant Operation Manager - Lacoste",
                    "location": "Ho Chi Minh City, Vietnam",
                    "start_date": "May 2012",
                    "end_date": "Feb 2013",
                    "responsibilities": 
                        `-Vietnam regional store manager for Lacoste. Developed teamwork and culture that is aligned with brand's spirit. Established commission policy for sales teams.
-Sales management: set sales targets for all retail stores in Vietnam, monitor teams to obtain sales targets, apply seasonal markdowns.
-Inventory management: inventory levels, track and give solutions for slow and bestselling items.`
                    
                },
                {
                    "company": "DFS Group, Ltd",
                    "title": "Merchandising Associate - Fashion and Lux Watches",
                    "location": "Ho Chi Minh City, Vietnam",
                    "start_date": "Jun 2007",
                    "end_date": "Apr 2010"
                }
            ],
            projects: [],
            education: [],
            skills: [],
            interests: [],
            languages: [],
            awards: []

        },
        resumes: []
    },
    reducers: {
        addWorkExperience: (state, action) => {
            state.candidate.experience.add(action.payload);
        },
        addProject: (state, action) => {
            state.candidate.projects.add(action.payload);
        },
        deleteWorkExperience: (state, action) => {
            state.candidate.experience.splice(action.payload, 1);
            console.log(state.candidate);
        },
        deleteProject: (state, action) => {
            state.candidate.projects.splice(action.payload, 1);
        },
        updateContactInfo: (state, action) => {
            state.candidate = action.payload;
        },
        setCurrentPageTitle: (state, action) => {
            state.currentPageTitle = action.payload
        }
    },
});

export const ResumatorRedux = {
    actions: slice.actions,
    store: configureStore({
        reducer: {
            resumator: slice.reducer
        }
    }),
    selectors: {
        selectPageTitle: (state) => {
            return state.resumator.currentPageTitle;
        },
        selectCandidate: state => state.resumator.candidate,
        selectExperience: state => state.resumator.candidate.experience
    }
};