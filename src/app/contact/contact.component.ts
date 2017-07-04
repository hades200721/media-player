import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', Validators.required),
      'message': new FormControl('', [Validators.required, Validators.minLength(10)])
    })
  }

  onSubmit() {
    console.log('name: ' + this.contactForm.value.name);
    console.log('email: ' + this.contactForm.value.email);
    console.log('message: ' + this.contactForm.value.message);
  }

}
