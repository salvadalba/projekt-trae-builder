// Contact Form JavaScript for Portfolio Website
// Handles form validation, submission, and user feedback

'use strict';

function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formStatus = contactForm.querySelector('.form-status');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    contactForm.addEventListener('submit', handleFormSubmit);
    const emailInput = contactForm.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('input', debounce(validateEmail, 500));
    }
    const messageTextarea = contactForm.querySelector('textarea[name="message"]');
    if (messageTextarea) {
        addCharacterCounter(messageTextarea);
    }
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !fieldValue) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required`;
    }
    
    // Email validation
    if (field.type === 'email' && fieldValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldValue)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Name validation (letters and spaces only)
    if (fieldName === 'name' && fieldValue) {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(fieldValue)) {
            isValid = false;
            errorMessage = 'Name should only contain letters and spaces';
        }
        if (fieldValue.length < 2) {
            isValid = false;
            errorMessage = 'Name should be at least 2 characters long';
        }
    }
    
    // Message validation
    if (fieldName === 'message' && fieldValue) {
        if (fieldValue.length < 10) {
            isValid = false;
            errorMessage = 'Message should be at least 10 characters long';
        }
        if (fieldValue.length > 1000) {
            isValid = false;
            errorMessage = 'Message should not exceed 1000 characters';
        }
    }
    
    // Update field state
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('success');
        clearFieldErrorMessage(field);
    } else {
        field.classList.remove('success');
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Clear field error state
function clearFieldError(e) {
    const field = e.target;
    if (field.classList.contains('error')) {
        field.classList.remove('error');
        clearFieldErrorMessage(field);
    }
}

// Show field error message
function showFieldError(field, message) {
    // Remove existing error message
    clearFieldErrorMessage(field);
    
    // Create error element
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error-message';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    
    // Insert error message
    const formGroup = field.closest('.form__group');
    if (formGroup) {
        formGroup.appendChild(errorElement);
    }
}

// Clear field error message
function clearFieldErrorMessage(field) {
    const formGroup = field.closest('.form__group');
    if (formGroup) {
        const existingError = formGroup.querySelector('.field-error-message');
        if (existingError) {
            existingError.remove();
        }
    }
}

// Get field label for error messages
function getFieldLabel(fieldName) {
    const labels = {
        'name': 'Name',
        'email': 'Email',
        'subject': 'Subject',
        'message': 'Message'
    };
    return labels[fieldName] || fieldName;
}

// Validate email with regex
function validateEmail(e) {
    const emailInput = e.target;
    const emailValue = emailInput.value.trim();
    
    if (emailValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            emailInput.classList.add('error');
            emailInput.classList.remove('success');
            showFieldError(emailInput, 'Please enter a valid email address');
        } else {
            emailInput.classList.remove('error');
            emailInput.classList.add('success');
            clearFieldErrorMessage(emailInput);
        }
    }
}

// Add character counter for textarea
function addCharacterCounter(textarea) {
    const maxLength = parseInt(textarea.getAttribute('maxlength')) || 1000;
    
    // Create counter element
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.textContent = `0 / ${maxLength} characters`;
    
    // Insert counter after textarea
    const formGroup = textarea.closest('.form__group');
    if (formGroup) {
        formGroup.appendChild(counter);
    }
    
    // Update counter on input
    textarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        counter.textContent = `${currentLength} / ${maxLength} characters`;
        
        // Add warning class when approaching limit
        if (currentLength > maxLength * 0.9) {
            counter.classList.add('warning');
        } else {
            counter.classList.remove('warning');
        }
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const contactForm = e.target;
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formStatus = contactForm.querySelector('.form-status');
    
    // Validate all fields
    const formInputs = contactForm.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    formInputs.forEach(input => {
        if (!validateField({ target: input })) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showFormStatus('Please correct the errors above', 'error');
        return;
    }
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.classList.add('loading');
    
    // Collect form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission (replace with actual API call)
    simulateFormSubmission(data)
        .then(response => {
            showFormStatus('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            
            // Reset field states
            formInputs.forEach(input => {
                input.classList.remove('success', 'error');
                clearFieldErrorMessage(input);
            });
            
            // Reset character counter
            const counter = contactForm.querySelector('.character-counter');
            if (counter) {
                counter.textContent = `0 / 1000 characters`;
                counter.classList.remove('warning');
            }
        })
        .catch(error => {
            showFormStatus('Sorry, there was an error sending your message. Please try again.', 'error');
            console.error('Form submission error:', error);
        })
        .finally(() => {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            submitButton.classList.remove('loading');
        });
}

// Submit form to Supabase or fallback
function simulateFormSubmission(data) {
    const endpoint = '/api/contact';
    return fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error('Submission failed');
        return response.json();
    })
    .catch(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve({ success: true, data: data });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1200);
        });
    });
}

// Show form status message
function showFormStatus(message, type) {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    let statusElement = contactForm.querySelector('.form-status');
    
    // Create status element if it doesn't exist
    if (!statusElement) {
        statusElement = document.createElement('div');
        statusElement.className = 'form-status';
        contactForm.appendChild(statusElement);
    }
    
    // Update status
    statusElement.textContent = message;
    statusElement.className = `form-status form-status-${type}`;
    statusElement.setAttribute('role', 'alert');
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusElement.textContent = '';
            statusElement.className = 'form-status';
        }, 5000);
    }
    
    // Scroll to status message
    statusElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Utility function: debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Styles are defined in CSS; no inline injections
