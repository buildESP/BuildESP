const { updateEntityImage } = require('../../../utils/imageUtils');
const { deleteImage } = require('../../../services/s3Service');

jest.mock('../../../services/s3Service', () => ({
  deleteImage: jest.fn(),
}));

describe('imageUtils', () => {
  describe('updateEntityImage', () => {
    it('should delete the old image if a new image URL is provided', async () => {
      const mockEntity = {
        image_url: 'https://example.com/old-image.jpg',
        save: jest.fn(),
      };
      const newImageUrl = 'https://example.com/new-image.jpg';

      await updateEntityImage(mockEntity, newImageUrl);

      expect(deleteImage).toHaveBeenCalledTimes(1);
      expect(deleteImage).toHaveBeenCalledWith(mockEntity.image_url);
      expect(mockEntity.image_url).toBe(newImageUrl);
      expect(mockEntity.save).toHaveBeenCalledTimes(1);
    });

    it('should not delete the old image if no new image URL is provided', async () => {
      const mockEntity = {
        image_url: 'https://example.com/old-image.jpg',
        save: jest.fn(),
      };

      await updateEntityImage(mockEntity, null);

      expect(deleteImage).toHaveBeenCalledTimes(0);
      expect(mockEntity.save).toHaveBeenCalledTimes(1);
    });

    it('should not delete the old image if entity has no image_url', async () => {
      const mockEntity = {
        image_url: null,
        save: jest.fn(),
      };

      await updateEntityImage(mockEntity, 'https://example.com/new-image.jpg');

      expect(deleteImage).toHaveBeenCalledTimes(0);
      expect(mockEntity.save).toHaveBeenCalledTimes(1);
    });

    it('should not update image_url if entity is null', async () => {
      await updateEntityImage(null, 'https://example.com/new-image.jpg');

      expect(deleteImage).toHaveBeenCalledTimes(0);
    });
  });
});
