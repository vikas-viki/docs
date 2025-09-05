In a traditional Rest-api call there are two main dis-advantages.

1. Overfetching:
    Lets say we just want title and thumbnail of the blogs posts, but to do that we call /getAllPosts, wherein it returns all that data that we dont need. but if you were to think that we'll create another endpoint specific to it, but in that case we dont know the changing requirements, hence going on creating endpoints is not a good option.

2. Underfetching
   1. lets sayou want the details of authors along with the post that you got, you'll have to call the backend to fetch the data of the author again, same ans, if you're thinking of creating a new specific endpoint that might not be ideal in longterm.

Hence comes, **GraphQl**

using a single query, query everything, pick what you want.