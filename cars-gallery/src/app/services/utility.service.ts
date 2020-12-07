import { DataStorageService } from './data-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {
  constructor(private dataStorageService: DataStorageService) {}

  getCars() {
    return this.dataStorageService.getCars();
  }
}
