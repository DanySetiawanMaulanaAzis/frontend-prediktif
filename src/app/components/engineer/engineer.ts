import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-engineer',
  imports: [RouterModule],
  templateUrl: './engineer.html',
  styleUrl: './engineer.css',
})
export class Engineer implements OnInit, OnDestroy {

  currentDate = signal('');
  currentTime = signal('');
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.updateDateTime();

    this.timer = setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updateDateTime(): void {
    const now = new Date();

    this.currentDate.set(
      new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta'
      }).format(now)
    );

   this.currentTime.set(
      new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta'
      }).format(now)
    );
  }
}
