import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from '../_modules/member';
import { PaginationResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginatedResult: PaginationResult<Member[]> = new PaginationResult<Member[]>();

  constructor(private http: HttpClient) { }

  getMembers(page?: number, itemsPrePage?: number) {
    let params = new HttpParams();

    if(page !== null && itemsPrePage !== null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPrePage.toString());
    }

    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
        map(response => {
          this.paginatedResult.result = response.body;
          if(response.headers.get('Pagination') !== null){
            this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return this.paginatedResult;
        })
    )
  }

  getMember(username: string) {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId)
  }
}