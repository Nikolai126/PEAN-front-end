import {Pipe, PipeTransform} from "@angular/core";
import {showPost} from "../interfaces";

@Pipe({
  name: 'searchPosts'
})
export class SearchPipe implements PipeTransform {
  transform(posts: showPost[], search = ''): showPost[] {
    if (!search.trim()) {
      return posts;
    }

    return posts.filter(post => {
      return post.title.toLowerCase().includes(search.toLowerCase());
    })
  }
}
