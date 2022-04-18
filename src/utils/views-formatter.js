const  viewsFormatter= (views)=> {
  return Math.abs(views) > 999
    ? Math.sign(views) * (Math.abs(views) / 1000).toFixed(1) + "k"
    : Math.sign(views) * Math.abs(views);
}

export {viewsFormatter}