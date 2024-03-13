import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/side-nav/dialog/dialog.component';
import { NoteData } from 'src/app/core/interfaces/note-data';
import { UserData } from 'src/app/core/interfaces/user-data';
import { NotesService } from 'src/app/core/services/notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {

  allNotes: NoteData[] = [];
  searchValue: string = '';
  constructor(
    public dialog: MatDialog,
    private _NotesService: NotesService
  ) { }

  ngOnInit(): void {
    this._NotesService.getUserNotes().subscribe({
      next: (res) => {
        if (res.msg === 'done') {
          this.allNotes = res.notes;
        }
        console.log(res);

      }
    });
  }

  openDialog(noteData?: NoteData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data: { title: noteData?.title, content: noteData?.content, _id: noteData?._id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
      // this.animal = result;
    });
  }

  deleteNote(noteId: string, index: number) {
    console.log(noteId, index);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(() => {
          this._NotesService.handleDeleteNote(noteId).subscribe({
            next: (res) => {
              console.log(res);
              if (res.msg === 'done') {
                this.allNotes.splice(index, 1);
                this.ngOnInit();
              }
            },
            error: (err) => {
              console.log(err.error.msg);
            }
          });
        });
      }
    });

  }
  updateNote(editNode: NoteData, index: number) {
    console.log(editNode, index);
    this.openDialog({ title: editNode.title, content: editNode.content, _id: editNode._id });
  }
}
