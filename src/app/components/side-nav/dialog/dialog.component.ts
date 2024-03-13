import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteData } from 'src/app/core/interfaces/note-data';
import { NotesService } from 'src/app/core/services/notes.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    private _NotesService: NotesService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteData,
  ) {
    console.log(data);

  }

  noteForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.title ? this.data.title : ''),
    content: new FormControl(this.data.content ? this.data.content : ''),
  });

  handleUserAction(form: FormGroup) {
    if (!this.data.title && !this.data.content) {
      this.addNewNote(form.value);
    } else {
      this.updateNewNote(form.value);
    }
  }

  addNewNote(newNote: NoteData) {
    this._NotesService.handleAddNote(newNote).subscribe({
      next: (res) => {
        if (res.msg === 'done') {
          this.dialogRef.close();
        }
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.msg);
      }
    });
  }
  updateNewNote(newNote: NoteData) {
    this._NotesService.handleUpdateNote(newNote, this.data._id).subscribe({
      next: (res) => {
        if (res.msg === 'done') {
          this.dialogRef.close();
        }
        console.log(res);
      },
      error: (err) => {
        console.log(err.error.msg);
      }
    });
  }
}
