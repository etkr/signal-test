import {
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { BehaviorSubject, catchError, of, Subject, switchMap, tap } from 'rxjs';
import { CatFactService } from './cat-fact.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-singal-list',
  standalone: true,
  imports: [MatButton, MatProgressSpinner, MatListItem, MatList],
  templateUrl: './singal-list.component.html',
  styleUrl: './singal-list.component.css',
})
export class SingalListComponent {
  private readonly catFactService = inject(CatFactService);
  private readonly loader = new Subject<undefined>();
  public readonly loading = signal(false);

  private readonly catFacts$ = this.loader.pipe(
    switchMap(() =>
      this.catFactService.getCatFact().pipe(
        catchError(() => {
          this.loading.set(false);
          return [];
        }),
        tap(() => this.loading.set(false))
      )
    )
  );

  public readonly catFacts = toSignal(this.catFacts$, {
    initialValue: [],
  });

  public load() {
    this.loading.set(true);
    this.loader.next(undefined);
  }
}
