import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { SubscriptionServiceService } from '../subscription-service.service';
import { Users } from '../users';

@Component({
  selector: 'app-email-subscribe-form',
  templateUrl: './email-subscribe-form.component.html',
  styleUrls: ['./email-subscribe-form.component.css']
})
export class EmailSubscribeFormComponent implements OnInit {

  public user: Users;
  sameEmailIdExists: boolean = false;
  show: boolean = false;

  constructor(private subscriptionService: SubscriptionServiceService) {
    this.user = new Users('', '');
  }
  // List of cities
  cities = ['Boston', 'Seattle', 'Philadelphia', 'New York City', 'Tampa',
    'Los Angeles', 'San Francisco', 'Miami', 'Washington DC', 'Chicago', 'Houston',
    'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Indianapolis', 'Columbus', 'Charlotte', 'Detroit', 'Memphis', 'Denver', 'Baltimore',
    'Portland', 'Oklahoma', 'Las Vegas', 'Milwaukee', 'Tucson', 'Fresno', 'Atlanta', 'Riverside',
    'Buffalo', 'Orlando', 'Reno', 'Fremont', 'Hawaii'];

  model = new Email('', this.cities[1]);

  submitted = false;

  res = '';

  onSubmit() {
    this.sameEmailIdExists = false;
    this.show = false;
    this.user.emailId = this.model.email;
    this.user.city = this.model.city;
    this.subscriptionService.addSubscriber(this.user).subscribe(
      (res) => this.show = true,
      (error) => this.sameEmailIdExists = true
    );
  }


  ngOnInit() {
    this.sameEmailIdExists = false;
    this.show = false;
  }
}
