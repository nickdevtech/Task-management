import React from 'react';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div>
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <div className="task-content">
            <h3>{task.name}</h3>
            <p>{task.description}</p>
          </div>
          <div className="task-actions">
            <button className="edit" onClick={() => onEdit(task)}>
              <i className="fas fa-edit"></i> Edit
            </button>
            <button className="delete" onClick={() => onDelete(task.id)}>
              <i className="fas fa-trash-alt"></i> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
