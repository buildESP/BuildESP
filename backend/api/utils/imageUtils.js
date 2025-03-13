const { deleteImage } = require('../services/s3Service');

/**
 * Handles updating or deleting an entity's image.
 * @param {Object} entity - The Sequelize entity (e.g., Category, User, Item).
 * @param {string} newImageUrl - The new image URL.
 */
const updateEntityImage = async (entity, newImageUrl) => {
    if (!entity) return;

    // If a new image is provided, delete the old one before updating
    if (newImageUrl && entity.image_url) {
        await deleteImage(entity.image_url);
    }

    entity.image_url = newImageUrl;
    await entity.save();
};

module.exports = { updateEntityImage };