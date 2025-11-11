const validator = require('validator');

/**
 * Valida la seguridad de una contraseña según los criterios establecidos
 * @param {string} password - Contraseña a validar
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
function validatePassword(password) {
    const errors = [];

    if (!password || password.length <= 8) {
        errors.push('La contraseña debe tener al menos 9 caracteres.');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una letra mayúscula.');
    }
    if (!/[^0-9a-zA-Z]/.test(password)) {
        errors.push('La contraseña debe contener al menos un carácter especial (ej. !, @, #, $, %).');
    }
    if (!/[0-9]/.test(password)) { 
        errors.push('La contraseña debe contener al menos un número.');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Valida y normaliza un email
 * @param {string} email - Email a validar
 * @returns {Object} - { isValid: boolean, normalizedEmail: string, error?: string }
 */
function validateEmail(email) {
    if (!email) {
        return { isValid: false, normalizedEmail: '', error: 'El email es requerido.' };
    }

    const cleanedEmail = email.trim();
    const lowerCaseEmail = cleanedEmail.toLowerCase();

    if (!validator.isEmail(lowerCaseEmail)) {
        return { isValid: false, normalizedEmail: '', error: 'El formato del correo electrónico no es válido.' };
    }

    return {
        isValid: true,
        normalizedEmail: lowerCaseEmail
    };
}

/**
 * Valida que los campos requeridos no estén vacíos
 * @param {Object} fields - Objeto con los campos a validar
 * @param {string[]} requiredFields - Array con los nombres de campos requeridos
 * @returns {Object} - { isValid: boolean, error?: string }
 */
function validateRequiredFields(fields, requiredFields) {
    const missingFields = requiredFields.filter(field => !fields[field]);
    
    if (missingFields.length > 0) {
        return {
            isValid: false,
            error: `Los siguientes campos son requeridos: ${missingFields.join(', ')}`
        };
    }

    return { isValid: true };
}

module.exports = {
    validatePassword,
    validateEmail,
    validateRequiredFields
};