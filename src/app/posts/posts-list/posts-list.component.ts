import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.entities$;
  }

  onDeletePost(event: Event, id: string) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete the post')) {
      this.postService.delete(id);
    }
  }

}
