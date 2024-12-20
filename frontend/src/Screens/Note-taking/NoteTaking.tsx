import React, { useState } from 'react';
import { Input, Card, Modal, Typography, message, Row, Col, Empty } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ReactMic } from 'react-mic';
import AppButton from '../../Components/Button/AppButton';
import NoteModal from '../../Components/NoteApp/NoteModal';

const { Title, Text } = Typography;

interface Note {
  title: string;
  content: string;
  color: string;
  audioUrl?: string;
}

export default function NoteApp() {
  const [note, setNote] = useState<Omit<Note, 'color' | 'audioUrl'>>({
    title: '',
    content: '',
  });
  const [notes, setNotes] = useState<Note[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVoiceModalVisible, setIsVoiceModalVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!note.title || !note.content) {
      message.error('Please fill in all fields');
      return;
    }

    if (editIndex === null) {
      const newNote: Note = {
        ...note,
        color: getRandomColor(),
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } else {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = {
        ...note,
        color: updatedNotes[editIndex].color,
      };
      setNotes(updatedNotes);
      setEditIndex(null);
    }

    setNote({ title: '', content: '' });
    setIsModalVisible(false);
    message.success('Note saved successfully!');
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setNote({
      title: notes[index].title,
      content: notes[index].content,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (index: number) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    message.success('Note deleted successfully!');
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = (recordedBlob: any) => {
    setIsRecording(false);
    const audioUrl = URL.createObjectURL(recordedBlob.blob);
    const newNote: Note = {
      title: 'Voice Note',
      content: '',
      color: getRandomColor(),
      audioUrl,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setIsVoiceModalVisible(false);
    message.success('Voice note recorded successfully!');
  };

  const filteredNotes = notes.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Row
      style={{
        minHeight: '100vh',
        padding: '10px',
      }}
      justify='center'
    >
      <Col xs={24} sm={22} md={20} lg={18} xl={16}>
        <Typography.Title level={3}>Notes App</Typography.Title>
        <Input.Search
          placeholder='Search notes...'
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px', marginTop: '5px' }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <AppButton
            type='primary'
            icon={<PlusOutlined />}
            textStyle={{
              display: 'flex',
              alignItems: 'baseline',
              marginRight: '10px',
            }}
            onClick={() => setIsVoiceModalVisible(true)}
          >
            Add Voice Note
          </AppButton>
          <AppButton
            type='primary'
            icon={<PlusOutlined />}
            textStyle={{
              display: 'flex',
              alignItems: 'baseline',
            }}
            onClick={() => setIsModalVisible(true)}
          >
            Add Note
          </AppButton>
        </div>
        <Row gutter={[24, 24]}>
          {filteredNotes.length > 0 ? (
            filteredNotes.map((item, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card
                  style={{
                    backgroundColor: item.color,
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 267,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Title level={3} style={{ color: '#fff', margin: 0 }}>
                      {item.title}
                    </Title>
                    <div>
                      <EditOutlined
                        key='edit'
                        onClick={() => handleEdit(index)}
                        style={{
                          marginRight: '10px',
                          fontSize: '20px',
                          color: 'white',
                        }}
                      />
                      <DeleteOutlined
                        key='delete'
                        onClick={() => handleDelete(index)}
                        style={{ fontSize: '20px', color: 'white' }}
                      />
                    </div>
                  </div>
                  <Text
                    style={{
                      color: '#fff',
                      marginTop: '20px',
                      fontSize: '20px',
                    }}
                  >
                    {item.content}
                  </Text>
                  <div>
                    {item.audioUrl && (
                      <div>
                        <div style={{ display: 'none' }}>
                          <audio ref={(ref) => setAudio(ref)} controls>
                            <source src={item.audioUrl} type='audio/wav' />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                        <div
                          style={{
                            marginTop: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                          }}
                        >
                          <AppButton
                            type='primary'
                            onClick={handlePlayPause}
                            disabled={!item.audioUrl}
                          >
                            {isPlaying ? 'Pause' : 'Play'}
                          </AppButton>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Empty description='You don’t have any notes' />
            </Col>
          )}
        </Row>

        <NoteModal
          visible={isModalVisible}
          note={note}
          onChange={handleChange}
          onCancel={() => {
            setIsModalVisible(false);
            setEditIndex(null);
            setNote({ title: '', content: '' });
          }}
          onSubmit={handleSubmit}
          isEditing={editIndex !== null}
        />

        <Modal
          title='Add Voice Note'
          open={isVoiceModalVisible}
          onCancel={() => setIsVoiceModalVisible(false)}
          footer={null}
          style={{ minWidth: '780px', padding: '20px' }}
        >
          <div style={{ textAlign: 'center' }}>
            <div>
              <ReactMic
                record={isRecording}
                onStop={handleStopRecording}
                strokeColor='#000000'
                mimeType='audio/wav'
                backgroundColor='#ffffff'
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <AppButton
                type='primary'
                onClick={handleStartRecording}
                disabled={isRecording}
              >
                Start Recording
              </AppButton>
              <AppButton
                type='text'
                onClick={() => setIsRecording(false)}
                disabled={!isRecording}
                style={{ marginLeft: '10px' }}
              >
                Stop Recording
              </AppButton>
            </div>
          </div>
        </Modal>
      </Col>
    </Row>
  );
}
