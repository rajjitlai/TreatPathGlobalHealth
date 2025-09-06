# n8n Integration Guide for Treat Path Global

This document explains how to integrate with Treat Path Global's product data for automation using n8n.

## Available Data Sources

### 1. Meta Tags (Easiest for n8n)

Each product page includes custom meta tags that n8n can easily scrape:

```html
<meta name="product-name" content="Product Name">
<meta name="product-description" content="Full product description...">
<meta name="product-image" content="https://example.com/image.jpg">
<meta name="product-id" content="product_id_123">
<meta name="product-tags" content="health, vitamin, supplement">
<meta name="product-link" content="https://affiliate-link.com">
<meta name="product-category" content="Health">
<meta name="product-brand" content="Brand Name">
<meta name="product-price" content="29.99">
<meta name="product-availability" content="in-stock">
```

### 2. Data Attributes

Product container includes data attributes:

```html
<div data-product-id="123" 
     data-product-name="Product Name"
     data-product-description="Full description..."
     data-product-image="https://example.com/image.jpg"
     data-product-link="https://affiliate-link.com"
     data-product-tags="health,vitamin,supplement"
     data-product-category="Health"
     data-product-brand="Brand Name"
     data-product-price="29.99">
```

### 3. JSON-LD Structured Data

Rich structured data in the page head:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "Full product description...",
  "image": ["https://example.com/image.jpg"],
  "identifier": "product_id_123",
  "url": "https://treatpathglobal.com/product/123",
  "category": "Health",
  "brand": {
    "@type": "Brand",
    "name": "Brand Name"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://affiliate-link.com",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "price": "29.99"
  }
}
```

### 4. Global JavaScript Functions

Available in browser console:

```javascript
// Get structured product data
window.getCurrentProductData()

// Get API response format
window.getCurrentProductAPIResponse()
```

## n8n Workflow Examples

### Example 1: Scrape Product Data Using Meta Tags

1. **HTTP Request Node**: GET the product page URL
2. **HTML Extract Node**: Extract meta tags
   - Selector: `meta[name^="product-"]`
   - Attribute: `content`
3. **Set Node**: Map extracted data to your desired format

### Example 2: Extract JSON-LD Data

1. **HTTP Request Node**: GET the product page URL
2. **HTML Extract Node**: Extract JSON-LD script
   - Selector: `script[type="application/ld+json"]`
   - Attribute: `text`
3. **JSON Node**: Parse the JSON data
4. **Set Node**: Map to your format

### Example 3: Use Data Attributes

1. **HTTP Request Node**: GET the product page URL
2. **HTML Extract Node**: Extract data attributes
   - Selector: `[data-product-id]`
   - Attributes: `data-product-*`
3. **Set Node**: Map extracted data

## Data Structure

### Product Data Object

```json
{
  "id": "product_id_123",
  "name": "Product Name",
  "description": "Full product description...",
  "image": "https://example.com/image.jpg",
  "link": "https://affiliate-link.com",
  "tags": ["health", "vitamin", "supplement"],
  "category": "Health",
  "brand": "Brand Name",
  "price": "29.99",
  "availability": "in-stock",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "seo": {
    "title": "Product Name | Treat Path Global",
    "description": "Full product description...",
    "keywords": "health, vitamin, supplement",
    "image": "https://example.com/image.jpg",
    "url": "https://treatpathglobal.com/product/123"
  }
}
```

## n8n Node Configuration

### HTML Extract Node for Meta Tags

```json
{
  "selector": "meta[name^='product-']",
  "attribute": "content",
  "returnArray": true
}
```

### HTML Extract Node for JSON-LD

```json
{
  "selector": "script[type='application/ld+json']",
  "attribute": "text",
  "returnArray": false
}
```

### HTML Extract Node for Data Attributes

```json
{
  "selector": "[data-product-id]",
  "attributes": {
    "id": "data-product-id",
    "name": "data-product-name",
    "description": "data-product-description",
    "image": "data-product-image",
    "link": "data-product-link",
    "tags": "data-product-tags",
    "category": "data-product-category",
    "brand": "data-product-brand",
    "price": "data-product-price"
  }
}
```

## Tips for n8n Integration

1. **Use Meta Tags**: Easiest and most reliable method
2. **Handle Missing Data**: Always check for null/undefined values
3. **Parse Tags**: Tags are comma-separated strings, split them if needed
4. **Image URLs**: Always validate image URLs before using
5. **Affiliate Links**: Use the `product-link` for affiliate URLs
6. **Error Handling**: Add error handling for failed requests

## Rate Limiting

- No rate limiting implemented
- Be respectful with request frequency
- Consider caching data for repeated use

## Support

For technical support or questions about the integration, please contact the development team.
