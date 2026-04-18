import { Component, Input } from '@angular/core';
import { Header } from './header/header';
import { Content } from "./content/content";
import { ReviewModel } from '../../../models/review';

@Component({
  standalone: true,
  selector: 'app-panel-right',
  imports: [Header, Content],
  templateUrl: './panel-right.html',
  styleUrl: './panel-right.scss',
})
export class PanelRight { 
  @Input() review: ReviewModel|null = null;
  @Input() loading: boolean = false;
}