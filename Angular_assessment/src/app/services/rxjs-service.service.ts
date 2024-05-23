import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../Post.interface';

@Injectable({
  providedIn: 'root'
})
export class RxjsServiceService {

  private readonly _share_data = new BehaviorSubject<Post[]>([]);
  readonly _share_data$ = this._share_data.asObservable();
  get EventData(): Post[] {
    return this._share_data.getValue();
  }
  set EventData(val: Post[]) {
    this._share_data.next(val);
  }
  constructor() { }
}
