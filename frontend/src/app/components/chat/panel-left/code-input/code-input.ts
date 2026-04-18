import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild, viewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-code-input',
  imports: [CommonModule],
  templateUrl: './code-input.html',
  styleUrl: './code-input.scss',
})
export class CodeInput {
  lineCount = signal<number>(0)

  @ViewChild('lineNumbers') lineNumbers!: ElementRef<HTMLDivElement>;

  getRange(n: number): number[] {
    if (n == 0) {
      n = 1;
    }

    return Array.from({ length: n }, (_, i) => i + 1);
  }

  setLineCount(code: string) {
    this.lineCount.set(code.split('\n').length);
  }

  handleTab(event: KeyboardEvent, textarea: HTMLTextAreaElement) {
    if (event.key !== 'Tab') return;

    event.preventDefault();

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const value = textarea.value;

    const tab = '\t';

    textarea.value =
      value.substring(0, start) +
      tab +
      value.substring(end);

    // move cursor after inserted tab
    textarea.selectionStart = textarea.selectionEnd = start + tab.length;
  }

  syncScroll(textarea: HTMLTextAreaElement) {
    if (!this.lineNumbers) return;
    this.lineNumbers.nativeElement.scrollTop = textarea.scrollTop;
  }
}
