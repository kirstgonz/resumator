import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ResumatorRedux } from './resumatorRedux';
export function Education() {
    const dispatch = useDispatch();
    const dispatchTitle = React.useCallback(
      () => {
        dispatch(ResumatorRedux.actions.setCurrentPageTitle('Education'));
    }, [dispatch])
    React.useEffect(dispatchTitle, []);
    
    return (
        <div>
            <h1> This is the Education page</h1>
        </div>
    )
};