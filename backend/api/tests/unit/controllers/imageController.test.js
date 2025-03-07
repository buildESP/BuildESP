const request = require('supertest');
const express = require('express');
const multer = require('multer');
const { uploadImageController, deleteImageController } = require('../../../controllers/imageController');

const { uploadImageForEntity, deleteImage } = require('../../../services/s3Service');
jest.mock('../../../services/s3Service');

const app = express();
app.use(express.json());

// Middleware for handling multipart form-data
const upload = multer().single('file');

// Test route for upload
app.post('/upload', upload, uploadImageController);

// Test route for delete
app.delete('/delete', deleteImageController);

describe('Image Controller', () => {
    describe('POST /upload', () => {
        it('should upload an image successfully and return a URL', async () => {
            const mockImageUrl = 'https://s3.amazonaws.com/bucket-name/test-image.jpg';
            uploadImageForEntity.mockResolvedValue(mockImageUrl);

            const response = await request(app)
                .post('/upload')
                .field('entityType', 'test')
                .field('entityId', '12345')
                .attach('file', Buffer.from('test'), 'test.jpg');

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                message: 'Image uploadée avec succès',
                imageUrl: mockImageUrl,
            });
        });

        it('should return a 400 error if no file is uploaded', async () => {
            const response = await request(app).post('/upload').send({});

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Aucun fichier envoyé' });
        });

        it('should return a 500 error if upload fails', async () => {
            uploadImageForEntity.mockRejectedValue(new Error('AWS Error'));

            const response = await request(app)
                .post('/upload')
                .attach('file', Buffer.from('test'), 'test.jpg');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Erreur lors de l’upload de l’image' });
        });
    });

    describe('DELETE /delete', () => {
        it('should delete an image successfully', async () => {
            deleteImage.mockResolvedValue();

            const response = await request(app)
                .delete('/delete')
                .send({ imageUrl: 'https://s3.amazonaws.com/bucket-name/test-image.jpg' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Image supprimée avec succès' });
        });

        it('should return a 400 error if no imageUrl is provided', async () => {
            const response = await request(app).delete('/delete').send({});

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'URL de l’image requise' });
        });

        it('should return a 500 error if deletion fails', async () => {
            deleteImage.mockRejectedValue(new Error('AWS Error'));

            const response = await request(app)
                .delete('/delete')
                .send({ imageUrl: 'https://s3.amazonaws.com/bucket-name/test-image.jpg' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Erreur lors de la suppression de l’image' });
        });
    });
});
