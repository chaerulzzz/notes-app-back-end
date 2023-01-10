const {
  addNoteHandler,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotes,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteById,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateNoteById,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteById,
  },
];

module.exports = routes;
