import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';


// https://www.freakyjolly.com/post-image-to-node-js-server-using-angular-10-9-8/#.X8hnqnVKg_I

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {

  title = 'angular-image-file-upload-tutorial';

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }

  onFormSubmit() {

    if (!this.fileUploadForm.get('uploadedImage').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
   
    formData.append('newimage', this.fileUploadForm.get('uploadedImage').value);
  // that name  newimage  must match server value!


    this.http
      .post<any>('http://localhost:3000/upload/upload', formData).subscribe(response => {
      //.post<any>('https://zfall2022node.azureweb/upload/upload', formData).subscribe(response => {
        console.log(response);
        alert('here is the picID to use to add in hero detail page: ' + response.document);
        if (response.statusCode === 200) {
          // Reset the file input
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = undefined;
        }
      }, er => {
        console.log(er);
        alert(er.error);
      });
  }


}




