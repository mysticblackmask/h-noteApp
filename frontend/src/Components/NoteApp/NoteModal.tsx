import React from 'react';
import { Modal, Form, Input } from 'antd';

interface NoteModalProps {
  visible: boolean;
  note: { title: string; content: string };
  onCancel: () => void;
  onSubmit: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isEditing: boolean;
}

const NoteModal: React.FC<NoteModalProps> = ({
  visible,
  note,
  onCancel,
  onSubmit,
  onChange,
  isEditing,
}) => (
  <Modal
    title={isEditing ? 'Edit Note' : 'Add Note'}
    open={visible}
    onCancel={onCancel}
    onOk={onSubmit}
  >
    <Form layout='vertical'>
      <Form.Item label='Title'>
        <Input
          name='title'
          value={note.title}
          onChange={onChange}
          placeholder='Enter note title'
        />
      </Form.Item>
      <Form.Item label='Content'>
        <Input.TextArea
          name='content'
          value={note.content}
          onChange={onChange}
          placeholder='Enter note content'
          rows={3}
        />
      </Form.Item>
    </Form>
  </Modal>
);

export default NoteModal;
