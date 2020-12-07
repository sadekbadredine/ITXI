import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface server {
  serverName: string;
  serverType: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  serverData = new Subject<server>();
}
