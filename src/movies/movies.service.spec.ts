import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of movies', async () => {
      const result = await service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'testMovie',
        genres: ['testGenre'],
        year: 2020,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toBe(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: 'testMovie',
        genres: ['testGenre'],
        year: 2020,
      });

      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toEqual(beforeDelete - 1);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;

      service.create({
        title: 'testMovie',
        genres: ['testGenre'],
        year: 2020,
      });

      const afterCreate = service.getAll().length;

      expect(afterCreate).toEqual(beforeCreate + 1);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'testMovie',
        genres: ['testGenre'],
        year: 2020,
      });

      const beforeUpdate = service.getAll().length;

      service.update(1, {
        title: 'testMovieUpdated',
        genres: ['testGenreUpdated'],
        year: 2021,
      });

      const afterUpdate = service.getAll().length;

      expect(afterUpdate).toEqual(beforeUpdate);
    });

    it('should return a 404', () => {
      try {
        service.update(999, {
          title: 'testMovieUpdated',
          genres: ['testGenreUpdated'],
          year: 2021,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found');
      }
    });
  });
});
