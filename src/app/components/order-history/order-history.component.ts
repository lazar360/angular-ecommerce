import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  storage: Storage = sessionStorage;
  orderHistoryList: OrderHistory[] = [];
  orderHistoryListBuffer: OrderHistory[] = [];

  constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);
    console.log(`theEmail  : ${theEmail}`);
    this.orderHistoryService.getOrderHistory(theEmail).subscribe((data) => {
      this.orderHistoryList = data._embedded.orders;
      this.copyOrderHistoryList(this.orderHistoryList);
    });
  }

  copyOrderHistoryList(orderHistoryList: any){
    this.orderHistoryListBuffer = JSON.parse(JSON.stringify(orderHistoryList));
    console.log("orderHistoryListBuffer" + JSON.stringify(this.orderHistoryListBuffer.find(i => i.totalQuantity ===1)));
  }
}
