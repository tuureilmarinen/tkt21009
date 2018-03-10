const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((s,b)=>b.likes+s,0)
}
const favoriteBlog = (blogs) => {
  return blogs.reduce((prev,curr)=>{
    if(prev==null){
      return curr
    } else if(curr.likes>prev.likes) {
      return curr
    } else {
      return prev
    }
  },null)
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}