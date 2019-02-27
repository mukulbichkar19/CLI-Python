import { Component, OnInit } from '@angular/core';
import { Email }    from '../email';
import { SubscriptionServiceService } from '../subscription-service.service';
import { Users } from '../users';

@Component({
  selector: 'app-email-subscribe-form',
  templateUrl: './email-subscribe-form.component.html',
  styleUrls: ['./email-subscribe-form.component.css']
})
export class EmailSubscribeFormComponent implements OnInit {

  public user: Users;
  constructor(private subscriptionService: SubscriptionServiceService) {
    this.user = new Users('','');
  }

  cities = ['Boston', 'Seattle', 'Philadelphia', 'New York City', 'Tampa',
'Los Angeles', 'San Francisco', 'Miami', 'Washington DC'];

  model = new Email('abcdef@gmail.com',this.cities[1]);

  submitted = false;

  res = '';

  onSubmit() {
      this.user.emailId = this.model.email;
      this.user.city = this.model.city;
      this.subscriptionService.addSubscriber(this.user).subscribe((data) => console.log(data));
   }




  ngOnInit() {
    this.subscriptionService.getUsers().subscribe((data) => console.log(data));
  }

}
