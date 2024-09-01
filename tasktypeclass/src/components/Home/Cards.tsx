import { useState, FC } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { RiPencilLine } from 'react-icons/ri';

interface Task {
  id: string;
  title: string;
  desc?: string;
  status: 'Incomplete' | 'Complete';
  isImportant: boolean;
}

interface CardsProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  handleEdit: (task: Task) => void;
  toggleStatus: (task: Task) => void;
  toggleImportant: (id: string) => void;
  className?: string;
}

const Cards: FC<CardsProps> = ({ tasks, deleteTask, handleEdit, toggleStatus, toggleImportant, className }) => {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedTaskId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className={`grid grid-cols-3 gap-4 p-4 ${className}`}>
      {tasks.map(task => (
        <div key={task.id} className="bg-gray-800 p-4 rounded">
          <h3 className="font-semibold text-xl text-white">{task.title}</h3>
          <hr className="my-2 border-gray-500" />
          <p
            className={`text-white font-semibold text-base mb-4 ${
              expandedTaskId === task.id ? '' : 'line-clamp-2'
            }`}
          >
            {task.desc || 'No description available.'}
          </p>
          <button
            aria-label={expandedTaskId === task.id ? 'Show less' : 'Show more'}
            className="font-semibold text-sm text-blue-500 mb-2"
            onClick={() => toggleExpand(task.id)}
          >
            {expandedTaskId === task.id ? 'Show Less' : 'Show More'}
          </button>
          <div className="font-semibold text-sm flex justify-between items-center">
            <button
              aria-label={`Mark task as ${task.status === 'Incomplete' ? 'Complete' : 'Incomplete'}`}
              className={`${
                task.status === 'Incomplete' ? 'bg-red-500' : 'bg-green-500'
              } rounded p-2`}
              onClick={() => toggleStatus(task)}
            >
              {task.status}
            </button>
            <div className="flex space-x-4 text-white text-xl">
              <button
                aria-label={task.isImportant ? 'Mark as not important' : 'Mark as important'}
                onClick={() => toggleImportant(task.id)}
              >
                {task.isImportant ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>
              <button
                aria-label="Edit task"
                onClick={() => handleEdit(task)}
              >
                <RiPencilLine />
              </button>
              <button
                aria-label="Delete task"
                onClick={() => deleteTask(task.id)}
              >
                <MdDeleteOutline />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
