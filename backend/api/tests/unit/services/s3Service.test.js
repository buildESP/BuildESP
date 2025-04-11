const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { uploadImageForEntity, getImageUrl, deleteImage } = require('../../../services/s3Service');
require('dotenv').config();

jest.mock('@aws-sdk/client-s3');
jest.mock('@aws-sdk/s3-request-presigner');

const sendMock = jest.fn();
S3Client.prototype.send = sendMock;

describe('s3Service', () => {
  beforeEach(() => {
    sendMock.mockClear();
    getSignedUrl.mockClear();
  });

  describe('uploadImageForEntity', () => {
    it('should upload an image and return the correct public URL', async () => {
      const file = {
        mimetype: 'image/png',
        buffer: Buffer.from('image-content'),
      };

      sendMock.mockResolvedValueOnce({});

      const url = await uploadImageForEntity(file);

      expect(sendMock).toHaveBeenCalledTimes(1);
      expect(sendMock).toHaveBeenCalledWith(expect.any(PutObjectCommand));
      expect(url).toBe(`https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/png`);
    });

    it('should throw an error if the upload fails', async () => {
      const file = {
        mimetype: 'image/png',
        buffer: Buffer.from('image-content'),
      };

      sendMock.mockRejectedValueOnce(new Error('Upload failed'));

      await expect(uploadImageForEntity(file)).rejects.toThrow('Upload failed');
    });
  });

  describe('getImageUrl', () => {
    it('should return a signed URL', async () => {
      const fileKey = 'image-key.png';

      const signedUrl = 'https://example.com/signed-url';

      getSignedUrl.mockResolvedValueOnce(signedUrl);

      const url = await getImageUrl(fileKey);

      expect(getSignedUrl).toHaveBeenCalledTimes(1);
      expect(getSignedUrl).toHaveBeenCalledWith(
        expect.any(S3Client),
        expect.any(GetObjectCommand),
        { expiresIn: 3600 }
      );
      expect(url).toBe(signedUrl);
    });

    it('should throw an error if the signed URL generation fails', async () => {
      const fileKey = 'image-key.png';

      getSignedUrl.mockRejectedValueOnce(new Error('Failed to generate signed URL'));

      await expect(getImageUrl(fileKey)).rejects.toThrow('Failed to generate signed URL');
    });
  });

  describe('deleteImage', () => {
    it('should delete the image from S3', async () => {
      const imageUrl = 'https://example-bucket.s3.us-west-2.amazonaws.com/image-key.png';

      sendMock.mockResolvedValueOnce({});

      await deleteImage(imageUrl);

      expect(sendMock).toHaveBeenCalledTimes(1);
      expect(sendMock).toHaveBeenCalledWith(expect.any(DeleteObjectCommand));
    });

    it('should not delete an image if no imageUrl is provided', async () => {
      await deleteImage(null);
      expect(sendMock).not.toHaveBeenCalled();
    });

    it('should throw an error if the deletion fails', async () => {
      const imageUrl = 'https://example-bucket.s3.us-west-2.amazonaws.com/image-key.png';

      sendMock.mockRejectedValueOnce(new Error('Failed to delete image'));

      await expect(deleteImage(imageUrl)).rejects.toThrow('Failed to delete image');
    });
  });
});
