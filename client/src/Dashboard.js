import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ResumatorRedux } from './resumatorRedux';
export function Dashboard() {
    const dispatch = useDispatch();
    const dispatchTitle = React.useCallback(
      () => {
        dispatch(ResumatorRedux.actions.setCurrentPageTitle('Dashboard'));
    }, [dispatch])
    React.useEffect(dispatchTitle, []);
    
    return (
        <div>
            <h1> This is the Dashboard page</h1>
        </div>
    )
};