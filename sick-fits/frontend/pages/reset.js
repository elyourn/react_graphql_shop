import React from 'react';
import Reset from '../components/Reset';

const ResetPage = (props) => (
    <div>
        <p>
            Reset Your Password {props.query.resetToken}
            <Reset resetToken={props.query.resetToken} />
        </p>
    </div>
)

export default ResetPage;