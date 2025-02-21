const { deleteImage } = require('../services/s3Service');

/**
 * Gère l'ajout et la suppression d'une image pour une entité.
 * @param {Object} entity - L'entité Sequelize (ex: Category, User, Item)
 * @param {string} newImageUrl - Nouvelle URL de l'image
 */
const updateEntityImage = async (entity, newImageUrl) => {
    if (!entity) return;

    // Si une nouvelle image est envoyée, supprimer l'ancienne avant de mettre à jour
    if (newImageUrl && entity.image_url) {
        await deleteImage(entity.image_url);
    }

    entity.image_url = newImageUrl;
    await entity.save();
};

module.exports = { updateEntityImage };
