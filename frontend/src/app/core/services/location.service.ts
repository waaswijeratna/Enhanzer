import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private http = inject(HttpClient);

  getLocations(): Observable<Location[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Location`).pipe(
      map(locations =>
        locations.map(location => ({
          location_Code: location.location_Code ?? location.locationCode ?? '',
          location_Name: location.location_Name ?? location.locationName ?? ''
        }))
      )
    );
  }
}