const MovieItem = ({movie}) => {

return(
<div className="card" style={{ width: '18rem' }}>
  <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
  <div className="card-body">
    <h5 className="card-title">{movie.Title}</h5>
   
    <a href={'movies/' + movie.imdbID} className="btn btn-primary">Go somewhere</a>
  </div>
</div>

);
}


export default MovieItem;