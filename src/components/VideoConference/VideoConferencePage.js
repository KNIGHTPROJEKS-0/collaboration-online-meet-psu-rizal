// Video Conference Page Component
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoConference from '../components/VideoConference';

export function VideoConferencePage() {
  const { meetingId } = useParams();
  const navigate = useNavigate();

  const handleLeaveMeeting = () => {
    // Navigate back to meetings page
    navigate('/meetings');
  };

  return (
    <VideoConference 
      meetingId={meetingId} 
      onLeave={handleLeaveMeeting}
    />
  );
}

export default VideoConferencePage;