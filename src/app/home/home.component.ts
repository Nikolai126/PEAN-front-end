import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { showPost } from '../shared/interfaces';
import { Subscription } from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  posts: showPost[]
  postSub: Subscription
  searchStr = ''
  url = this.postService.urlPostsImages;
  process = false;
  error = '';
  filterTag = false;
  tag = '';

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.process = true;
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.route.queryParams.subscribe((queryParam: any) => {
            this.tag = queryParam['name'];
          }
        );
        this.postService.filterTag(+params.id).subscribe({
          next: postData => {
            this.filterTag = true;
            this.process = false;
            this.posts = postData.reverse();
          },
          error: err => {
            this.process = false;
            this.error = err.error.message;
          }
        })
      }
      else {
        this.process = false;

        this.postSub = this.postService.getAll().subscribe(posts => {
          this.posts = posts.reverse();
        });
        return;
      }
    });


  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }

}
