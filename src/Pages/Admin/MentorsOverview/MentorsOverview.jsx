import React from 'react';
import AppliedMentor from '../AppliedMentor/AppliedMentor';
import ApprovedMentors from '../ApprovedMentors/ApprovedMentors';
import RejectedMentors from '../RejectedMentors/RejectedMentors';

const MentorsOverview = () => {
    return (
        <div>
            <AppliedMentor>

            </AppliedMentor>
            <ApprovedMentors>

            </ApprovedMentors>
            <RejectedMentors/>
        </div>
    );
};

export default MentorsOverview;