import Quill from 'quill'
// import { VideoHandler, ImageHandler, Options } from 'ngx-quill-upload';
import ImageResize from 'quill-image-resize-module';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'

// Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)
Quill.register('modules/imageResize', ImageResize);
// Quill.register('modules/imageHandler', ImageHandler);
// Quill.register('modules/videoHandler', VideoHandler);

// import Screenfull from "screenfull";
// import { Screenfull } from "screenfull";
// const screenfull = _screenfull as Screenfull;
// declare const screenfull: screenfull.Screenfull | (Partial<screenfull.Screenfull> & {isEnabled: false});    
// declare const canUse = () => ScreenFull | false;

var icons = Quill.import('ui/icons');
// icons['bold'] = '<i class="fa fa-bold" aria-hidden="true"></i>';
icons['fullscreen'] = '<i class="fa fa-expand" style="color: #444"></i>';
// var customButton = document.querySelector('.ql-fullscreen');
// customButton.addEventListener('click', function() {
// //   if (Screenfull.isEnabled) {
//     console.log('requesting fullscreen');
//     // Screenfull.request();
// //   } else {
//     // console.log('Screenfull not enabled');
// //   }
// });

const formats = [
    'background',
    'bold',
    'color',
    'font',
    'code',
    'italic',
    'link',
    'size',
    'strike',
    'script',
    'underline',
    'blockquote',
    'header',
    'indent',
    'list',
    'align',
    'direction',
    'code-block',
    'formula',
    // 'image',
    // 'video'
];

var bindings = {
    // This will overwrite the default binding also named 'tab'
    tab: {
        key: 9,
        handler: function () {
            // Handle tabaler
            // alert('9')
        }
    },

    // There is no default binding named 'custom'
    // so this will be added without overwriting anything
    custom: {
        key: 'B',
        shiftKey: true,
        handler: function (range, context) {
            // Handle shift+b
        }
    },

    // list: {
    //   key: 'backspace',
    //   format: ['list'],
    //   handler: function(range, context) {
    //     if (context.offset === 0) {
    //       // When backspace on the first character of a list,
    //       // remove the list instead
    //       this.quill.format('list', false, Quill.sources.USER);
    //     } else {
    //       // Otherwise propogate to Quill's default
    //       return true;
    //     }
    //   }
    // }
};


const quillConfig = {
    // keyboard: {
    //   bindings: {
    //     // This will overwrite the default binding also named 'tab'
    //     tab: {
    //       key: 9,
    //       handler: function() {
    //         // Handle tabaler
    //         // alert('9')
    //       }
    //     },

    //     // There is no default binding named 'custom'
    //     // so this will be added without overwriting anything
    //     custom: {
    //       key: 'B',
    //       shiftKey: true,
    //       handler: function(range, context) {
    //         // Handle shift+b
    //       }
    //     },
    //   }
    // },
    toolbar: {
        container: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            //   ['code-block'],
            //   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'color': [] }, { 'background': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            //   [{ 'font':[]}],
            [{ 'align': [] }],

            //   ['clean'],                                         // remove formatting button

            ['link', 'image', 'video', 'formula'],

            ['fullscreen']

        ],
        // handlers: {
        //     'fullscreen': customBoldHandler
        //   },
    },
    // [

    //     // [{ 'font': [] }, { 'size': [] }],
    //     //   [ 'bold', 'italic', 'underline', 'strike' ],
    //     //   [{ 'color': [] }, { 'background': [] }],
    //     //   [{ 'script': 'super' }, { 'script': 'sub' }],
    //     //   [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
    //     //   [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
    //     //   [ 'direction', { 'align': [] }],
    //     //   [ 'link', 'image', 'video', 'formula' ],
    //     //   [ 'clean' ]
    // ],



    // imageHandler: {
    //     upload: (file) => {
    //         return new Promise((resolve, reject) => {

    //             if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') { // File types supported for image
    //                 if (file.size < 1000000) { // Customize file size as per requirement

    //                     // Sample API Call
    //                     const uploadData = new FormData();
    //                     uploadData.append('file', file, file.name);

    //                     let url = environment.HOST_JEETEAM_API + '/api/topic/uploadimg';

    //                     var xhr;
    //                     xhr = new XMLHttpRequest();
    //                     xhr.withCredentials = false;
    //                     xhr.open('POST', environment.HOST_JEETEAM_API + '/api/topic/uploadimg');
    //                     xhr.onload = function () {
    //                         var json;
    //                         if (xhr.status < 200 || xhr.status >= 300) {
    //                             reject('HTTP Error: ' + xhr.status);
    //                             return;
    //                         }
    //                         json = JSON.parse(xhr.responseText);
    //                         if (!json || typeof json.imageUrl != 'string') {
    //                             reject('Invalid JSON: ' + xhr.responseText);
    //                             return;
    //                         }
    //                         resolve(json.imageUrl);
    //                     };
    //                     xhr.send(uploadData);
    //                 } else {
    //                     reject('Size too large');
    //                     // Handle Image size large logic 
    //                 }
    //             } else {
    //                 reject('Unsupported type');
    //                 // Handle Unsupported type logic
    //             }
    //         });
    //     },
    //     accepts: ['png', 'jpg', 'jpeg', 'jfif'] // Extensions to allow for images (Optional) | Default - ['jpg', 'jpeg', 'png']
    // } as Options,

    // videoHandler: {
    //     upload: (file) => {
    //         return // your uploaded video URL as Promise<string>
    //     },
    //     accepts: ['mpeg', 'avi']  // Extensions to allow for videos (Optional) | Default - ['mp4', 'webm']
    // } as Options,

    imageResize: true,
    // blotFormatter: {
    //     // empty object for default behaviour.
    //   },
    imageDropAndPaste: {
        // add an custom image handler
        handler: imageHandler
    }
};




let minHeight = '';


function imageHandler(this, imageDataUrl, type, imageData,) {
    // const quill = this.quill;
    // const blob = imageData.toBlob()
    // const file = imageData.toFile()

    // // generate a form data
    // const formData = new FormData()

    // // append blob data
    // // formData.append('file', blob)

    // // or just append the file
    // formData.append('file', file, file.name);

    // // upload image to your server
    // var xhr;
    // xhr = new XMLHttpRequest();
    // xhr.withCredentials = false;
    // xhr.open('POST', environment.HOST_JEETEAM_API + '/api/topic/uploadimg');

    // xhr.onload = function () {
    //     var json;
    //     if (xhr.status < 200 || xhr.status >= 300) {
    //         return;
    //     }
    //     json = JSON.parse(xhr.responseText);
    //     if (!json || typeof json.imageUrl != 'string') {
    //         return;
    //     }

    //     let index = (quill.getSelection() || {}).index;
    //     if (index === undefined || index < 0) index = quill.getLength();
    //     quill.insertEmbed(index, 'image', json.imageUrl, 'user')
    // };

    // xhr.send(formData);

}

const editorStyles = {
    'border': '1px solid #ebedf2',
    'height': '400px',
    'font-size': '12pt'
};

const placeholder = "Nhập nội dung..."
export { quillConfig, editorStyles, placeholder, formats };