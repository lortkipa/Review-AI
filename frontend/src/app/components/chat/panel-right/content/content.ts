import { Component } from '@angular/core';
import { Issues } from './issues/issues';
import { Loading } from "./loading/loading";
import { EmptyState } from "./empty-state/empty-state";

@Component({
  standalone: true,
  selector: 'app-content',
  imports: [Loading, EmptyState],
  templateUrl: './content.html',
  styleUrl: './content.scss',
})

export class Content {
}
