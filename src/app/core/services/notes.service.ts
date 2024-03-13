import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { NoteData } from '../interfaces/note-data';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient: HttpClient) { }

  handleAddNote(newNote: NoteData): Observable<any> {
    return this._HttpClient.post(environment.noteUrl, newNote
      //   , {
      //   headers: {
      //     token: localStorage.getItem('token') || ''
      //   }
      // }
    );
  }
  getUserNotes(): Observable<any> {
    return this._HttpClient.get(environment.noteUrl
      //   , {
      //   headers: {
      //     token: localStorage.getItem('token') || ''
      //   }
      // }
    );
  }
  handleDeleteNote(noteId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.noteUrl}${noteId}`
      // , {
      //   headers: {
      //     token: localStorage.getItem('token') || ''
      //   }
      // }
    );
  }
  handleUpdateNote(newNote: NoteData, noteId: string): Observable<any> {
    return this._HttpClient.put(`${environment.noteUrl}${noteId}`, newNote
      // , {
      //   headers: {
      //     token: localStorage.getItem('token') || ''
      //   }
      // }
    );
  }
}
