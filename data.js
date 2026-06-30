// Cinephile Radar Award Winners Database loader
// Data is split into data-parts/part-*.js for easier GitHub maintenance.

const MOVIE_DATA = (window.MOVIE_DATA_PARTS || []).flat();
window.MOVIE_DATA = MOVIE_DATA;
