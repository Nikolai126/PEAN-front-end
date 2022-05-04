import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ValidationTags} from "../utils/tags.validator";
import {PostService} from "../services/post.service"
import {showPost} from "../shared/interfaces";


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  formPost: FormGroup;

  error: string | object | null;
  success = '';
  submitted = false;

  editing = false;
  process = false;
  post: showPost;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.process = true;

    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.editing = true;
        this.postService.getOne(+params.id).subscribe({
          next: postData => {
            this.post = postData;
            this.formPost = new FormGroup({
              title: new FormControl(this.post.title,
                [Validators.required, Validators.minLength(2), Validators.maxLength(100)
                ]),
              description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)]),
              uploadIMG: new FormControl(this.post.image_ref)
            });
          },
          error: err => {
            this.error = err.error.message;
          }

        });
      }
      else {
        return;
      }
    });

    this.process = false;

    if (!this.editing) {
      this.formPost = this.formBuilder.group(
        {
          title: ['',
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(100),

            ]
          ],
          description: ['',
            [
              Validators.required,
              Validators.minLength(10),
            ]
          ],
          tags: ['',
            [
              ValidationTags
            ]
          ],
          uploadIMG: [''],
          acceptTerms: [true, Validators.requiredTrue]
        }
      );
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formPost.get('uploadIMG')?.setValue(file);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formPost.invalid) {
      return;
    }

    const formData = new FormData();

    if (this.editing) {

      formData.append('title', this.formPost.get('title')?.value);
      formData.append('description', this.formPost.get('description')?.value);
      formData.append('image', this.formPost.get('uploadIMG')?.value);
      formData.append('id', this.post.id.toString());

      this.postService.editPost(formData, this.post.id).subscribe({
        next: response => {
          this.process = true;
          this.error = '';
          this.submitted = false;
          this.editing = false;
          setTimeout(() => {
            this.router.navigate(['/home', this.post.id]);
          }, 500);
        },
        error: err => {
          this.submitted = false;
          this.error = 'Error with updating!';
        }
      });
    }
    else {

      formData.append('title', this.formPost.get('title')?.value);
      formData.append('description', this.formPost.get('description')?.value);
      formData.append('date', new Date().getTime().toString());
      formData.append('tags', this.formPost.get('tags')?.value);
      formData.append('image', this.formPost.get('uploadIMG')?.value);

      this.postService.createPost(formData).subscribe({
        next: response => {
          this.error = '';
          this.submitted = false;
          this.success = 'New post created!';
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        },
        error: err => {
          this.submitted = false;
          this.error = err.error.message;
        }
      });
    }

  }

}
