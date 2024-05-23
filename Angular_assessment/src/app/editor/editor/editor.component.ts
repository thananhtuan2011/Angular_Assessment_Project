import { Component, OnInit } from '@angular/core';
import { quillConfig } from './config/Quill_config';
import { RxjsServiceService } from '../../services/rxjs-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  title!: string;
  content!: string;
  public quillConfig: {} | undefined;

  constructor(private _rxjs_service: RxjsServiceService, private router: Router) {

  }

  ngOnInit(): void {
    this.quillConfig = quillConfig;
  }
  Publish() {
    let object_data =
      [
        {
          title: this.title,
          content: this.content
        }
      ]

    this.router.navigate(['article/preview'])
    this._rxjs_service.EventData = object_data;
  }

}
