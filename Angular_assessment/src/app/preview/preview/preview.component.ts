import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxjsServiceService } from '../../services/rxjs-service.service';
import { Subscription } from 'rxjs';
import { Post } from '../../Post.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  title!: string;
  content!: SafeHtml
  constructor(private router: Router, private _rxjs_service: RxjsServiceService, private sanitizer: DomSanitizer) {


  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.forEach((sb) => sb.unsubscribe());
    }
  }
  _Back() {
    this.router.navigateByUrl("")
  }
  LoadData() {
    const sb = this._rxjs_service._share_data$.subscribe(res => {
      if (res) {
        res.forEach(el => {
          this.title = el.title,
            this.content = el.content == null ? "" : this.sanitizer.bypassSecurityTrustHtml(el.content);
        }
        )
      }
    }
    )
    this._subscriptions.push(sb)
  }
  ngOnInit(): void {
    this.LoadData();
  }

}
