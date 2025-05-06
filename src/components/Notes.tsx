
import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage when updated
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (title.trim() === '') {
      toast.error('Please add a title for your note');
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: Date.now()
    };

    setNotes([...notes, newNote]);
    setTitle('');
    setContent('');
    toast.success('Note saved successfully');
  };

  const handleEditNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNoteId(note.id);
  };

  const handleUpdateNote = () => {
    if (!editingNoteId) return;

    setNotes(notes.map(note => 
      note.id === editingNoteId
        ? { ...note, title, content }
        : note
    ));

    setTitle('');
    setContent('');
    setEditingNoteId(null);
    toast.success('Note updated successfully');
  };

  const handleCancelEdit = () => {
    setTitle('');
    setContent('');
    setEditingNoteId(null);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    
    if (editingNoteId === id) {
      setTitle('');
      setContent('');
      setEditingNoteId(null);
    }
    
    toast.success('Note deleted successfully');
  };

  return (
    <div className="w-full animate-fade-in">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>{editingNoteId ? 'Edit Note' : 'Add New Note'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            
            <Textarea
              placeholder="Write your note here..."
              className="min-h-[120px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            <div className="flex gap-2">
              {editingNoteId ? (
                <>
                  <Button onClick={handleUpdateNote}>Update Note</Button>
                  <Button variant="ghost" onClick={handleCancelEdit}>Cancel</Button>
                </>
              ) : (
                <Button onClick={handleAddNote}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.length === 0 ? (
          <div className="col-span-full text-center p-8 border rounded-lg border-dashed">
            <p className="text-muted-foreground">No notes yet. Add your first note above.</p>
          </div>
        ) : (
          notes.map(note => (
            <Card key={note.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditNote(note)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {note.content || <span className="italic">No content</span>}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
