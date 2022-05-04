import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService} from "../services/post.service";
import {showPost} from "../shared/interfaces";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.scss']
})
export class OnePostComponent implements OnInit {

  post: showPost;
  postHasLike: boolean;
  likes: number;
  isAuthor: boolean
  error: string;
  process = false;
  url = this.postService.urlPostsImages;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.process = true;
    this.route.params.subscribe((params: Params) => {
      this.postService.getOne(+params.id).subscribe({
        next: postData => {
          this.process = false;
          this.post = postData;
          this.isAuthor = postData.isAuthor;
          this.postHasLike = postData.haslike;
          this.likes = postData.likes;
        },
        error: err => {
          this.error = err.error.message;
        }
      })
    })
  }

  onLike() {
    if (!this.authService.isAuthenticated()) {
      this.error = 'User not authorized!';
      return;
    }
    this.route.params.subscribe((params: Params) => {
      this.postService.setLike(+params.id).subscribe({
        error: err => {
          console.log('err:', err)
          this.error = err.error.message;
        }
      })
    })
    this.postHasLike && this.likes !== 0 ? this.likes -= 1 : this.likes += 1;
    this.postHasLike = !this.postHasLike;
  };

  onDelete() {
      this.process = true;
      this.route.params.subscribe((params: Params) => {
        const deletedPost = this.postService.deletePost(+params.id);
        if (deletedPost) {
          setTimeout(() => {
            this.process = false;
            this.router.navigate(['/home']);
          }, 1000)
        }
        else {
          this.error = 'Bad request, try again later...';
        }
      });
  };

}
