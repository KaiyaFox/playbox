import { useState } from 'react';
import { saveNote } from '@/app/supabase/noteHelper';

export default function Notes() {
    const [noteText, setNoteText] = useState('');

    const handleClick = () => {
        saveNote(noteText, 5, '1234');
    };

    return (
        <div>
            <ul>
                <textarea
                    style={{ resize: 'both', maxWidth: '300px', maxHeight: '300px', minWidth: '300px', minHeight: '200px' }}
                    className="textarea textarea-lg max-h-50"
                    placeholder="Write some notes on this song"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
                <div className="divider">
                    <button onClick={handleClick} className="btn btn-wide btn">Save</button>
                </div>
            </ul>
        </div>
    );
}