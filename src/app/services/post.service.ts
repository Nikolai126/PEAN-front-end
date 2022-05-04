import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {constants} from "./constants";
import {showPost} from "../shared/interfaces";
import {map} from "rxjs/operators"

@Injectable({
  providedIn: "root"
})

export class PostService {

  posts: showPost[] = [];
  urlPostsImages = 'http://localhost:5000/';

  constructor(
    private http: HttpClient
  ) { }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(`${constants.baseUrl}/create-post`, post, {withCredentials: true});
  }

  getAll(): Observable<showPost[]> {
    return this.http.get(`${constants.baseUrl}/home`, {withCredentials: true})
      .pipe(map((response:{[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            date: new Date(+(response[key].date)),
          }));
      }));
  }

  getOne(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/home/${id}`, {withCredentials: true});
  }

  setLike(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/home/like/${id}`, {withCredentials: true});
  }


  editPost(post: FormData, postId: number): Observable<any> {
    return this.http.put(`${constants.baseUrl}/home/${postId}`, post, {withCredentials: true});
  }

  filterTag(tagId: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/home/filter/${tagId}`, {withCredentials: true})
      .pipe(map((response:{[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            date: new Date(+(response[key].date)),
          }));
      }));
  }

  deletePost(id: number): any {
    return this.http.delete(`${constants.baseUrl}/home/${id}`, {withCredentials: true}).subscribe({
      next: response => {
        return true;
      },
      error: err => {
        return false;
      }
    });
  }




}
