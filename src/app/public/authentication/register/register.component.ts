import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onMail(mail) {
    if (event['data'] == '@' && ((mail.value.match(/@/g) || []).length == 1)){
      if (mail.value.includes("s") && mail.value.replace(/[^0-9]/g,"").length == 7){
        console.log("Dit is een studenten mail!");
        mail.value = mail.value + "student.hsleiden.nl";
      } else {
        console.log("Dit is geen studenten mail!");
        mail.value = mail.value + "hsleiden.nl";
      }
    }
  }

  onRegister(firstpass, secondpass) {
    if (firstpass.value != secondpass.value) {
      //firstpass.borderColor
      alert("The entered passwords are not the same!");
    }
  }

}
