export class User {
  constructor(
    public _id:string,
    public first:string,
    public last:string,
    public email:string,
    public avatar:string,
    public password:string,
    public friendList:string[],
    public postList:Post[],
    public request:string[],
    public response:string[]
  ) {}
}

export class Post {
  constructor(
    public poster:string,
    public first:string,
    public last:string,
    public avatar:string,
    public content:string,
    public image:string,
    public date:number,
    public commentList:Comment[]
  ) {}
}

export class Comment {
  constructor(
    public commenter:string,
    public first:string,
    public last:string,
    public avatar:string,
    public content:string
  ) {}
}



