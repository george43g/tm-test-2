import type { Genre } from 'moviedb-promise';

export const getGenres = (genres: Array<Genre>) => genres.map(genre => genre.name).toString();
