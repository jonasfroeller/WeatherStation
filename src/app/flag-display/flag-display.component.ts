import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BrowserDetectionService} from "../browser-detection.service";

@Component({
  selector: 'app-flag-display',
  standalone: true,
  imports: [],
  templateUrl: './flag-display.component.html',
  styleUrl: './flag-display.component.css'
})
export class FlagDisplayComponent implements OnInit, OnChanges {
  isChrome: boolean = false;
  @Input() countryCode!: string;
  @Input() flagIcon!: string;
  flagURL!: string // 2rem = 32px

  constructor(private browserDetectionService: BrowserDetectionService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['countryCode'] && changes['countryCode'].currentValue) {
      this.updateFlagURL();
    }
  }

  ngOnInit(): void {
    this.isChrome = this.browserDetectionService.isChrome();
  }

  private updateFlagURL(): void {
    this.flagURL = `https://flagsapi.com/${this.countryCode}/flat/32.png`;
  }
}
