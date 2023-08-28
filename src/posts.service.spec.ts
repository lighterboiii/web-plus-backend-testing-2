import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const foundPosts = postsService.findMany();

      const expectedPosts = [
        { id: '1', text: 'Post 1' },
        { id: '2', text: 'Post 2' },
        { id: '3', text: 'Post 3' },
        { id: '4', text: 'Post 4' },
      ]
      expect(foundPosts).toEqual(expectedPosts);
    });

    it('should return correct posts for skip and limit options', () => {
      const options = { skip: 1, limit: 2 };
      const expectedPosts = [
        { id: '2', text: 'Post 2' },
        { id: '3', text: 'Post 3' },
      ];

      const foundPosts = postsService.findMany(options);
      expect(foundPosts).toEqual(expectedPosts);
    });

    it('should return an empty array if skip is greater than the number of posts', () => {
      const options = { skip: 5, limit: 2 };
      const foundPosts = postsService.findMany(options);

      expect(foundPosts).toEqual([]);
    });

    it('should return an empty array if limit is 0', () => {
      const options = { skip: 1, limit: 0 };
      const foundPosts = postsService.findMany(options);

      expect(foundPosts).toEqual([]);
    });

    it('should find a post', () => {
      const foundPost = { id: '2', text: 'Post 2' };

      const postToFind = postsService.find(foundPost.id);

      expect(postToFind).toEqual(foundPost);
    });

    it('should delete a post', () => {
      const postToDelete = postsService.create({ text: 'To Be Deleted' });

      postsService.delete(postToDelete.id);

      const expectedPosts = [
        { id: '1', text: 'Post 1' },
        { id: '2', text: 'Post 2' },
        { id: '3', text: 'Post 3' },
        { id: '4', text: 'Post 4' },
      ];

      expect(postsService.findMany()).toEqual(expectedPosts);
    });

    it('should update a post', () => {
      const postToUpdate = postsService.create({ text: 'To Be Updated' });
      const updatedText = 'Updated Text';

      postsService.update(postToUpdate.id, { text: updatedText });

      const updatedPost = postsService.find(postToUpdate.id);

      expect(updatedPost?.text).toEqual(updatedText);
    });
  });
});