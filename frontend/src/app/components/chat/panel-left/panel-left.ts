import { Component } from '@angular/core';
import { Toolbar } from "./toolbar/toolbar";
import { CodeInput } from './code-input/code-input';
import { ActionBar } from './action-bar/action-bar';

@Component({
  standalone: true,
  selector: 'app-panel-left',
  imports: [Toolbar, CodeInput, ActionBar],
  templateUrl: './panel-left.html',
  styleUrl: './panel-left.scss',
})
export class PanelLeft {}
