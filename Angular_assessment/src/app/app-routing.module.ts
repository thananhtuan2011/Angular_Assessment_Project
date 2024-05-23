import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor/editor.component';
import { PreviewComponent } from './preview/preview/preview.component';

const routes: Routes = [
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'article/preview',
    component: PreviewComponent
  },
  {
    path: '',
    redirectTo: '/editor',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
