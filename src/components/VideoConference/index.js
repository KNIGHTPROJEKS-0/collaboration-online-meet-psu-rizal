// Video Conference Component - Initial Implementation
import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Flex, Heading, Text, IconButton, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Select, Badge, HStack, VStack } from '@chakra-ui/react';
import { Phone, Video, VideoOff, Mic, MicOff, PhoneOff, Users, MessageSquare, Settings, ScreenShare, ScreenShareOff } from 'lucide-react';

// Mock WebRTC service for initial implementation
class MockWebRTCService {
  constructor() {
    this.localStream = null;
    this.remoteStreams = new Map();
    this.peerConnections = new Map();
    this.isMicEnabled = true;
    this.isVideoEnabled = true;
    this.isScreenSharing = false;
  }

  async initialize() {
    try {
      // For demo purposes, we'll create a mock stream
      this.localStream = await this.createMockStream();
      return this.localStream;
    } catch (error) {
      console.error('Failed to initialize WebRTC:', error);
      throw error;
    }
  }

  createMockStream() {
    // Create a canvas-based mock video stream for demonstration
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw a simple pattern to simulate video
      const draw = () => {
        ctx.fillStyle = `rgb(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Video Stream', 10, 30);
        ctx.fillText(new Date().toLocaleTimeString(), 10, 60);
        
        if (this.isVideoEnabled) {
          requestAnimationFrame(draw);
        }
      };
      
      draw();
    }
    
    // Create a mock audio track
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0; // Mute the oscillator
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    
    const audioTrack = audioContext.createMediaStreamDestination().stream.getAudioTracks()[0];
    const videoTrack = canvas.captureStream(30).getVideoTracks()[0];
    
    return new MediaStream([videoTrack, audioTrack]);
  }

  async toggleMic() {
    this.isMicEnabled = !this.isMicEnabled;
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = this.isMicEnabled;
      });
    }
    return this.isMicEnabled;
  }

  async toggleVideo() {
    this.isVideoEnabled = !this.isVideoEnabled;
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(track => {
        track.enabled = this.isVideoEnabled;
      });
    }
    return this.isVideoEnabled;
  }

  async startScreenShare() {
    this.isScreenSharing = true;
    // In a real implementation, this would request screen sharing permissions
    return this.isScreenSharing;
  }

  async stopScreenShare() {
    this.isScreenSharing = false;
    return this.isScreenSharing;
  }

  async joinRoom(roomId) {
    // Simulate joining a room
    console.log(`Joined room: ${roomId}`);
    return { roomId, participants: [] };
  }

  async leaveRoom() {
    // Simulate leaving a room
    console.log('Left room');
    return true;
  }

  async sendMessage(message) {
    // Simulate sending a message
    console.log(`Sent message: ${message}`);
    return { id: Date.now(), message, timestamp: new Date().toISOString() };
  }
}

const mockWebRTC = new MockWebRTCService();

export function VideoConference({ meetingId, onLeave }) {
  const toast = useToast();
  const [localStream, setLocalStream] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'You', isHost: true },
    { id: 2, name: 'Prof. Reyes', isHost: false },
    { id: 3, name: 'Ana D.', isHost: false },
    { id: 4, name: 'Mark S.', isHost: false }
  ]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Prof. Reyes', message: 'Hello everyone, welcome to the class!', timestamp: '10:00 AM' },
    { id: 2, sender: 'Ana D.', message: 'Hi Prof!', timestamp: '10:01 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [meetingInfo] = useState({
    title: 'CIS101 Week 5',
    id: meetingId || 'ABC123',
    startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const initWebRTC = async () => {
      try {
        const stream = await mockWebRTC.initialize();
        setLocalStream(stream);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        // Join the meeting room
        await mockWebRTC.joinRoom(meetingInfo.id);
        
        toast({
          title: 'Joined meeting',
          description: `Connected to ${meetingInfo.title}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Failed to initialize WebRTC:', error);
        toast({
          title: 'Connection error',
          description: 'Failed to connect to the meeting',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    initWebRTC();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [meetingInfo.id, meetingInfo.title, toast]);

  const toggleMic = async () => {
    try {
      const newState = await mockWebRTC.toggleMic();
      setIsMicOn(newState);
      toast({
        title: newState ? 'Microphone on' : 'Microphone off',
        status: newState ? 'success' : 'warning',
        duration: 2000,
      });
    } catch (error) {
      console.error('Failed to toggle mic:', error);
      toast({
        title: 'Error',
        description: 'Failed to toggle microphone',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const toggleVideo = async () => {
    try {
      const newState = await mockWebRTC.toggleVideo();
      setIsVideoOn(newState);
      toast({
        title: newState ? 'Camera on' : 'Camera off',
        status: newState ? 'success' : 'warning',
        duration: 2000,
      });
    } catch (error) {
      console.error('Failed to toggle video:', error);
      toast({
        title: 'Error',
        description: 'Failed to toggle camera',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const toggleScreenShare = async () => {
    try {
      let newState;
      if (isScreenSharing) {
        newState = await mockWebRTC.stopScreenShare();
      } else {
        newState = await mockWebRTC.startScreenShare();
      }
      setIsScreenSharing(newState);
      toast({
        title: newState ? 'Screen sharing started' : 'Screen sharing stopped',
        status: newState ? 'success' : 'info',
        duration: 2000,
      });
    } catch (error) {
      console.error('Failed to toggle screen share:', error);
      toast({
        title: 'Error',
        description: 'Failed to toggle screen sharing',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const leaveMeeting = async () => {
    try {
      await mockWebRTC.leaveRoom();
      if (onLeave) onLeave();
    } catch (error) {
      console.error('Failed to leave meeting:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      const message = await mockWebRTC.sendMessage(newMessage);
      setChatMessages(prev => [...prev, {
        id: message.id,
        sender: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Box h="100vh" bg="gray.900" color="white">
      {/* Meeting Header */}
      <Flex 
        align="center" 
        justify="space-between" 
        p={4} 
        bg="gray.800" 
        borderBottom="1px solid" 
        borderColor="gray.700"
      >
        <VStack align="flex-start" spacing={1}>
          <Heading size="md">{meetingInfo.title}</Heading>
          <HStack spacing={2}>
            <Badge colorScheme="green">Live</Badge>
            <Text fontSize="sm" color="gray.400">
              ID: {meetingInfo.id} • Started at {meetingInfo.startTime}
            </Text>
          </HStack>
        </VStack>
        
        <HStack>
          <Button 
            leftIcon={<Users size={16} />} 
            variant="outline" 
            size="sm"
            onClick={() => setIsSettingsOpen(true)}
          >
            Participants ({participants.length})
          </Button>
          <Button 
            leftIcon={<MessageSquare size={16} />} 
            variant="outline" 
            size="sm"
            onClick={() => setIsChatOpen(true)}
          >
            Chat
          </Button>
        </HStack>
      </Flex>

      {/* Main Content */}
      <Flex h="calc(100vh - 140px)">
        {/* Video Area */}
        <Box flex={1} p={4} position="relative">
          {/* Remote Participants Grid */}
          <Flex h="100%" wrap="wrap" gap={4}>
            {/* Main Participant View */}
            <Box 
              flex="1 1 70%" 
              minW="300px" 
              h="100%" 
              bg="gray.800" 
              borderRadius="lg" 
              overflow="hidden"
              position="relative"
            >
              <Box 
                ref={remoteVideoRef} 
                w="100%" 
                h="100%" 
                bg="gray.700"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="gray.400">Participant Video</Text>
              </Box>
              <Box 
                position="absolute" 
                bottom={4} 
                left={4} 
                bg="rgba(0,0,0,0.5)" 
                px={3} 
                py={1} 
                borderRadius="full"
              >
                <Text fontSize="sm">Prof. Reyes</Text>
              </Box>
            </Box>
            
            {/* Local Video Preview */}
            <Box 
              flex="1 1 25%" 
              minW="200px" 
              h="30%" 
              minH="150px" 
              bg="gray.800" 
              borderRadius="lg" 
              overflow="hidden"
              position="relative"
            >
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box 
                position="absolute" 
                bottom={2} 
                left={2} 
                bg="rgba(0,0,0,0.5)" 
                px={2} 
                py={1} 
                borderRadius="full"
              >
                <Text fontSize="xs">You</Text>
              </Box>
              {!isVideoOn && (
                <Box 
                  position="absolute" 
                  top={0} 
                  left={0} 
                  right={0} 
                  bottom={0} 
                  bg="gray.900"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box 
                    w={16} 
                    h={16} 
                    borderRadius="full" 
                    bg="gray.700" 
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="xl">👤</Text>
                  </Box>
                </Box>
              )}
            </Box>
            
            {/* Additional Participants */}
            {[1, 2].map((id) => (
              <Box 
                key={id}
                flex="1 1 25%" 
                minW="200px" 
                h="30%" 
                minH="150px" 
                bg="gray.800" 
                borderRadius="lg" 
                overflow="hidden"
                position="relative"
              >
                <Box 
                  w="100%" 
                  h="100%" 
                  bg="gray.700"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="gray.400">Participant {id}</Text>
                </Box>
                <Box 
                  position="absolute" 
                  bottom={2} 
                  left={2} 
                  bg="rgba(0,0,0,0.5)" 
                  px={2} 
                  py={1} 
                  borderRadius="full"
                >
                  <Text fontSize="xs">Participant {id}</Text>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>

      {/* Controls */}
      <Flex 
        align="center" 
        justify="center" 
        p={4} 
        bg="gray.800" 
        borderTop="1px solid" 
        borderColor="gray.700"
        gap={4}
      >
        <IconButton
          icon={isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
          onClick={toggleMic}
          colorScheme={isMicOn ? 'gray' : 'red'}
          aria-label={isMicOn ? "Mute microphone" : "Unmute microphone"}
          size="lg"
          borderRadius="full"
        />
        
        <IconButton
          icon={isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
          onClick={toggleVideo}
          colorScheme={isVideoOn ? 'gray' : 'red'}
          aria-label={isVideoOn ? "Turn off camera" : "Turn on camera"}
          size="lg"
          borderRadius="full"
        />
        
        <IconButton
          icon={isScreenSharing ? <ScreenShareOff size={20} /> : <ScreenShare size={20} />}
          onClick={toggleScreenShare}
          colorScheme={isScreenSharing ? 'red' : 'gray'}
          aria-label={isScreenSharing ? "Stop screen share" : "Start screen share"}
          size="lg"
          borderRadius="full"
        />
        
        <IconButton
          icon={<Settings size={20} />}
          onClick={() => setIsSettingsOpen(true)}
          colorScheme="gray"
          aria-label="Meeting settings"
          size="lg"
          borderRadius="full"
        />
        
        <IconButton
          icon={<PhoneOff size={20} />}
          onClick={leaveMeeting}
          colorScheme="red"
          aria-label="Leave meeting"
          size="lg"
          borderRadius="full"
        />
      </Flex>

      {/* Chat Modal */}
      <Modal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Meeting Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={4} maxH="400px" overflowY="auto">
              {chatMessages.map((msg) => (
                <Box key={msg.id} bg="gray.700" p={3} borderRadius="lg">
                  <Flex justify="space-between" mb={1}>
                    <Text fontWeight="bold" color="brand.400">{msg.sender}</Text>
                    <Text fontSize="xs" color="gray.400">{msg.timestamp}</Text>
                  </Flex>
                  <Text>{msg.message}</Text>
                </Box>
              ))}
            </VStack>
            
            <Flex mt={4} gap={2}>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                bg="gray.700"
                borderColor="gray.600"
                _focus={{ borderColor: 'brand.500' }}
              />
              <Button 
                onClick={sendMessage}
                colorScheme="brand"
                isDisabled={!newMessage.trim()}
              >
                Send
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Participants Modal */}
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} size="md">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Meeting Participants</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={3} maxH="400px" overflowY="auto">
              {participants.map((participant) => (
                <Flex 
                  key={participant.id} 
                  align="center" 
                  justify="space-between" 
                  p={3} 
                  bg="gray.700" 
                  borderRadius="lg"
                >
                  <HStack>
                    <Box w={8} h={8} borderRadius="full" bg="gray.600" display="flex" alignItems="center" justifyContent="center">
                      <Text fontSize="sm">👤</Text>
                    </Box>
                    <VStack align="flex-start" spacing={0}>
                      <Text fontWeight="medium">{participant.name}</Text>
                      {participant.isHost && (
                        <Text fontSize="xs" color="brand.400">Host</Text>
                      )}
                    </VStack>
                  </HStack>
                  <Badge colorScheme={participant.isHost ? "green" : "gray"}>
                    {participant.isHost ? "Host" : "Participant"}
                  </Badge>
                </Flex>
              ))}
            </VStack>
            
            <Box mt={6} p={4} bg="gray.700" borderRadius="lg">
              <Heading size="sm" mb={3}>Meeting Settings</Heading>
              <VStack align="stretch" spacing={3}>
                <Flex justify="space-between" align="center">
                  <Text>Microphone</Text>
                  <Badge colorScheme={isMicOn ? "green" : "red"}>
                    {isMicOn ? "On" : "Off"}
                  </Badge>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text>Camera</Text>
                  <Badge colorScheme={isVideoOn ? "green" : "red"}>
                    {isVideoOn ? "On" : "Off"}
                  </Badge>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text>Screen Sharing</Text>
                  <Badge colorScheme={isScreenSharing ? "green" : "red"}>
                    {isScreenSharing ? "On" : "Off"}
                  </Badge>
                </Flex>
              </VStack>
            </Box>
          </ModalBody>
          
          <ModalFooter>
            <Button 
              onClick={() => setIsSettingsOpen(false)}
              colorScheme="brand"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default VideoConference;