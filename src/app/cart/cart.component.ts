import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IBike {
  id?: number;
  image?: any,
  description: string;
  price: number;
  quantity: number;
  subTotal?: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  bikes: Array<IBike> = [];
  nameParams = '';
  params: string;

  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const savedBikes = JSON.parse(localStorage.getItem('bikes'));

    if (savedBikes && savedBikes.length > 0) {
      this.bikes = savedBikes;
    } else {
      this.bikes = await this.loadTestsFromJson();
    };
  }

  async loadTestsFromJson() {
    const tests = await this.http.get('assets/inventory.json').toPromise();
    return tests.json();
  }

  save(key: string, data: Array<IBike>) {
    this.saveToLocalStorage(key, data);
    this.toastService.showToast('success', 5000, 'Success: Items Saved');
 
  }
 

  saveToLocalStorage(key: string, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  addBike1() {
    const bike: IBike = {
      id: 1,
      image: "../../assets/bike1.jpeg",
      description: null,
      price: 5000,
      quantity: 1
    }
    this.bikes.unshift(bike);
    this.saveToLocalStorage('bikes', this.bikes);
  }
  addBike2() {
    const bike: IBike = {
      id: 2,
      image: "../../assets/bike2.jpeg",
      description: null,
      price: 4000,
      quantity: 1,
    }
    let subTotal= bike.price*bike.quantity;
    this.bikes.unshift(bike);
    this.saveToLocalStorage('bikes', this.bikes);
  }
  addBike3() {
    const bike: IBike = {
      id: 3,
      image: "../../assets/bike3.jpeg",
      description: null,
      price: 3000,
      quantity: 1
    }
    this.bikes.unshift(bike);
    this.saveToLocalStorage('bikes', this.bikes);
  }



  deleteItem(index: number) {
    this.bikes.splice(index, 1);
    this.saveToLocalStorage('bikes', this.bikes);
  }


  checkout() {

    if (this.nameParams == null || this.nameParams == '') {
      this.toastService.showToast('warning', 2000, 'Name must be defined');
    } else if (this.nameParams.indexOf(', ') === -1) {
      this.toastService.showToast('warning', 2000, 'Name must have a comma');

    } else {
      // this.router.navigate(['invoice']);

      let tax = .15;
      let firstName, lastName, indexOfComma, fullName, subTotal;



      indexOfComma = this.nameParams.indexOf(', ');
      firstName = this.nameParams.slice(indexOfComma + 1, this.nameParams.length);
      lastName = this.nameParams.slice(0, indexOfComma);
      fullName = firstName + '' + lastName;


     

      const total = this.bikes.reduce((acc: number, item: IBike) => {
        acc += item.quantity * item.price;
        console.log('from checkout-->', total)
        return acc;
      }, 0);
      // for (let i = 0, len = this.bikes.length; i < len; i++) {
      //   console.log('i----> ', i, 'this.tests[i]', this.bikes[i]);
      //   let test = this.bikes[i];
      //   let total = this.bikes.price * this.bikes.quantity;
      //   }


        this.router.navigate(['invoice', {
          // tax: tax,
          // subTotal: subTotal,
          // total: total,
          fullName: fullName,
        }]);

        //other possible function to send data to home:
        //const output = {pointsPossible: pointsPossible,
        // pointsReceived: pointsReceived,
        // percentage: percentage,
        // fullName: fullName,
        // grade: grade};
        //this.saveToLocalStorage('output', output);
      }

    }


  }
