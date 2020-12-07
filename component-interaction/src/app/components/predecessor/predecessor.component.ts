import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-predecessor',
  templateUrl: './predecessor.component.html',
  styleUrls: ['./predecessor.component.scss'],
})
export class PredecessorComponent implements OnInit {
  serverName: string;
  serverType: string;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.communicationService.serverData.subscribe((data) => {
      this.serverName = data.serverName;
      this.serverType = data.serverType;
    });
  }
}
