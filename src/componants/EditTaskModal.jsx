import { useState, useEffect } from "react";

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ ...task, title, description });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Edit Task</h3>

        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSave}>Save</button>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
