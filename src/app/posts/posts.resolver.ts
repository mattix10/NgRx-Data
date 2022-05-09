import { mergeMap, map, first, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostService } from './posts.service';

@Injectable()
export class PostsResolver implements Resolve<boolean> {
  constructor(private postService: PostService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.postService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.postService.getAll();
        }
      }),
      first()
    );
  }
}