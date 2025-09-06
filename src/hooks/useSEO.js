import { useEffect } from 'react';

/**
 * Custom hook for managing SEO meta tags
 * @param {Object} seoData - SEO data object
 * @param {string} seoData.title - Page title
 * @param {string} seoData.description - Page description
 * @param {string} seoData.image - Page image URL
 * @param {string} seoData.url - Page URL (optional, defaults to current URL)
 * @param {string} seoData.type - Open Graph type (optional, defaults to 'website')
 * @param {boolean} seoData.fullDescription - Whether to use full description (for automation) or truncated (for SEO)
 */
export const useSEO = ({ title, description, image, url, type = 'website', fullDescription = false }) => {
    useEffect(() => {
        if (!title && !description) return;

        // Create truncated description for meta description (150-160 chars max)
        const truncateDescription = (text, maxLength = 155) => {
            if (!text) return '';
            if (text.length <= maxLength) return text;

            // Find the last complete word within the limit
            const truncated = text.substring(0, maxLength);
            const lastSpaceIndex = truncated.lastIndexOf(' ');

            return lastSpaceIndex > 0
                ? truncated.substring(0, lastSpaceIndex) + '...'
                : truncated + '...';
        };

        // Set page title
        if (title) {
            const pageTitle = title.includes('Treat Path Global') ? title : `${title} | Treat Path Global`;
            document.title = pageTitle;
        }

        // Create or update meta description
        if (description) {
            const metaDescription = fullDescription ? description : truncateDescription(description);
            let metaDescTag = document.querySelector('meta[name="description"]');

            if (metaDescTag) {
                metaDescTag.setAttribute('content', metaDescription);
            } else {
                metaDescTag = document.createElement('meta');
                metaDescTag.setAttribute('name', 'description');
                metaDescTag.setAttribute('content', metaDescription);
                document.head.appendChild(metaDescTag);
            }
        }

        // Create or update Open Graph tags
        if (title) {
            const ogTitle = document.querySelector('meta[property="og:title"]');
            const pageTitle = title.includes('Treat Path Global') ? title : `${title} | Treat Path Global`;

            if (ogTitle) {
                ogTitle.setAttribute('content', pageTitle);
            } else {
                const newOgTitle = document.createElement('meta');
                newOgTitle.setAttribute('property', 'og:title');
                newOgTitle.setAttribute('content', pageTitle);
                document.head.appendChild(newOgTitle);
            }
        }

        if (description) {
            const ogDescription = document.querySelector('meta[property="og:description"]');
            const metaDescription = fullDescription ? description : truncateDescription(description);

            if (ogDescription) {
                ogDescription.setAttribute('content', metaDescription);
            } else {
                const newOgDescription = document.createElement('meta');
                newOgDescription.setAttribute('property', 'og:description');
                newOgDescription.setAttribute('content', metaDescription);
                document.head.appendChild(newOgDescription);
            }
        }

        if (image) {
            const ogImage = document.querySelector('meta[property="og:image"]');

            if (ogImage) {
                ogImage.setAttribute('content', image);
            } else {
                const newOgImage = document.createElement('meta');
                newOgImage.setAttribute('property', 'og:image');
                newOgImage.setAttribute('content', image);
                document.head.appendChild(newOgImage);
            }
        }

        // Update og:url
        const currentUrl = url || window.location.href;
        const ogUrl = document.querySelector('meta[property="og:url"]');

        if (ogUrl) {
            ogUrl.setAttribute('content', currentUrl);
        } else {
            const newOgUrl = document.createElement('meta');
            newOgUrl.setAttribute('property', 'og:url');
            newOgUrl.setAttribute('content', currentUrl);
            document.head.appendChild(newOgUrl);
        }

        // Update og:type
        const ogType = document.querySelector('meta[property="og:type"]');

        if (ogType) {
            ogType.setAttribute('content', type);
        } else {
            const newOgType = document.createElement('meta');
            newOgType.setAttribute('property', 'og:type');
            newOgType.setAttribute('content', type);
            document.head.appendChild(newOgType);
        }

        // Cleanup function
        return () => {
            // Reset title to default when component unmounts
            if (title) {
                document.title = "Treat Path Global - Quality Health and Pet Care Medicines";
            }
        };
    }, [title, description, image, url, type, fullDescription]);
};

export default useSEO;
