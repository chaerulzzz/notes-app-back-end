const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const {title, tags, body} = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = {id, createdAt, updatedAt, title, tags, body};

  notes.push(newNotes);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);

  return response;
};

const getAllNotes = () => ({
  status: 'success',
  data: {notes},
});

const getNoteById = (request, h) => {
  const {id} = request.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note != undefined) {
    return {
      status: 'success',
      data: {note},
    };
  }

  const response = h.response({
    status: 'failed',
    message: 'catatan tidak ditemukan',
  });

  response.code(400);
  return response;
};

const updateNoteById = (request, h) => {
  const {id} = request.params;
  const updatedAt = new Date().toISOString();
  const {title, tags, body} = request.payload;

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'data berhasil disimpan',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Data tidak ditemukan',
  });

  response.code(400);
  return response;
};

const deleteNoteById = (request, h) => {
  const {id} = request.params;

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Sukses menghapus data',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Gagal menghapus data',
  });
  response.code(200);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
};
