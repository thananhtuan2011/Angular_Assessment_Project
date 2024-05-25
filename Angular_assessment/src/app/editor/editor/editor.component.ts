import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import ImageTool from "@editorjs/image";
import LinkTool from '@editorjs/link';
import Header from "@editorjs/header";
import VideoTool from './video-tool'; // Adjust the path accordingly
import { RxjsServiceService } from '../../services/rxjs-service.service';
import { Router } from '@angular/router';

function _getBase64(file, onLoadCallback) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () { return resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {

  @ViewChild('editor', { read: ElementRef })
  editorElement!: ElementRef;

  private editor!: EditorJS;

  constructor(private _rxjs_service: RxjsServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  private initializeEditor() {
    this.editor = new EditorJS({
      minHeight: 200,
      autofocus: true,
      placeholder: 'This is the first line of text',
      holder: this.editorElement.nativeElement,
      tools: {
        header: {
          class: Header,
          shortcut: 'CMD+SHIFT+H'
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
          }
        },
        image: {
          class: ImageTool,

          config: {
            uploader: {
              uploadByFile(file) {
                return _getBase64(file, function (e) { }).then((data) => {
                  return {
                    success: 1,
                    file: {
                      url: data
                    }
                  }
                })
              }
            },

          },

        },
        video: {
          class: VideoTool,
          config: {
            // No backend endpoint required for local video upload
          }
        }
        // image: SimpleImage
      }
    });
  }

  showEditorData() {
    this.editor.save().then(data => {
      console.dir(data);
      this.router.navigate(['article/preview'])
      this._rxjs_service.EventData = data;
    })
  }

}
